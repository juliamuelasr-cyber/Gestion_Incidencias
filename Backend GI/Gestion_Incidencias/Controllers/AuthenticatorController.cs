using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
 
        if (request.Usuario == "admin.kyocera" && request.Password == "1234")
        {
            var token = GenerateToken(request.Usuario);
            return Ok(new { token });
        }

        return Unauthorized();
    }

    private string GenerateToken(string usuario)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("clave_super_secreta"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, usuario)
        };

        var token = new JwtSecurityToken(
            issuer: "tuApp",
            audience: "tuApp",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}