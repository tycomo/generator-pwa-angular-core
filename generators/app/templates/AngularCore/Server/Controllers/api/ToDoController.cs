using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using <%= safeName %>.Server.Models;
using <%= safeName %>.Server;
using <%= safeName %>.Server.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace <%= safeName %>.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [AllowAnonymous]
    public class ToDoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ToDoController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/Person
        [HttpGet]
        public async Task<IActionResult> GetToDo()
        {
            var todos = await _context.ToDo.ToListAsync();

            return new ObjectResult(todos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetToDo([FromRoute]int id)
        {
            var todo = await _context.ToDo.SingleOrDefaultAsync(x => x._id == id);

            if(todo == null)
            {
                return NotFound();
            }

            return new ObjectResult(todo);
        }

        [HttpPost]
        public async Task<IActionResult> AddToDo([FromBody] ToDo todo)
        {
            if(todo == null || todo.toDo == null)
            {
                return BadRequest();
            }

            _context.ToDo.Add(todo);
            await _context.SaveChangesAsync();
            return Ok(todo);                            
        }

        [HttpPatch]
        public async Task<IActionResult> ToggleComplete([FromBody] ToDo todo)
        {
            if(todo == null)
            {
                return BadRequest();
            }

            todo.complete = !todo.complete;
            _context.Update(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDo([FromRoute] int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }

            var todo = await _context.ToDo.SingleOrDefaultAsync(p => p._id == id);

            if(todo == null)
            {
                return NotFound();
            }

            _context.Remove(todo);
            _context.SaveChanges();
            return NoContent();
        }

    }
}
