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
            this.BokkMetadatas = new List<BookMetadata>();
            this.BookTransactions = new List<BookTransaction>();
            OnCreated();
        }

        public int? AuthorId { get; set; }

        [Key]
        public int ISBN { get; set; }
        public string BookName { get; set; }
        public string Pages { get; set; }
        public string Quantity { get; set; }
        public decimal? Ratings { get; set; }
        public string YearOfPublish { get; set; }
        public Author Author { get; set; }
        public int? CategoryId { get; set; }

        public BookCategory BookCategory { get; set; }
        public List<BookTransaction> BookTransactions { get; set; }
        public List<BookMetadata> BokkMetadatas { get; set; }
    }
}
