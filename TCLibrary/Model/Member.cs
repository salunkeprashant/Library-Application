using System;
using System.Collections.Generic;

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

		/// <summary>Gets or sets the JoiningDate field. </summary>
		public Nullable<System.DateTime> JoiningDate { get; set;}
		/// <summary>Gets or sets the MemberId field. </summary>
		public System.Int32 MemberId { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Address.Members - Members.Addresses (m:1)'</summary>
		public List<Address> Addresses { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.Members - Members.BookTransactions (m:1)'</summary>
		public List<BookTransaction> BookTransactions { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ContactDetail.Members - Members.ContactDetails (m:1)'</summary>
		public List<ContactDetail> ContactDetails { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ItemTransaction.Members - Members.ItemTransactions (m:1)'</summary>
		public List<ItemTransaction> ItemTransactions { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'MembersDetail.Members - Members.MembersDetails (m:1)'</summary>
		public List<MemberDetail> MemberDetails { get; set;}
	}
}
