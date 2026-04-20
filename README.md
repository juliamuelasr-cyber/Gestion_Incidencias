Sistema de Gestión de Incidencias 

Ejecución del Backend: 

  - Necesario ASP.NET Core 8. 

  - Se debe configurar la cadena de conexión en appsettings.json (actualmente apunta a (localdb)\MSSQLLocalDB). Una vez que ya tienes conectada la base de datos, se ejecutan las migraciones con: dotnet ef database update. 

  - Por último, para iniciar la ejecución: dotnet run. 

  - Una vez en ejecución, también puedes acceder a la interfaz de Swagger, en la que puedes interactuar para probar todos los endpoints realizados durante el proyecto. 

Ejecución del Frontend: 

  - En el Frontend se usa Vite con React, por lo que se requiere instalar depencendias usando el comando npm install. 

  - Una vez instaladas, se utiliza el comando npm run dev para arrancar el servidor de desarrollo, el cual nos dará una dirección de localhost (ejemplo: http://localhost:5173) que nos permitirá visualizar el proyecto en el navegador. 
