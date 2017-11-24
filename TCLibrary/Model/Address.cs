using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	public partial class Address : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
        #endregion

        /// <summary>Initializes a new instance of the <see cref="Address"/> class.</summary>
        public Address() : base()
		{
			OnCreated();
		}

		/// <summary>Gets or sets the AddressId field. </summary>
		public System.Int32 AddressId { get; set;}
		/// <summary>Gets or sets the AddressLine field. </summary>
		public System.String AddressLine { get; set;}
		/// <summary>Gets or sets the CityName field. </summary>
		public System.String CityName { get; set;}
		/// <summary>Gets or sets the StateName field. </summary>
		public System.String StateName { get; set;}
		/// <summary>Gets or sets the UserId field. </summary>
		public Nullable<System.Int32> UserId { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Address.User - User.Addresses (m:1)'</summary>
		public User User { get; set;}
	}
}
