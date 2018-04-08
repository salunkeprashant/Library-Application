using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    public partial class Admin 
    {
        [Key]
        public int AdminId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentityId { get; set; }

        public AppUser Identity { get; set; }
        public List<BookTransaction> BookTransactions { get; set; }
        public List<ItemTransaction> ItemTransactions { get; set; }

    }
}
