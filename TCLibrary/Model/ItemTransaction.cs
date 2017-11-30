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

		public ItemTransaction() : base()
		{
			OnCreated();
		}

        [Key]
        public int TransactionId { get; set; }
        public DateTime? IssueDate { get; set;}
		public DateTime? ReturnDate { get; set;}
        public int? AdminId { get; set; }
        public int? ItemId { get; set; }
        public int? MemberId { get; set; }

        public Admin Admin { get; set;}
		public InventoryMetadata InventoryMetadatas { get; set;}
		public Member Members { get; set;}
	}
}
