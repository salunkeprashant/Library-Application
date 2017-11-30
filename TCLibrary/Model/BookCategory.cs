using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    /// <summary>Class which represents the entity 'BookCategory'.</summary>
    public partial class BookCategory : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion

        /// <summary>Initializes a new instance of the <see cref="BookCategory"/> class.</summary>
        public BookCategory() : base()
        {
            this.Books = new List<Book>();
            OnCreated();
        }


        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<Book> Books { get; set; }
    }
}
