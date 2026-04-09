using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Kyocera.Microservice.Models.Models;
using Microsoft.AspNetCore.Mvc;
using Kyocera.Microservice.DbContext.Repository;

namespace Kyocera.Microservice.Controllers  
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncidenciasController : ControllerBase
    {
        private readonly IIncidenciasRepository _repository;

        public IncidenciasController(IIncidenciasRepository repository)
        {
            _repository = repository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incidencia>>> GetAll()
        {
            return Ok(await _repository.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Incidencia>> GetById(int id)
        {
            var incidencia = await _repository.GetByIdAsync(id);

            if (incidencia == null)
                return NotFound();

            return incidencia;
        }

        [HttpPost]
        public async Task<ActionResult<Incidencia>> Create(Incidencia incidencia)
        {
            incidencia.FechaCreacion = DateTime.Now;
            // Nota: la clase Incidencia no define FechaActualizacion; ajustar el modelo si es necesario.

            var created = await _repository.CreateAsync(incidencia);

            return CreatedAtAction(nameof(GetById), new { id = incidencia.Id }, incidencia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Incidencia incidencia)
        {
            if (id != incidencia.Id)
                return BadRequest();

            var existing = await _repository.GetByIdAsync(id);

            if (existing == null)
                return NotFound();

            existing.Titulo = incidencia.Titulo;
            existing.Descripcion = incidencia.Descripcion;
            existing.Estado = incidencia.Estado;
            existing.Prioridad = incidencia.Prioridad;
            existing.FechaLimite = incidencia.FechaLimite;
            // existing.FechaActualizacion = DateTime.Now; // ajustar modelo si se añade la propiedad

            await _repository.UpdateAsync(incidencia);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var incidencia = await _repository.GetByIdAsync(id);

            if (incidencia == null)
                return NotFound();

            await _repository.DeleteAsync(id);

            return NoContent();
        }


    }
}
