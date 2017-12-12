using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    public partial class BookAuthor 
    {
        [Key]
        public int id { get; set; }
        public int? ISBN { get; set; }
        public int? AuthorId { get; set; }
        public Book Books { get; set; }
        public Authors Authors { get; set; }
    }
}