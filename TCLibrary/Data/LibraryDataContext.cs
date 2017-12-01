﻿using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TCLibrary.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TCLibrary.Data
{
    public partial class LibraryDataContext : IdentityDbContext<AppUser>
    {

        public LibraryDataContext(DbContextOptions<LibraryDataContext> options)
            : base(options)
        {
        }

        //      public override int SaveChanges()
        //{
        //	var namesOfChangedReadOnlyEntities = this.ChangeTracker.Entries().Where(e => e.Metadata.IsReadOnly() && e.State != EntityState.Unchanged).Select(e => e.Metadata.Name).Distinct().ToList();
        //	if(namesOfChangedReadOnlyEntities.Any())
        //	{
        //		throw new InvalidOperationException($"Attempted to save the following read-only entitie(s): {string.Join(",", namesOfChangedReadOnlyEntities)}");
        //	}
        //	return base.SaveChanges();
        //}



        public DbSet<Address> Addresses { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Authors> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookAuthor> BookAuthors { get; set; }
        public DbSet<BookCategory> BookCategories { get; set; }
        public DbSet<BookMetadata> BookMetadatas { get; set; }
        public DbSet<BookTransaction> BookTransactions { get; set; }
        public DbSet<ContactDetail> ContactDetails { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<InventoryMetadata> InventoryMetadatas { get; set; }
        public DbSet<ItemTransaction> ItemTransactions { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<MemberDetail> MembersDetails { get; set; }
    }
}
