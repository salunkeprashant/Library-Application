using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibraryApplication.Model
{
    public partial class Member
    {
        [Key]
        public int MemberId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? JoiningDate { get; set; }

        public List<Address> Addresses { get; set; }
        public List<BookTransaction> BookTransactions { get; set; }
        public List<ContactDetail> ContactDetails { get; set; }
        public List<ItemTransaction> ItemTransactions { get; set; }
    }
}
