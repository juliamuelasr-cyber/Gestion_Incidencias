using Kyocera.Microservice.DbContext.BoundedContext;
using Kyocera.Microservice.Models.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyocera.Microservice.DbContext.BoundedContext.Repository;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext _context;

    public UsuarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public Usuario? GetByUsuario(string usuario)
    {
        return _context.Usuarios
            .FirstOrDefault(u => u.UsuarioNombre == usuario);
    }

    public Usuario? GetById(int id)
    {
        return _context.Usuarios
            .FirstOrDefault(u => u.Id == id);
    }

    public bool Exists(string usuario)
    {
        return _context.Usuarios
            .Any(u => u.UsuarioNombre == usuario);
    }

    public void Add(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}
