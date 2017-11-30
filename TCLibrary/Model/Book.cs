using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	public partial class Book : CommonEntityBase
	{
		#region Class Extensibility Methods
		partial void OnCreated();
		#endregion

		public Book() : base()
		{
			this.BookTransactions = new List<BookTransaction>();
			OnCreated();
		}

		public Nullable<System.Int32> AuthorId { get; set;}
		public System.Int32 ISBN { get; set;}
		public string BookName { get; set;}
		public Nullable<System.Int32> CategoryId { get; set;}
		/// <summary>Gets or sets the Pages field. </summary>
		public System.String Pages { get; set;}
		/// <summary>Gets or sets the Quantity field. </summary>
		public System.String Quantity { get; set;}
		/// <summary>Gets or sets the Ratings field. </summary>
		public Nullable<System.Decimal> Ratings { get; set;}
		/// <summary>Gets or sets the YearOfPublish field. </summary>
		public string YearOfPublish { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Book.Author - Author.Books (m:1)'</summary>
		public Author Author { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Book.BookCategory - BookCategory.Books (m:1)'</summary>
		public BookCategory BookCategory { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.Book - Book.BookTransactions (m:1)'</summary>
		public List<BookTransaction> BookTransactions { get; set;}
	}
}
