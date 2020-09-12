using System.ComponentModel.DataAnnotations;

namespace HobbyMeetAPI.Models
{
    public class Hobby
    {   
        [Key]
        public string Name { get; set; }
        // categories
        public int ArtScore { get; set; }
        public int GameScore { get; set; }
        public int SportScore { get; set; }
        public int CollectingScore { get; set; }
        public int CraftScore { get; set; }
        public int ActivityScore { get; set; }
    }
}
