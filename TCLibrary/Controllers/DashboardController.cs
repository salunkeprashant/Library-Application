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
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TCLibrary.Controllers
{
  [Authorize(Policy = "ApiUser")]
  [Route("api/[controller]")]
  public class DashboardController : Controller
  {
    private readonly LibraryDataContext appDbContext;
    private readonly JsonSerializerSettings serializerSettings;

    public DashboardController(LibraryDataContext context)
    {
      appDbContext = context;

      serializerSettings = new JsonSerializerSettings
      {
        Formatting = Formatting.Indented
      };
    }

    // GET api/dashboard/home
    [HttpGet("home")]
    public IActionResult GetHome()
    {
      return new OkObjectResult(new { Message = "Prashant - You are Authorise " });
    }

    [HttpPost("book")]
    public IActionResult Book()
    {
      var result = (from books in appDbContext.Books

                    select new
                    {
                      books.ISBN,
                      books.Title,
                      books.BookCategory.CategoryName,
                      books.BookCategory.CategoryId,
                      Author = appDbContext.BookAuthors.Where(x => x.ISBN == books.ISBN).Select(x => x.Authors.Author),
                      AuthorId = appDbContext.BookAuthors.Where(x => x.ISBN == books.ISBN).Select(x => x.Authors.AuthorId),
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

      var obj = new { data = result };

      var json = JsonConvert.SerializeObject(obj, serializerSettings);

      return new OkObjectResult(json);
    }
    [HttpGet("book")]
    public IQueryable Books()
    {
      var result = (from books in appDbContext.Books

                    select new
                    {
                      books.ISBN,
                      books.Title,
                      books.BookCategory.CategoryName,
                      books.BookCategory.CategoryId,
                      Authors = appDbContext.BookAuthors.Where(x => x.ISBN == books.ISBN).Select(x => x.Authors),
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
    [HttpGet("issuedetails")]
    public IQueryable IssueDetails()
    {
      var result = appDbContext.BookTransactions.Select(x => new
      {
        x.TransactionId,
        MemberName = x.Member.FirstName + ' ' + x.Member.LastName,
        x.Books.Title,
        x.IssueDate,
        x.BookId,
        AdminName = x.Admin.FirstName + ' ' + x.Admin.LastName,
        x.ReturnDate
      }).Where(x => x.ReturnDate == null);
      return result;
    }

    [HttpPost("addbook")]
    public async Task<IActionResult> AddBook([FromBody]AddBookModel book)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      foreach (var author in book.Authors)
      {
        if (!appDbContext.Authors.Any(x => x.Author == author.Author))
        {
          await appDbContext.Authors.AddAsync(new Authors { Author = author.Author });
        }
      }

      if (book.CategoryName != null) await appDbContext.BookCategories.AddAsync(new BookCategory { CategoryName = book.CategoryName });

      appDbContext.SaveChanges();

      await appDbContext.Books.AddAsync(
          new Book { Title = book.Title, ISBN = book.ISBN, CategoryId = book.CategoryId, Pages = book.Pages, Quantity = book.Quantity, Ratings = book.Ratings, YearOfPublish = book.YearOfPublish });

      for (int i = 1; i <= book.Quantity; i++)
        await appDbContext.BookMetadatas.AddAsync(new BookMetadata { ISBN = book.ISBN, Status = true });

      foreach (var author in book.Authors)
      {
        await appDbContext.BookAuthors.AddAsync(new BookAuthor { ISBN = book.ISBN, AuthorId = author.AuthorId });
      }


      await appDbContext.SaveChangesAsync();

      return new OkObjectResult("{}");
    }

    [HttpPost("updatebook")]
    public async Task<IActionResult> UpdateBook([FromBody]AddBookModel book)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      foreach (var author in book.Authors)
      {
        if (!appDbContext.Authors.Any(x => x.Author == author.Author))
        {
          await appDbContext.Authors.AddAsync(new Authors { Author = author.Author });
        }
      }

      var BookToUpdate = await appDbContext.Books
        .Include(x=>x.BookCategory)
        .Include(x=>x.BookAuthors)
        .SingleOrDefaultAsync(s => s.ISBN == book.ISBN);

      bool isCaregoryExist = appDbContext.BookCategories.Any(x => x.CategoryName == book.CategoryName);
      if (!isCaregoryExist) await appDbContext.BookCategories.AddAsync(new BookCategory { CategoryName = book.CategoryName });

      // remove authors first
      BookToUpdate.BookAuthors = null;
      await appDbContext.SaveChangesAsync();

      foreach (var author in book.Authors)
      {
        await appDbContext.BookAuthors.AddAsync(new BookAuthor { ISBN = book.ISBN, AuthorId = author.AuthorId });
      }

      await appDbContext.SaveChangesAsync();
      
      if (BookToUpdate != null)
      {
        BookToUpdate.Title = book.Title;
        BookToUpdate.Ratings = book.Ratings;
        BookToUpdate.Pages = book.Pages;
        BookToUpdate.Quantity = book.Quantity;
        BookToUpdate.YearOfPublish = book.YearOfPublish;
        BookToUpdate.CategoryId = book.CategoryId;
      }

      await appDbContext.SaveChangesAsync();


      return new OkObjectResult("{}");
    }

    [HttpPost("issuebook")]
    public async Task<IActionResult> IssueBook([FromBody]IssueBookModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      await appDbContext.BookTransactions.AddAsync(
          new BookTransaction { AdminId = model.AdminId, ISBN = model.ISBN, BookId = model.BookId, IssueDate = model.IssueDate, MemberId = model.MemberId });

      var mdToUpdate = await appDbContext.BookMetadatas.SingleOrDefaultAsync(s => s.BookId == model.BookId);
      if (mdToUpdate != null)
      {
        mdToUpdate.Status = false;
      }

      await appDbContext.SaveChangesAsync();

      return new OkObjectResult("{}");
    }

    [HttpPost("returnbook")]
    public async Task<IActionResult> ReturnBook([FromBody]ReturnBookModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var BT_ToUpdate = await appDbContext.BookTransactions.SingleOrDefaultAsync(s => s.TransactionId == model.TransactionId);
      var BM_ToUpdate = await appDbContext.BookMetadatas.SingleOrDefaultAsync(s => s.BookId == model.BookId);
      if (BM_ToUpdate != null && BT_ToUpdate != null)
      {
        BM_ToUpdate.Status = true;
        BT_ToUpdate.ReturnDate = model.ReturnDate;
      }

      await appDbContext.SaveChangesAsync();

      return new OkObjectResult("{}");
    }

    [HttpGet("category")]
    public IQueryable Category()
    {
      return appDbContext.BookCategories.Select(x => new { x.CategoryId, x.CategoryName });

    }

    [HttpGet("authors")]
    public IQueryable Authors()
    {
      return appDbContext.Authors.Select(x => new { x.AuthorId, x.Author });

    }

    [HttpDelete("{isbn}")]
    public IActionResult Delete(int isbn)
    {
      var book = appDbContext.Books
        .Include(x => x.BookTransactions)
        .Where(x => x.ISBN == isbn).FirstOrDefault();

      if (book.BookTransactions.Count > 0)
      {
        return this.BadRequest("Delete Failed! You already have issued this book to someone");
      }
      appDbContext.Books.Remove(book);
      appDbContext.SaveChanges();

      return new OkObjectResult("{}");
    }

  }
}
