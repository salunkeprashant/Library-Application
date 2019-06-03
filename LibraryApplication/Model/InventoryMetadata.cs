using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryApplication.Model
{
    public partial class InventoryMetadata
    {
        [Key]
        public int ItemId { get; set; }
        public int InventoryId { get; set; }
        public string ItemName { get; set; }
        public string Status { get; set; }
        public DateTime? IsuueTimestamp { get; set; }
        public DateTime? ReturnTimestamp { get; set; }
        public Inventory Inventories { get; set; }
    }
}
