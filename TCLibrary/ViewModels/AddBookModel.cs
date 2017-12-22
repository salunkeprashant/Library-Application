using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TCLibrary.Model;

namespace TCLibrary.ViewModels
{
    public class AddBookModel
    {
        public string Author { get; set; }
        public int? CategoryId { get; set; }
        public int ISBN { get; set; }
        public string Pages { get; set; }
        public int Quantity { get; set; }
        public string Title { get; set; }
        public decimal? Ratings { get; set; }
        public string YearOfPublish { get; set; }
        public int? AuthorId { get; set; }
        public string CategoryName { get; set; }
        public List<Authors> authors { get; set; } 
    }
}
