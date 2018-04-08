using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
	public partial class ItemTransaction
	{
        [Key]
        public int TransactionId { get; set; }
        public DateTime? IssueDate { get; set;}
		public DateTime? ReturnDate { get; set;}
        public int? AdminId { get; set; }
        public int? ItemId { get; set; }
        public int? MemberId { get; set; }
        public int? InventoryId { get; set; }

        public Admin Admin { get; set;}
		public InventoryMetadata InventoryMetadatas { get; set;}
		public Member Members { get; set;}
        public Inventory Inventories { get; set; }
	}
}
