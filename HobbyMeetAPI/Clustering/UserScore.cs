using System;using HobbyMeetAPI.Models;

namespace HobbyMeetAPI.Clustering
{
    public class UserScore : IComparable<UserScore>
    {
        
        public string UserId { get; set; }
        public int ArtScore { get; set; }
        public int GameScore { get; set; }
        public int SportScore { get; set; }
        public int CollectingScore { get; set; }
        public int CraftScore { get; set; }
        public int ActivityScore { get; set; }

        public UserScore(string id, int artScore, int gameScore, int sportScore, int collectingScore, int craftScore, int activityScore)
        {
            this.UserId = id;
            this.ActivityScore = activityScore;
            this.ArtScore = artScore;
            this.CollectingScore = collectingScore;
            this.CraftScore = craftScore;
            this.GameScore = gameScore;
            this.SportScore = sportScore;
        }

        public int CompareTo(UserScore other)
        {
             if (other == null) return 1;
             if (other != null)
             {
                 return this.UserId.CompareTo(other.UserId);
             }
             else
             {
                 throw new ArgumentException("Object is not a Temperature");
             }

             
        }
    }
}
