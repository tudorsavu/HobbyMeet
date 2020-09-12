using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HobbyMeetAPI.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HobbyMeetAPI.Models;
using Microsoft.AspNetCore.Cors;

namespace HobbyMeetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly HobbyDbContext _context;

        public UsersController(HobbyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        public async Task<ActionResult<UserHobbiesDTO>> PostUser(UserHobbiesDTO uh)
        {
            User user = new User()
            {
                UserId = uh.UserId
            };
            _context.Users.Add(user);

            foreach (var hobby in uh.HobbyNames)
            {
                _context.UserHobbies.Add(new UserHobby()
                {
                    Name = hobby,
                    UserId = uh.UserId
                });
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction($"PostUser", new { id = user.UserId, hobbies = uh.HobbyNames }, user);
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }


        [HttpPut]
        [EnableCors("_myAllowSpecificOrigins")]
        public async Task<IActionResult> PutUser(UserHobbiesDTO uh)
        {
            string id = uh.UserId;
            var userHobbies = _context.UserHobbies.Where(uH => uH.UserId == uh.UserId);
            foreach (var userHobby in userHobbies)
            {
                _context.UserHobbies.Remove(userHobby);
            }

            int i = 0;
            foreach (var userHobby in uh.HobbyNames)
            {
                _context.UserHobbies.Add(new UserHobby()
                {
                    UserId = uh.UserId,
                    Name = uh.HobbyNames[i]
                });
                i++;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet(template: "{id}")]
        [EnableCors("_myAllowSpecificOrigins")]
        public async Task<ActionResult<IEnumerable<HobbyDTO>>> GetUserHobbies(string id)
        {
            return await _context.UserHobbies.Where(uh => uh.UserId == id)
                .Select(dto => new HobbyDTO()
                {
                    Name = dto.Name
                }).ToListAsync();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [EnableCors("_myAllowSpecificOrigins")]
        public async Task<ActionResult<User>> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
