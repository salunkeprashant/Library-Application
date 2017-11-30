using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TCLibrary.Model
{
    /// <summary>Class which represents the entity 'Admin'.</summary>
    public partial class Admin : CommonEntityBase
    {
        #region Class Extensibility Methods
        partial void OnCreated();
        #endregion

        public Admin() : base()
        {
            this.BookTransactions = new List<BookTransaction>();
            this.ItemTransactions = new List<ItemTransaction>();
            OnCreated();
        }

        public int AdminId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentityId { get; set; }

        public AppUser Identity { get; set; }
        public List<BookTransaction> BookTransactions { get; set; }
        public List<ItemTransaction> ItemTransactions { get; set; }

    }
}
