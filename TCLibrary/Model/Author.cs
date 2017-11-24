using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'Author'.</summary>
	public partial class Author : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="Author"/> class.</summary>
		public Author() : base()
		{
			this.Books = new List<Book>();
			OnCreated();
		}

		/// <summary>Gets or sets the AuthorId field. </summary>
		public System.Int32 AuthorId { get; set;}
		/// <summary>Gets or sets the AuthorName field. </summary>
		public System.String AuthorName { get; set;}
		/// <summary>Gets or sets the BookPublished field. </summary>
		public System.String BookPublished { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Book.Author - Author.Books (m:1)'</summary>
		public List<Book> Books { get; set;}
	}
}
