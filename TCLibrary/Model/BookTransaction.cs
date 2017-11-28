using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'BookTransaction'.</summary>
	public partial class BookTransaction : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="BookTransaction"/> class.</summary>

		public BookTransaction() : base()
		{
			OnCreated();
		}

        /// <summary>Gets or sets the AdminId field. </summary>
        [Key]
        public Nullable<System.Int32> AdminId { get; set;}
		/// <summary>Gets or sets the BookId field. </summary>
		public Nullable<System.Int32> BookId { get; set;}
		/// <summary>Gets or sets the IssueDate field. </summary>
		public Nullable<System.DateTime> IssueDate { get; set;}
		/// <summary>Gets or sets the ReturnDate field. </summary>
		public Nullable<System.DateTime> ReturnDate { get; set;}
		/// <summary>Gets or sets the TransactionId field. </summary>
		public System.Int32 TransactionId { get; set;}
		/// <summary>Gets or sets the MemberId field. </summary>
		public Nullable<System.Int32> MemberId { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.Admin - Admin.BookTransactions (m:1)'</summary>
		public Admin Admin { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.Book - Book.BookTransactions (m:1)'</summary>
		public Book Book { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.User - User.BookTransactions (m:1)'</summary>
		public Member Members { get; set;}
	}
}
