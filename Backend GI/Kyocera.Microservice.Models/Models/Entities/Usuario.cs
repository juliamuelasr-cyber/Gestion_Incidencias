using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyocera.Microservice.Models.Models.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string UsuarioNombre { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
    }
}
