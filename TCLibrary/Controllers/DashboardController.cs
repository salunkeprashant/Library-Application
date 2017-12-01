using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TCLibrary.Data;
using Microsoft.EntityFrameworkCore.Internal;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TCLibrary.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly LibraryDataContext appDb;

        public DashboardController(LibraryDataContext context)
        {
            appDb = context;
        }

        // GET api/dashboard/home
        [HttpGet("home")]
        public IActionResult GetHome()
        {
            return new OkObjectResult(new { Message = "Prashant - You are Authorise " });
        }

        [HttpGet("book")]
        public IQueryable Book()
        {
            return appDb.BookAuthors.Select(x => new { x.ISBN,x.Books.Title, x.Authors.Author });

           // return new OkObjectResult(new { Message = "Prashant Salunke - You are Authorise " });

        }
    }
}
