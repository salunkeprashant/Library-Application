using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TCLibrary.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        public DashboardController()
        {
        }

        // GET api/dashboard/home
        [HttpGet("home")]
        public IActionResult GetHome()
        {
            return new OkObjectResult(new { Message = "Prashant - You are Authorise " });
        }

        [HttpGet("book")]
        public IActionResult Book()
        {
            return new OkObjectResult(new { Message = "Prashant Salunke - You are Authorise " });
        }
    }
}
