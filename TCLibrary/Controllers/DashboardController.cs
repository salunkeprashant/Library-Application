using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TCLibrary.Data;
using Microsoft.EntityFrameworkCore.Internal;
using TCLibrary.Model;
using TCLibrary.Helpers;
using TCLibrary.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TCLibrary.Controllers
{
   // [Authorize(Policy = "ApiUser")]
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly LibraryDataContext appDbContext;

        public DashboardController(LibraryDataContext context)
        {
            appDbContext = context;
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
            var result = (from books in appDbContext.Books
                         join bookAuthors in appDbContext.BookAuthors on books.ISBN equals bookAuthors.ISBN
                         join author in appDbContext.Authors on bookAuthors.AuthorId equals author.AuthorId

                         select new {
                             books.ISBN,
                             books.Title,
                             books.BookCategory.CategoryName,
                             author.Author,
                             books.Ratings,
                             books.Pages,
                             books.YearOfPublish,
                             books.Quantity
                         });
            return result;
        }

        [HttpPost("addbook")]
        public async Task<IActionResult> AddBook([FromBody]AddBookModel book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            await appDbContext.Books.AddAsync(
                new Book {Title=book.Title, ISBN = book.ISBN, CategoryId = book.CategoryId, Pages = book.Pages, Quantity = book.Quantity, Ratings =book.Ratings,YearOfPublish = book.YearOfPublish });

            await appDbContext.Authors.AddAsync(
                  new Authors { Author = book.Author });

            await appDbContext.BookMetadatas.AddAsync(
                  new BookMetadata { BookId = book.BookId, ISBN = book.ISBN,Status = "Available" });

            //await appDbContext.BookAuthors.AddAsync(
            //    new BookAuthor { ISBN=book.ISBN});

            await appDbContext.SaveChangesAsync();

            return new OkObjectResult("Done");
        }

        [HttpPost("issuebook")]
        public async Task<IActionResult> IssueBook([FromBody]IssueBookModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            await appDbContext.BookTransactions.AddAsync(
                new BookTransaction {AdminId = model.AdminId, ISBN = model.ISBN, BookId = model.BookId,IssueDate = model.IssueDate,MemberId = model.MemberId });
            
            await appDbContext.SaveChangesAsync();

            return new OkObjectResult("Done");
        }

        [HttpGet("category")]
        public IQueryable Category()
        {
            return appDbContext.BookCategories.Select(x => new { x.CategoryId, x.CategoryName });

        }

        [HttpGet("bktxn")]
        public IQueryable Txn()
        {
            return appDbContext.BookTransactions.Select(x=>new {x.TransactionId,x.IssueDate });

        }
    }
}
