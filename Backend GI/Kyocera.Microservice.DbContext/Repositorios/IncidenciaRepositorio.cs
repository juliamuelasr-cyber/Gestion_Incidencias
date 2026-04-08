using Microsoft.EntityFrameworkCore;
using Kyocera.Microservice.Models.Models;
using Kyocera.Microservice.DbContext.BoundedContext;
using Kyocera.Microservice.WebAPI.Interface; // Referencia a la interfaz

namespace Kyocera.Microservice.DbContext.Repositorios
{
    public class IncidenciaRepositorio : IInterface
    {
        private readonly AppDbContext _context;

        public IncidenciaRepositorio(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Incidencia>> GetAllAsync()
        {
            return await _context.Incidencias.ToListAsync();
        }

        public async Task<Incidencia> GetByIdAsync(int id)
        {
            return await _context.Incidencias.FindAsync(id);
        }

        public async Task CreateAsync(Incidencia incidencia)
        {
            await _context.Incidencias.AddAsync(incidencia);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Incidencia incidencia)
        {
            _context.Incidencias.Update(incidencia);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var incidencia = await _context.Incidencias.FindAsync(id);
            if (incidencia != null)
            {
                _context.Incidencias.Remove(incidencia);
                await _context.SaveChangesAsync();
            }
        }
    }
}