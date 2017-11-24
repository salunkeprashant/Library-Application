using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'User'.</summary>
	public partial class User : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="User"/> class.</summary>
		public User() : base()
		{
			this.Addresses = new List<Address>();
			this.BookTransactions = new List<BookTransaction>();
			this.ContactDetails = new List<ContactDetail>();
			this.ItemTransactions = new List<ItemTransaction>();
			this.UserDetails = new List<UserDetail>();
			OnCreated();
		}

		/// <summary>Gets or sets the JoiningDate field. </summary>
		public Nullable<System.DateTime> JoiningDate { get; set;}
		/// <summary>Gets or sets the UserId field. </summary>
		public System.Int32 UserId { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Address.User - User.Addresses (m:1)'</summary>
		public List<Address> Addresses { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.User - User.BookTransactions (m:1)'</summary>
		public List<BookTransaction> BookTransactions { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ContactDetail.User - User.ContactDetails (m:1)'</summary>
		public List<ContactDetail> ContactDetails { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ItemTransaction.User - User.ItemTransactions (m:1)'</summary>
		public List<ItemTransaction> ItemTransactions { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'UserDetail.User - User.UserDetails (m:1)'</summary>
		public List<UserDetail> UserDetails { get; set;}
	}
}
