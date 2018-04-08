using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    public partial class Inventory 
    {
        [Key]
        public int InventoryId { get; set; }
        public string ItemDescription { get; set; }
        public string Quantity { get; set; }
        public int? CategoryId { get; set; }
        public ItemCategory ItemCategory { get; set; }
        public List<ItemTransaction> ItemTransactions { get; set; }
        public List<InventoryMetadata> InventoryMetadatas { get; set; }
    }
}
