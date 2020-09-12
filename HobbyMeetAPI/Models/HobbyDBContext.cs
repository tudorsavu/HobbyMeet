using Microsoft.EntityFrameworkCore;

namespace HobbyMeetAPI.Models
{
    public class HobbyDbContext : DbContext
    {
        public HobbyDbContext(DbContextOptions<HobbyDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Hobby> Hobbies { get; set; }
        public DbSet<UserHobby> UserHobbies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserHobby>().HasKey(uh => new {uh.UserId, uh.Name});
        }
        
    }
}
