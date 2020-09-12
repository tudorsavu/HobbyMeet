

namespace HobbyMeetAPI.Models
{
    public class UserHobby
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string Name { get; set; }
        public Hobby Hobby { get; set; }

    }
}
