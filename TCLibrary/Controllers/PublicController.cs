using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LibraryApplication.Data;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace LibraryApplication.Controllers
{
    [Route("api/[controller]")]
    public class PublicController : Controller
    {
        private readonly LibraryDataContext appDbContext;

        public PublicController(LibraryDataContext context)
        {
            appDbContext = context;
        }
        [HttpGet("availablebooks")]
        public IQueryable bookDetails()
        {
            var result = (from books in appDbContext.Books

                          select new
                          {
                              books.ISBN,
                              books.Title,
                              books.BookCategory.CategoryName,
                              Author = appDbContext.BookAuthors.Where(x => x.ISBN == books.ISBN).Select(x => x.Authors.Author),
                              books.Ratings,
                              books.Pages,
                              books.YearOfPublish,
                              books.Quantity,
                              bookId = appDbContext.BookMetadatas
                                    .Where(x => x.ISBN == books.ISBN && x.Status == true)
                                    .Select(x => x.BookId)
                                    .FirstOrDefault(),
                              Count = appDbContext.BookMetadatas
                                    .Where(x => x.Status == true && x.ISBN == books.ISBN)
                                    .Count()

                          });

            return result;
        }
    }
}
