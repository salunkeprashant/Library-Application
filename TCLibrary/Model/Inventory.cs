using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
	/// <summary>Class which represents the entity 'Inventory'.</summary>
	public partial class Inventory : CommonEntityBase
	{
		#region Class Extensibility Methods
		/// <summary>Method called from the constructor</summary>
		partial void OnCreated();
		#endregion

		/// <summary>Initializes a new instance of the <see cref="Inventory"/> class.</summary>
		public Inventory() : base()
		{
			this.ItemTransactions = new List<ItemTransaction>();
			OnCreated();
		}

		/// <summary>Gets or sets the CategoryId field. </summary>
		public Nullable<System.Int32> CategoryId { get; set;}
		/// <summary>Gets or sets the ItemDescription field. </summary>
		public System.String ItemDescription { get; set;}
		/// <summary>Gets or sets the ItemId field. </summary>
		public System.Int32 ItemId { get; set;}
		/// <summary>Gets or sets the ItemName field. </summary>
		public System.String ItemName { get; set;}
		/// <summary>Gets or sets the Quantity field. </summary>
		public System.String Quantity { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'Inventory.ItemCategory - ItemCategory.Inventories (m:1)'</summary>
		public ItemCategory ItemCategory { get; set;}
		/// <summary>Represents the navigator which is mapped onto the association 'ItemTransaction.Inventory - Inventory.ItemTransactions (m:1)'</summary>
		public List<ItemTransaction> ItemTransactions { get; set;}
	}
}
