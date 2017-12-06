using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TCLibrary.Model;
using TCLibrary.Data;
using TCLibrary.ViewModels;

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
            var result = (from members in appDbContext.Members
                          join membersdetails in appDbContext.MembersDetails on members.MemberId equals membersdetails.MemberId
                          join contactdetails in appDbContext.ContactDetails on members.MemberId equals contactdetails.MemberId
                          join address in appDbContext.Addresses on members.MemberId equals address.MemberId

                          select new
                          {
                              members.MemberId,
                              members.JoiningDate,

                              membersdetails.FirstName,
                              membersdetails.LastName,

                              contactdetails.EmailAddress,
                              contactdetails.MobileNo,

                              address.AddressLine,
                              address.CityName,
                              address.StateName,
                          });
            return result;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IQueryable Get(int id)
        {
            return appDbContext.Members.Where(x => x.MemberId == id);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> AddMember([FromBody]AddMemberModel model)
        {

            if (model == null)
            {
                return BadRequest();
            }

            await appDbContext.Members.AddAsync(new Member { MemberId = model.MemberId, JoiningDate = model.JoiningDate });

            await appDbContext.MembersDetails.AddAsync(new MemberDetail { MemberId = model.MemberId, FirstName = model.FirstName, LastName = model.LastName });

            await appDbContext.ContactDetails.AddAsync(new ContactDetail { MemberId = model.MemberId, EmailAddress = model.EmailAddress, MobileNo = model.MobileNo });

            await appDbContext.Addresses.AddAsync(new Address { MemberId = model.MemberId, AddressLine = model.AddressLine, StateName = model.StateName });

            appDbContext.SaveChanges();


            return new OkObjectResult("Done");
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
