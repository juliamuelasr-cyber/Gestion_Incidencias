using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kyocera.Microservice.DbContext.BoundedContext;
using Kyocera.Microservice.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace Kyocera.Microservice.Application.Services
{
    public class IncidenciasService : IIncidenciasService
    {
        private readonly AppDbContext _context;

        public IncidenciasService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Incidencia>> GetAllAsync()
        {
            return await _context.Incidencias.ToListAsync();
        }

        public async Task<Incidencia?> GetByIdAsync(int id)
        {
            return await _context.Incidencias.FindAsync(id);
        }

        public async Task<Incidencia> CreateAsync(Incidencia incidencia)
        {
            incidencia.FechaCreacion = DateTime.Now;

            await _context.Incidencias.AddAsync(incidencia);
            await _context.SaveChangesAsync();

            return incidencia;
        }

        public async Task<bool> UpdateAsync(int id, Incidencia incidencia)
        {
            if (id != incidencia.Id)
                return false;

            var existing = await _context.Incidencias.FindAsync(id);

            if (existing == null)
                return false;

            existing.Titulo = incidencia.Titulo;
            existing.Descripcion = incidencia.Descripcion;
            existing.Estado = incidencia.Estado;
            existing.Prioridad = incidencia.Prioridad;
            existing.FechaLimite = incidencia.FechaLimite;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var incidencia = await _context.Incidencias.FindAsync(id);

            if (incidencia == null)
                return false;

            _context.Incidencias.Remove(incidencia);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}