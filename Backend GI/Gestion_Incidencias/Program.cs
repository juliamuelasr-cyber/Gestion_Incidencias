using Microsoft.EntityFrameworkCore;
using Kyocera.Microservice.DbContext.BoundedContext;
using Kyocera.Microservice.DbContext.Repositorios;
using Kyocera.Microservice.Models.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar la conexión a SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Registro del Repositorio (SOLO UNA VEZ)
// Usamos la interfaz IInterface y la clase IncidenciaRepositorio
builder.Services.AddScoped<IInterface, IncidenciaRepositorio>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuración del pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();