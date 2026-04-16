using Kyocera.Microservice.Models.Models.Entities;
using Kyocera.Microservice.DbContext.Repository;
using Kyocera.Microservice.Application.Helpers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Kyocera.Microservice.Application.Services
{
    public class AuthService : IAuthorizationService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        private const string SecretKey = "clave_super_secreta_256Bits!_OK12";
        private const string Issuer = "tuApp";
        private const string Audience = "tuApp";

        public AuthService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        //  LOGIN
        public string? Authenticate(string usuario, string password)
        {
            var user = _usuarioRepository.GetByUsuario(usuario);

            if (user == null)
                return null;

            if (!PasswordHelper.Verify(password, user.PasswordHash))
                return null;

            return GenerateToken(user);
        }

        //  REGISTER
        public bool Register(string usuario, string password)
        {
            if (_usuarioRepository.Exists(usuario))
                return false;

            var user = new Usuario
            {
                UsuarioNombre = usuario,
                PasswordHash = PasswordHelper.Hash(password)
            };

            _usuarioRepository.Add(user);
            _usuarioRepository.Save();

            return true;
        }

        //  JWT GENERATION (CORRECTO)
        private string GenerateToken(Usuario user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(SecretKey));

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UsuarioNombre),
                new Claim(ClaimTypes.Role, "User")
            };

            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}