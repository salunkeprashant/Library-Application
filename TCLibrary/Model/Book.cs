using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    public partial class Book : CommonEntityBase
    {
        #region Class Extensibility Methods
        partial void OnCreated();
        #endregion

        public Book() : base()
        {
            OnCreated();
        }

        [Key]
        public int ISBN { get; set; }
        public string Title { get; set; }
        public string Pages { get; set; }
        public string Quantity { get; set; }
        public decimal? Ratings { get; set; }
        public string YearOfPublish { get; set; }
        public int? CategoryId { get; set; }
       
        public BookCategory BookCategory { get; set; }
        public List<BookAuthor> BookAuthors { get; set; }
        public List<BookMetadata> BookMetadatas { get; set; }
        public List<BookTransaction> BookTransactions { get; set; }
    }
}
