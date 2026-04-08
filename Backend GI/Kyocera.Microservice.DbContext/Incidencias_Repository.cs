using Kyocera.Microservice.DbContext.BoundedContext;
using Kyocera.Microservice.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace Kyocera.Microservice.DbContext
{
    public class IncidenciasRepository : IInterface
    {
        private readonly AppDbContext _context;

        public IncidenciasRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Incidencia>> GetAllAsync() =>
            await _context.Incidencias.ToListAsync();

        public async Task<Incidencia> GetByIdAsync(int id) =>
            await _context.Incidencias.FindAsync(id);

        public async Task CreateAsync(Incidencia incidencia)
        {
            _context.Incidencias.Add(incidencia);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Incidencia incidencia)
        {
            _context.Incidencias.Update(incidencia);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var inc = await _context.Incidencias.FindAsync(id);
            if (inc != null)
            {
                _context.Incidencias.Remove(inc);
                await _context.SaveChangesAsync();
            }
        }
    }
}