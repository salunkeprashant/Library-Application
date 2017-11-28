using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'ItemTransaction'.</summary>
	public partial class ItemTransaction : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="ItemTransaction"/> class.</summary>
		public ItemTransaction() : base()
		{
			OnCreated();
		}

		/// <summary>Gets or sets the AdminId field. </summary>
		public Nullable<System.Int32> AdminId { get; set;}
		/// <summary>Gets or sets the IssueDate field. </summary>
		public Nullable<System.DateTime> IssueDate { get; set;}
		/// <summary>Gets or sets the ItemId field. </summary>
		public Nullable<System.Int32> ItemId { get; set;}
		/// <summary>Gets or sets the ReturnDate field. </summary>
		public Nullable<System.DateTime> ReturnDate { get; set;}
        /// <summary>Gets or sets the TransactionId field. </summary>

        [Key]
        public System.Int32 TransactionId { get; set;}
		/// <summary>Gets or sets the MemberId field. </summary>
		public Nullable<System.Int32> MemberId { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ItemTransaction.Admin - Admin.ItemTransactions (m:1)'</summary>
		public Admin Admin { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ItemTransaction.Inventory - Inventory.ItemTransactions (m:1)'</summary>
		public Inventory Inventory { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ItemTransaction.User - User.ItemTransactions (m:1)'</summary>
		public Member Members { get; set;}
	}
}
