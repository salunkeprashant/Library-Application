using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCLibrary.ViewModels
{
    public class AddBookModel
    {
        public string Author { get; set; }
        public int BookId { get; set; }
        public int? CategoryId { get; set; }
        public int ISBN { get; set; }
        public string Pages { get; set; }
        public string Quantity { get; set; }
        public string Title { get; set; }
    }
}
