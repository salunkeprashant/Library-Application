using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'ContactDetail'.</summary>
	public partial class ContactDetail : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="ContactDetail"/> class.</summary>
		public ContactDetail() : base()
		{
			OnCreated();
		}

		/// <summary>Gets or sets the EmailAddress field. </summary>
		public string EmailAddress { get; set;}
		/// <summary>Gets or sets the Id field. </summary>
		public int Id { get; set;}
		/// <summary>Gets or sets the MobileNo field. </summary>
		public Nullable<System.Int64> MobileNo { get; set;}
		/// <summary>Gets or sets the MemberId field. </summary>
		public int? MemberId { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ContactDetail.User - User.ContactDetails (m:1)'</summary>
		public Member Members { get; set;}
	}
}
