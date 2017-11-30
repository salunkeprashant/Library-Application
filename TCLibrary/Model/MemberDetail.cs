using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'UserDetail'.</summary>
	public partial class MemberDetail : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="MemberDetail"/> class.</summary>
		public MemberDetail() : base()
		{
			OnCreated();
		}

		/// <summary>Gets or sets the FirstName field. </summary>
		public string FirstName { get; set;}
		/// <summary>Gets or sets the Id field. </summary>
		public int Id { get; set;}
		/// <summary>Gets or sets the LastName field. </summary>
		public string LastName { get; set;}
		/// <summary>Gets or sets the MemberId field. </summary>
		public int? MemberId { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'UserDetail.User - User.UserDetails (m:1)'</summary>
		public Member Members { get; set;}
	}
}
