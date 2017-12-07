using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    /// <summary>Class which represents the entity 'BookTransaction'.</summary>
    public partial class BookTransaction : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion


        public BookTransaction() : base()
        {
            OnCreated();
        }

        [Key]
        public int TransactionId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int? BookId { get; set; }
        public int? AdminId { get; set; }
        public int ISBN { get; set; }
        public int? MemberId { get; set; }
       
        public Admin Admin { get; set; }
        public Book Book { get; set; }
        public BookMetadata BookMetadata { get; set; }
        public Member Member { get; set; }
        
    }
}
