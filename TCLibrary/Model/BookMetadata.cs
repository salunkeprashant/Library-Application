using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TCLibrary.Model
{
    public partial class BookMetadata : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion

        public BookMetadata() : base()
		{
            OnCreated();
        }

        [Key]
        public int BookId { get; set; }
        public int? ISBN { get; set; }
        public string Status { get; set; }
        public DateTime? IsuueTimestamp { get; set; }
        public DateTime? ReturnTimestamp { get; set; }
        public Book books { get; set; }
    }
}
