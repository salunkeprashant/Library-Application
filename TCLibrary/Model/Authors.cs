using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    /// <summary>Class which represents the entity 'Author'.</summary>
    public partial class Authors : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion

        public Authors() : base()
        {
            this.BookAuthors = new List<BookAuthor>();
            OnCreated();
        }

        [Key]
        public int AuthorId { get; set; }
        public string Author { get; set; }
        public string BookPublished { get; set; }
        public List<BookAuthor> BookAuthors { get; set; }
    }
}
