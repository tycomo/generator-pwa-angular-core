// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace <%= safeName %>.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _environment;

        public HomeController(IHostingEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.MainJs = await GetMainJs();

            return View();
        }

        public async Task<string> GetMainJs()
        {
            var basePath = _environment.WebRootPath + "//dist//";

            if (_environment.IsDevelopment() && !System.IO.File.Exists(basePath + "main.js"))
            {
                using (var client = new HttpClient())
                {
                    var requestUri = Request.Scheme + "://" + Request.Host + "/dist/main.js";
                    await client.GetAsync(requestUri);
                }
            }

            var info = new System.IO.DirectoryInfo(basePath);
            var file = info.GetFiles()
                .Where(f => _environment.IsDevelopment() ? f.Name == "main.js" : f.Name.StartsWith("main.") && !f.Name.EndsWith("bundle.map"));
            return file.FirstOrDefault().Name;
        }

    }
}
