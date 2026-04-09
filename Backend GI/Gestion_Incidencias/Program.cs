using Microsoft.EntityFrameworkCore;
using Kyocera.Microservice.DbContext.BoundedContext;
using Kyocera.Microservice.DbContext.Repository;
using Kyocera.Microservice.Application.Services;
using Kyocera.Microservice.Application.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// 1. Configurar la conexión a SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Registro del Repositorio
builder.Services.AddScoped<IIncidenciasRepository, IncidenciasRepository>();

//3. Registro del servicio 
builder.Services.AddScoped<IIncidenciasService, IncidenciasService>();

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