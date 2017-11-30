using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
    /// <summary>Class which represents the entity 'Author'.</summary>
    public partial class Author : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion

        public Author() : base()
        {
            this.Books = new List<Book>();
            OnCreated();
        }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string BookPublished { get; set; }

        public List<Book> Books { get; set; }
    }
}
