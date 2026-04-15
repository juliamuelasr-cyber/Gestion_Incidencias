using System.Collections.Generic;
using System.Threading.Tasks;
using Kyocera.Microservice.Models.Models;

namespace Kyocera.Microservice.DbContext.Repository
{
    public interface IIncidenciasRepository
    {
        Task<IEnumerable<Incidencia>> GetAllAsync();
        Task<Incidencia?> GetByIdAsync(int id);
        Task<Incidencia> CreateAsync(Incidencia incidencia);
        Task UpdateAsync(Incidencia incidencia);
        Task DeleteAsync(int id);
    }
}
