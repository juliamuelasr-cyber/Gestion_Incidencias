
using Microsoft.EntityFrameworkCore;

namespace Kyocera.Microservice.BoundedContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Incidencia> Incidencias { get; set; }
    }
}
