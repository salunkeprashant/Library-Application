using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TCLibrary.Model;
using Microsoft.AspNetCore.Identity;
using TCLibrary.Helpers;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TCLibrary.Auth;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using TCLibrary.Data;
using TCLibrary.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TCLibrary.Controllers
{

    public class AccountsController : Controller
    {
        private readonly LibraryDataContext appDbContext;
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ILogger logger;
        private readonly JsonSerializerSettings serializerSettings;
        private readonly IJwtFactory jwtFactory;
        private readonly JwtIssuerOptions jwtOptions;

        public AccountsController(UserManager<AppUser> um, IJwtFactory jwtFac, IOptions<JwtIssuerOptions> jwtOption, LibraryDataContext appDb)
        {
            userManager = um;
            jwtFactory = jwtFac;
            jwtOptions = jwtOption.Value;

            appDbContext = appDb;

            serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        // GET: api/accounts
        [Route("api/Admins")]
        [HttpGet]
        public IQueryable Get()
        {
            return appDbContext.Admins.Select(x => new { x.AdminId, adminName = x.FirstName + ' '+ x.LastName });
        }

        // POST api/accounts

        [Route("api/accounts")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new AppUser { UserName = model.Email, Email = model.Email };
            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));


            await appDbContext.Admins.AddAsync(
                new Admin { IdentityId = user.Id, FirstName = model.FirstName, LastName = model.LastName });
            await appDbContext.SaveChangesAsync();

            return new OkObjectResult("Done");
        }

        // POST: api/account/login
        [Route("api/auth/login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);

            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            var json = JsonConvert.SerializeObject(response, serializerSettings);
            return new OkObjectResult(json);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
            {
                // get the user to verifty
                var userToVerify = await userManager.FindByNameAsync(userName);

                if (userToVerify != null)
                {
                    // check the credentials  
                    if (await userManager.CheckPasswordAsync(userToVerify, password))
                    {
                        return await Task.FromResult(jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
                    }
                }
            }
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}
