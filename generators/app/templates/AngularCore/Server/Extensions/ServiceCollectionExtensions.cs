using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel;
using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace <%= safeName %>.Server.Extensions
{
    public static class ServiceCollectionExtensions
    {

        public static IServiceCollection AddSslCertificate(this IServiceCollection services, IHostingEnvironment hostingEnv)
        {
            var cert = new X509Certificate2(Path.Combine(hostingEnv.ContentRootPath, "extra", "cert.pfx"), "game123");

            services.Configure<KestrelServerOptions>(options =>
            {
                options.UseHttps(cert);

            });

            return services;
        }

        public static IServiceCollection AddHttpsRedirect(this IServiceCollection services, IHostingEnvironment hostingEnv)
        {
            services.Configure<MvcOptions>(options =>
            {
            options.Filters.Add(new RequireHttpsAttribute());
            });

            return services;
        }

        public static IServiceCollection AddCustomizedMvc(this IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            return services;
        }
       
        public static IServiceCollection AddCustomDbContext(this IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Startup.Configuration["Data:SqlServerConnectionString"]);
            });
            return services;
        }
    }
}
