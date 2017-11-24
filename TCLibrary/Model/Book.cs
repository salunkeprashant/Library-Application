using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'Book'.</summary>
	public partial class Book : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="Book"/> class.</summary>
		public Book() : base()
		{
			this.BookTransactions = new List<BookTransaction>();
			OnCreated();
		}

		/// <summary>Gets or sets the AuthorId field. </summary>
		public Nullable<System.Int32> AuthorId { get; set;}
		/// <summary>Gets or sets the BookId field. </summary>
		public System.Int32 BookId { get; set;}
		/// <summary>Gets or sets the BookName field. </summary>
		public System.String BookName { get; set;}
		/// <summary>Gets or sets the CategoryId field. </summary>
		public Nullable<System.Int32> CategoryId { get; set;}
		/// <summary>Gets or sets the Pages field. </summary>
		public System.String Pages { get; set;}
		/// <summary>Gets or sets the Quantity field. </summary>
		public System.String Quantity { get; set;}
		/// <summary>Gets or sets the Ratings field. </summary>
		public Nullable<System.Decimal> Ratings { get; set;}
		/// <summary>Gets or sets the YearOfPublish field. </summary>
		public System.String YearOfPublish { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Book.Author - Author.Books (m:1)'</summary>
		public Author Author { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Book.BookCategory - BookCategory.Books (m:1)'</summary>
		public BookCategory BookCategory { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'BookTransaction.Book - Book.BookTransactions (m:1)'</summary>
		public List<BookTransaction> BookTransactions { get; set;}
	}
}
