using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController(ItemService itemService) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(itemService.GetAll());

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var item = itemService.GetById(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateItemRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Name is required");

        var item = itemService.Create(request.Name, request.Description ?? "");
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] UpdateItemRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Name is required");

        var item = itemService.Update(id, request.Name, request.Description ?? "");
        return item is null ? NotFound() : Ok(item);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id) =>
        itemService.Delete(id) ? NoContent() : NotFound();
}

public record CreateItemRequest(string Name, string? Description);
public record UpdateItemRequest(string Name, string? Description);
