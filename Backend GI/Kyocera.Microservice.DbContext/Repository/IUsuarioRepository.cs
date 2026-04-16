using Kyocera.Microservice.Models.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyocera.Microservice.DbContext.Repository
{
    public interface IUsuarioRepository
    {
        Usuario? GetByUsuario(string usuario);
        Usuario? GetById(int id);
        bool Exists(string usuario);
        void Add(Usuario usuario);
        void Save();
    }
}
