using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TCLibrary.Model
{
    /// <summary>Class which represents the entity 'Members'.</summary>
    public partial class Member : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion

        /// <summary>Initializes a new instance of the <see cref="Member"/> class.</summary>
        public Member() : base()
        {
            this.Addresses = new List<Address>();
            this.BookTransactions = new List<BookTransaction>();
            this.ContactDetails = new List<ContactDetail>();
            this.ItemTransactions = new List<ItemTransaction>();
            this.MemberDetails = new List<MemberDetail>();
            OnCreated();
        }

        [Key]
        public int MemberId { get; set; }
        public DateTime? JoiningDate { get; set; }

        public List<Address> Addresses { get; set; }
        public List<BookTransaction> BookTransactions { get; set; }
        public List<ContactDetail> ContactDetails { get; set; }
        public List<ItemTransaction> ItemTransactions { get; set; }
        public List<MemberDetail> MemberDetails { get; set; }
    }
}
