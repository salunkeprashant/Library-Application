using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace TCLibrary.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly LibraryDataContext db;

        public UsersController(LibraryDataContext context)
        {
            db = context;
        }

        // GET: api/values
        [HttpGet]
        public IQueryable Get()
        {
            return db.Users;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IQueryable Get(int id)
        {
            return db.Users.Where(x=>x.UserId ==id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
