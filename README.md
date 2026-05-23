# Fullstack Application

A fullstack CRUD application with **Angular** frontend and **.NET** backend.

## Project Structure

```
fullstack/
├── frontend/     # Angular app (consumes backend API)
├── backend/      # .NET Web API (CRUD endpoints)
└── README.md
```

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm (for Angular frontend)
- **.NET SDK** 10 or 8 (for backend)

### Run the Application

1. **Start the backend** (in one terminal):

   ```bash
   cd backend
   dotnet run
   ```

   Backend runs at: http://localhost:5047

2. **Start the frontend** (in another terminal):

   ```bash
   cd frontend
   npm start
   ```

   Frontend runs at: http://localhost:4200

3. Open http://localhost:4200 in your browser. You can create, read, update, and delete items.

---

## Stepwise Guide to Learn .NET

This guide walks you through building and understanding the .NET backend in this project.

### Step 1: Install .NET SDK

1. Download and install the [.NET SDK](https://dotnet.microsoft.com/download) for your OS.
2. Verify the installation:

   ```bash
   dotnet --version
   ```

### Step 2: Create a New Web API Project

1. Create a new directory and navigate into it:

   ```bash
   mkdir my-api
   cd my-api
   ```

2. Create a new Web API project:

   ```bash
   dotnet new webapi -n MyApi -o . -f net10.0
   ```

3. Run the project:

   ```bash
   dotnet run
   ```

   Visit the URLs shown in the terminal (e.g., http://localhost:5000).

### Step 3: Understand the Project Structure

- **Program.cs** – Entry point and configuration (middleware, services, routing).
- **appsettings.json** – Configuration (logging, connection strings, etc.).
- **Properties/launchSettings.json** – Launch profiles (URLs, environment).
- **Controllers/** – API controllers that handle HTTP requests.

### Step 4: Create a Model

1. Create a `Models` folder.
2. Add a model class (e.g., `Item.cs`):

   ```csharp
   namespace MyApi.Models;

   public record Item(int Id, string Name, string Description);
   ```

   Records are immutable and ideal for DTOs.

### Step 5: Create a Controller

1. Create a `Controllers` folder (if it doesn’t exist).
2. Add a controller (e.g., `ItemsController.cs`):

   ```csharp
   using Microsoft.AspNetCore.Mvc;

   [ApiController]
   [Route("api/[controller]")]
   public class ItemsController : ControllerBase
   {
       [HttpGet]
       public IActionResult GetAll() => Ok(new[] { "Item 1", "Item 2" });
   }
   ```

3. Run the app and call `GET /api/items`.

### Step 6: Implement CRUD Operations

1. **Create** – Add a service that holds data (e.g., in-memory list).
2. **Read** – `GET /api/items` (all) and `GET /api/items/{id}` (by id).
3. **Update** – `PUT /api/items/{id}` with a request body.
4. **Delete** – `DELETE /api/items/{id}`.

Use `[FromBody]` for POST/PUT request bodies and `[FromRoute]` for route parameters.

### Step 7: Enable CORS (for Frontend)

When a frontend (e.g., Angular) runs on a different port, enable CORS:

```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ...

app.UseCors();
app.MapControllers();
```

### Step 8: Dependency Injection

1. Register services in `Program.cs`:

   ```csharp
   builder.Services.AddSingleton<ItemService>();
   ```

2. Inject them in controllers:

   ```csharp
   public class ItemsController(ItemService itemService) : ControllerBase
   ```

3. Use constructor injection for services.

### Step 9: Add Validation

1. Use `[Required]`, `[MinLength]`, etc. on request DTOs.
2. Check `ModelState.IsValid` in controllers:

   ```csharp
   if (!ModelState.IsValid)
       return BadRequest(ModelState);
   ```

### Step 10: Connect to a Database (Optional)

1. Add Entity Framework Core:

   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Design
   ```

2. Create a `DbContext` and entities.
3. Configure the connection string in `appsettings.json`.
4. Use `AddDbContext` and inject it in your services.

### Step 11: Explore Further

- **Swagger/OpenAPI** – Add `builder.Services.AddOpenApi()` and `app.MapOpenApi()` for API docs.
- **Authentication** – Use JWT Bearer or Identity for auth.
- **Logging** – Use `ILogger<T>` in controllers and services.
- **Configuration** – Use `IConfiguration` for environment-specific settings.

---

## API Endpoints (This Project)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/{id}` | Get item by ID |
| POST | `/api/items` | Create item |
| PUT | `/api/items/{id}` | Update item |
| DELETE | `/api/items/{id}` | Delete item |

---

## Useful .NET Commands

| Command | Description |
|---------|-------------|
| `dotnet new webapi` | Create a new Web API project |
| `dotnet run` | Build and run the project |
| `dotnet build` | Build the project |
| `dotnet add package <Package>` | Add a NuGet package |
| `dotnet ef migrations add <Name>` | Add EF migration (with EF tools) |

---

## Resources

- [.NET Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core/)
- [Angular Documentation](https://angular.dev/)
