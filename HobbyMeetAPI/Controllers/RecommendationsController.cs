using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aglomera;
using Aglomera.Linkage;
using HobbyMeetAPI.Clustering;
using HobbyMeetAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HobbyMeetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly HobbyDbContext _context;

        public RecommendationsController(HobbyDbContext context)
        {
            _context = context;
        }
        [HttpGet(template: "{id}")]
        [EnableCors("_myAllowSpecificOrigins")]
        public List<User> GetUserRecommendations(string id)
        {
            var usrList = new List<User>();
            foreach (var email in GetRecommendationsList(id))
            {
                usrList.Add(new User()
                {
                    UserId = email
                });
            }

            return usrList;
        }

        [HttpGet(template: "{id}/{hobby}")]
        [EnableCors("_myAllowSpecificOrigins")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserRecommendationsWithHobby(string id, string hobby)
        {
            var usersWithHobby = _context.UserHobbies.Where(uh => uh.UserId != id && uh.Name==hobby)
                .Select(uh => new User()
                {
                    UserId = uh.UserId
                });

            return await usersWithHobby.ToListAsync();
        }


        public UserScore GetUserScore(string id)
        {
            var userScore = new UserScore(id,0,0,0,0,0,0);
            var userHobbies = from uh in _context.UserHobbies
                join hobby in _context.Hobbies on uh.Name equals hobby.Name
                where uh.UserId == id
                select new Hobby()
                {
                    Name = hobby.Name,
                    ActivityScore = hobby.ActivityScore,
                    ArtScore = hobby.ArtScore,
                    CollectingScore = hobby.CollectingScore,
                    CraftScore = hobby.CraftScore,
                    GameScore = hobby.GameScore,
                    SportScore = hobby.SportScore
                };

            foreach (var h in userHobbies)
            {
                userScore.ActivityScore += h.ActivityScore;
                userScore.ArtScore += h.ArtScore;
                userScore.CraftScore += h.CraftScore;
                userScore.CollectingScore += h.CollectingScore;
                userScore.GameScore += h.GameScore;
                userScore.SportScore += h.SportScore;
            }

            return userScore;
        }

        public List<string> GetRecommendationsList(string id)
        {
            var dataSet =  new HashSet<UserScore>();
            foreach (var usr in _context.Users)
            {
                dataSet.Add(GetUserScore(usr.UserId));
            }
            var metric = new DssimilarityMetric();
            var linkage = new SingleLinkage<UserScore>(metric);
            var algorithm = new AgglomerativeClusteringAlgorithm<UserScore>(linkage);
            var clusteringResult = algorithm.GetClustering(dataSet);
            return GetListFromClustResult(clusteringResult, id);
        }

        public List<string> GetListFromClustResult(ClusteringResult<UserScore> cr, string id)
        {
            List<string> cluster1 = new List<string>();
            List<string> cluster2 = new List<string>();
            User userObj = new User() {UserId = id};
            int index = cr.Count - 2;
            int i = 0;
            foreach (var clust in cr[index])
            {
                foreach (var dp in clust)
                {
                    if (i == 0)
                    {
                        cluster1.Add(dp.UserId);
                    }
                    else
                    {
                        cluster2.Add(dp.UserId);
                    }
                }

                i++;
            }
            if (cluster1.Contains(id) == true && cluster1.Count>1)
            {
                cluster1.Remove(id);
                return cluster1;
            }

            cluster2.Remove(id);
            return cluster2;
        }
    }
}