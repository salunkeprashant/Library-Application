using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryApplication.Model
{
    public partial class BookMetadata 
    {
        [Key]
        public Guid BookId { get; set; }
        public int ISBN { get; set; }
        public Boolean Status { get; set; }
        public DateTime? Timestamp { get; set; }
        public Book books { get; set; }
    }
}
