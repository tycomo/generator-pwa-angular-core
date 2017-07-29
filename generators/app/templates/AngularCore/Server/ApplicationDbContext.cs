using <%= safeName %>.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace <%= safeName %>.Server
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<ToDo> ToDo { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
