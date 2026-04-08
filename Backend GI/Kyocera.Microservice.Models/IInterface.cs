using Kyocera.Microservice.Models.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Kyocera.Microservice.Models.Interfaces
{
    public interface IInterface
    {
        Task<List<Incidencia>> GetAllAsync();
        Task<Incidencia> GetByIdAsync(int id);
        Task CreateAsync(Incidencia incidencia);
        Task UpdateAsync(Incidencia incidencia);
        Task DeleteAsync(int id);
    }
}
