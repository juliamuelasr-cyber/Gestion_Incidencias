using Kyocera.Microservice.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kyocera.Microservice.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthorizationService _authService;

        public AuthController(IAuthorizationService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null)
                return BadRequest("El cuerpo de la petición no puede estar vacío");

            var token = _authService.Authenticate(request.Usuario, request.Password);

            if (token == null)
                return Unauthorized(new { message = "Credenciales incorrectas" });

            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] LoginRequest request)
        {
            if (request == null)
                return BadRequest("El cuerpo de la petición no puede estar vacío");

            var success = _authService.Register(request.Usuario, request.Password);

            if (!success)
                return BadRequest(new { message = "El usuario ya existe" });

            return Ok(new { message = "Usuario registrado correctamente" });
        }
    }
}