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
        private readonly IHostingEnvironment _env;

        public HomeController(IHostingEnvironment env)
        {
            _env = env;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.MainDotJs = await GetMainDotJs();

            return View();
        }

        // Because for production this is hashed chunk so has changes on each production build
        public async Task<string> GetMainDotJs()
        {
            var basePath = _env.WebRootPath + "//dist//";

            if (_env.IsDevelopment() && !System.IO.File.Exists(basePath + "main.js"))
            {
                // Just a .js request to make it wait to finish webpack dev middleware finish creating bundles:
                // More info here: https://github.com/aspnet/JavaScriptServices/issues/578#issuecomment-272039541
                using (var client = new HttpClient())
                {
                    var requestUri = Request.Scheme + "://" + Request.Host + "/dist/main.js";
                    await client.GetAsync(requestUri);
                }
            }

            var info = new System.IO.DirectoryInfo(basePath);
            var file = info.GetFiles()
                .Where(f => _env.IsDevelopment() ? f.Name == "main.js" : f.Name.StartsWith("main.") && !f.Name.EndsWith("bundle.map"));
            return file.FirstOrDefault().Name;
        }

    }
}
