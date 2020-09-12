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
    public class HobbiesController : ControllerBase
    {
        private readonly HobbyDbContext _context;

        public HobbiesController(HobbyDbContext context)
        {
            _context = context;
        }

        // GET: api/Hobbies
        [HttpGet]
        [EnableCors("_myAllowSpecificOrigins")]
        public async Task<ActionResult<IEnumerable<HobbyDTO>>> GetHobbies()
        {
            return await _context.Hobbies.Select(h=> new HobbyDTO()
            {
                Name = h.Name
            }).ToListAsync();
        }

        // GET: api/Hobbies/5
        [HttpGet("{name}")]
        public async Task<ActionResult<Hobby>> GetHobby(string name)
        {
            var hobby = await _context.Hobbies.FindAsync(name);

            if (hobby == null)
            {
                return NotFound();
            }

            return hobby;
        }

    }
}
