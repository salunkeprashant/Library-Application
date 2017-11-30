using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TCLibrary.Model
{
    /// <summary>Class which represents the entity 'Inventory'.</summary>
    public partial class Inventory : CommonEntityBase
    {
        #region Class Extensibility Methods
        /// <summary>Method called from the constructor</summary>
        partial void OnCreated();
        #endregion

        public Inventory() : base()
        {
            this.ItemTransactions = new List<ItemTransaction>();
            OnCreated();
        }

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
