using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCLibrary.Data
{
    public class DBinitialize
    {
        public static void EnsureCreated(IServiceProvider serviceProvider)
        {
            var context = new LibraryDataContext(
                serviceProvider.GetRequiredService<DbContextOptions<LibraryDataContext>>());
            context.Database.EnsureCreated();
        }
    }
}
