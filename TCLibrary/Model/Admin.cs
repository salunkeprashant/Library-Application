using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'Admin'.</summary>
	public partial class Admin : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="Admin"/> class.</summary>
		public Admin() : base()
		{
			this.BookTransactions = new List<BookTransaction>();
			this.ItemTransactions = new List<ItemTransaction>();
			OnCreated();
		}

		/// <summary>Gets or sets the AdminId field. </summary>
		public System.Int32 AdminId { get; set;}
		/// <summary>Gets or sets the AdminName field. </summary>
		public System.String AdminName { get; set;}
		/// <summary>Gets or sets the Password field. </summary>
		public System.String Password { get; set;}
		/// <summary>Gets or sets the Username field. </summary>
		public System.String Username { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.Admin - Admin.BookTransactions (m:1)'</summary>
		public List<BookTransaction> BookTransactions { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ItemTransaction.Admin - Admin.ItemTransactions (m:1)'</summary>
		public List<ItemTransaction> ItemTransactions { get; set;}
	}
}
