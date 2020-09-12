using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HobbyMeetAPI.Models
{
    public class User
    {
        [Key]
        public string UserId { get; set; }
    }
}
