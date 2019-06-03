using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibraryApplication.Model
{
    /// <summary>Class which represents the entity 'Author'.</summary>
    public partial class Authors
    {
        [Key]
        public int AuthorId { get; set; }
        public string Author { get; set; }
        public string BookPublished { get; set; }
        public List<BookAuthor> BookAuthors { get; set; }
    }
}
