using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using <%= safeName %>.Server.Models;
using <%= safeName %>.Server;
using <%= safeName %>.Server.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace <%= safeName %>.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class PersonController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PersonController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Person
        [HttpGet]
        public IEnumerable<Person> GetPersons()
        {
            return _context.Person.ToList();
        }

        [HttpGet("{id}")]
        public Person GetPerson([FromRoute]int id)
        {
            return _context.Person.FirstOrDefault(x => x._id == id);
        }

        [HttpPost]
        public IActionResult AddPerson([FromBody] Person person)
        {
            person._id = _context.Person.Count() + 1;

            _context.Person.Add(person);

            return Ok(person);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePerson([FromRoute] int id)
        {
            _context.Remove(_context.Person.FirstOrDefault(p => p._id == id));

            return Ok();
        }

    }
}
