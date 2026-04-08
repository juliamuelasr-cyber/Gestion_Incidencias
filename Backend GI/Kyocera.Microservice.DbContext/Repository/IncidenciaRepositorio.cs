using Microsoft.EntityFrameworkCore;
using Kyocera.Microservice.Models.Models; // Verifica que este sea el namespace en Models_Incidencia.cs
 // Cambiado para usar la interfaz desde el proyecto Models
using Kyocera.Microservice.DbContext.BoundedContext;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kyocera.Microservice.DbContext.Repositorios
{
    // Implementa la interfaz desde el proyecto Models
    public class IncidenciaRepositorio : IIncidenciasRepository
    {
        private readonly AppDbContext _context;

        public IncidenciaRepositorio(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Incidencia>> GetAllAsync() => await _context.Incidencias.ToListAsync();

        public async Task<Incidencia?> GetByIdAsync(int id) => await _context.Incidencias.FindAsync(id);

        public async Task<Incidencia> CreateAsync(Incidencia incidencia)
        {
            await _context.Incidencias.AddAsync(incidencia);
            await _context.SaveChangesAsync();
            return incidencia;
        }

        public async Task UpdateAsync(Incidencia incidencia)
        {
            _context.Incidencias.Update(incidencia);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var item = await _context.Incidencias.FindAsync(id);
            if (item != null)
            {
                _context.Incidencias.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}