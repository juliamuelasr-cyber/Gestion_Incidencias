using Microsoft.EntityFrameworkCore;
using Kyocera.Microservice.Models.Models; // Verifica que este sea el namespace en Models_Incidencia.cs
using Kyocera.Microservice.WebAPI.Interface; // Verifica que este sea el namespace en IInterface.cs
using Kyocera.Microservice.DbContext.BoundedContext;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kyocera.Microservice.DbContext.Repositorios
{
    // Si IInterface sale en rojo, es que la Referencia de Proyecto del paso 1 falló
    public class IncidenciaRepositorio : IInterface
    {
        private readonly AppDbContext _context;

        public IncidenciaRepositorio(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Incidencia>> GetAllAsync() => await _context.Incidencias.ToListAsync();

        public async Task<Incidencia> GetByIdAsync(int id) => await _context.Incidencias.FindAsync(id);

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
            var item = await _context.Incidencias.FindAsync(id);
            if (item != null)
            {
                _context.Incidencias.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}