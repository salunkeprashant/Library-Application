using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibraryApplication.Model
{
    public partial class BookCategory
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<Book> Books { get; set; }
    }
}
