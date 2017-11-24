using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TCLibrary.Model;

namespace TCLibrary
{
	public partial class LibraryDataContext : DbContext
	{

        public LibraryDataContext(DbContextOptions<LibraryDataContext> options)
            : base(options)
        {
        }

        public override int SaveChanges()
		{
			var namesOfChangedReadOnlyEntities = this.ChangeTracker.Entries().Where(e => e.Metadata.IsReadOnly() && e.State != EntityState.Unchanged).Select(e => e.Metadata.Name).Distinct().ToList();
			if(namesOfChangedReadOnlyEntities.Any())
			{
				throw new InvalidOperationException($"Attempted to save the following read-only entitie(s): {string.Join(",", namesOfChangedReadOnlyEntities)}");
			}
			return base.SaveChanges();
		}
	
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			new LibraryModelBuilder().BuildModel(modelBuilder);
		}
       

        public DbSet<Address> Addresses { get; set; } 
		public DbSet<Admin> Admins { get; set; } 
		public DbSet<Author> Authors { get; set; } 
		public DbSet<Book> Books { get; set; } 
		public DbSet<BookCategory> BookCategories { get; set; } 
		public DbSet<BookTransaction> BookTransactions { get; set; } 
		public DbSet<ContactDetail> ContactDetails { get; set; } 
		public DbSet<Inventory> Inventories { get; set; } 
		public DbSet<ItemCategory> ItemCategories { get; set; } 
		public DbSet<ItemTransaction> ItemTransactions { get; set; } 
		public DbSet<User> Users { get; set; } 
		public DbSet<UserDetail> UserDetails { get; set; } 
	}
}
