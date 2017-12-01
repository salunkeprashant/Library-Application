using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    public partial class BookAuthor : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion
        public BookAuthor() : base()
        {
            OnCreated();
        }
        [Key]
        public int id { get; set; }
        public int? ISBN { get; set; }
        public int? AuthorId { get; set; }
        public Book Books { get; set; }
        public Authors Authors { get; set; }
    }
}