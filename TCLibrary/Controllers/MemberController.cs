using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TCLibrary.Model;
using TCLibrary.Data;

namespace TCLibrary.Controllers
{
    [Route("api/[controller]")]
    public class MemberController : Controller
    {
        private readonly LibraryDataContext appDbContext;

        public MemberController(LibraryDataContext context)
        {
            appDbContext = context;
        }

        // GET: api/values
        [HttpGet]
        public IQueryable Get()
        {
            return appDbContext.Members;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IQueryable Get(int id)
        {
            return appDbContext.Members.Where(x => x.MemberId == id);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Create([FromBody]Member model)
        {
            //var dbuser = new User();

            if (model == null)
            {
                return BadRequest();
            }
            //dbuser.MemberId = user.MemberId;
            //dbuser.JoiningDate = user.JoiningDate;

            appDbContext.Members.Add(model);

            appDbContext.SaveChanges();

            return CreatedAtRoute("User Create", new { id = model.MemberId }, model);
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
