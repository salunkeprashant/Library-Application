using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'BookCategory'.</summary>
	public partial class BookCategory : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="BookCategory"/> class.</summary>
		public BookCategory() : base()
		{
			this.Books = new List<Book>();
			OnCreated();
		}

		/// <summary>Gets or sets the CategoryId field. </summary>
		public System.Int32 CategoryId { get; set;}
		/// <summary>Gets or sets the CategoryName field. </summary>
		public System.String CategoryName { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Book.BookCategory - BookCategory.Books (m:1)'</summary>
		public List<Book> Books { get; set;}
	}
}
