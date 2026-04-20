using System.Collections.Generic;
using Kyocera.Microservice.Models.Models;

namespace Kyocera.Microservice.DbContext.Repository
{
    public interface IUsuariosRepository
    {
        IEnumerable<Usuario> GetAll();
        Usuario? GetByEmail(string email);
        void Add(Usuario usuario);
        void SaveChanges();
    }
}
