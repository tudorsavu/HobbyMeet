using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HobbyMeetAPI.DTO
{
    public class UserHobbiesDTO
    {
        public string UserId { get; set; }
        public string[] HobbyNames { get; set; }
    }
}
