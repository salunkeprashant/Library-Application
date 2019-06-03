using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryApplication.Model;

namespace LibraryApplication.ViewModels
{
    public class AddBookModel
    {
        public int? CategoryId { get; set; }
        public int ISBN { get; set; }
        public string Pages { get; set; }
        public int Quantity { get; set; }
        public string Title { get; set; }
        public decimal? Ratings { get; set; }
        public string YearOfPublish { get; set; }
        public string CategoryName { get; set; }
        public List<Authors> Authors { get; set; } 
        public List<int> AuthorIds { get; set; } 
    }
}
