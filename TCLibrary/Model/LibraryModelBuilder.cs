using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TCLibrary.Model;

namespace TCLibrary
{
    public partial class LibraryModelBuilder
	{
		public virtual void BuildModel(ModelBuilder modelBuilder)
		{
			MapAddress(modelBuilder.Entity<Address>());
			MapAdmin(modelBuilder.Entity<Admin>());
			MapAuthor(modelBuilder.Entity<Author>());
			MapBook(modelBuilder.Entity<Book>());
			MapBookCategory(modelBuilder.Entity<BookCategory>());
			MapBookTransaction(modelBuilder.Entity<BookTransaction>());
			MapContactDetail(modelBuilder.Entity<ContactDetail>());
			MapInventory(modelBuilder.Entity<Inventory>());
			MapItemCategory(modelBuilder.Entity<ItemCategory>());
			MapItemTransaction(modelBuilder.Entity<ItemTransaction>());
			MapUser(modelBuilder.Entity<User>());
			MapUserDetail(modelBuilder.Entity<UserDetail>());
		}

		protected virtual void MapAddress(EntityTypeBuilder<Address> config)
		{
			config.ToTable("Address");
			config.HasKey(t => t.AddressId);
			config.Property(t => t.AddressId).HasColumnName("AddressID").ValueGeneratedOnAdd();
			config.Property(t => t.UserId).HasColumnName("UserId");
			config.Property(t => t.AddressLine).HasMaxLength(200);
			config.Property(t => t.CityName).HasMaxLength(20);
			config.Property(t => t.StateName).HasMaxLength(20);
			config.HasOne(t => t.User).WithMany(t => t.Addresses).HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
		}

		protected virtual void MapAdmin(EntityTypeBuilder<Admin> config)
		{
			config.ToTable("Admins");
			config.HasKey(t => t.AdminId);
			config.Property(t => t.AdminId).HasColumnName("AdminID").ValueGeneratedOnAdd();
			config.Property(t => t.AdminName).HasMaxLength(15);
			config.Property(t => t.Username).HasMaxLength(30);
			config.Property(t => t.Password).HasMaxLength(12);
		}

		protected virtual void MapAuthor(EntityTypeBuilder<Author> config)
		{
			config.ToTable("Authors");
			config.HasKey(t => t.AuthorId);
			config.Property(t => t.AuthorId).HasColumnName("AuthorID").ValueGeneratedOnAdd();
			config.Property(t => t.AuthorName).HasMaxLength(30);
			config.Property(t => t.BookPublished).HasMaxLength(3);
		}

		protected virtual void MapBook(EntityTypeBuilder<Book> config)
		{
			config.ToTable("Books");
			config.HasKey(t => t.BookId);
			config.Property(t => t.BookId).HasColumnName("BookID").ValueGeneratedOnAdd();
			config.Property(t => t.BookName).HasMaxLength(300);
			config.Property(t => t.CategoryId).HasColumnName("CategoryID");
			config.Property(t => t.AuthorId).HasColumnName("AuthorID");
			config.Property(t => t.Pages).HasMaxLength(5);
			config.Property(t => t.YearOfPublish).HasMaxLength(4);
			config.Property(t => t.Ratings);
			config.Property(t => t.Quantity).HasMaxLength(3);
			config.HasOne(t => t.Author).WithMany(t => t.Books).HasForeignKey(t => t.AuthorId);
			config.HasOne(t => t.BookCategory).WithMany(t => t.Books).HasForeignKey(t => t.CategoryId);
		}

		protected virtual void MapBookCategory(EntityTypeBuilder<BookCategory> config)
		{
			config.ToTable("BookCategory");
			config.HasKey(t => t.CategoryId);
			config.Property(t => t.CategoryId).HasColumnName("CategoryID").ValueGeneratedOnAdd();
			config.Property(t => t.CategoryName).HasMaxLength(50);
		}

		protected virtual void MapBookTransaction(EntityTypeBuilder<BookTransaction> config)
		{
			config.ToTable("BookTransaction");
			config.HasKey(t => t.TransactionId);
			config.Property(t => t.TransactionId).HasColumnName("TransactionID").ValueGeneratedOnAdd();
			config.Property(t => t.AdminId).HasColumnName("AdminID");
			config.Property(t => t.UserId).HasColumnName("UserId");
			config.Property(t => t.BookId).HasColumnName("BookID");
			config.Property(t => t.IssueDate);
			config.Property(t => t.ReturnDate);
			config.HasOne(t => t.Admin).WithMany(t => t.BookTransactions).HasForeignKey(t => t.AdminId);
			config.HasOne(t => t.Book).WithMany(t => t.BookTransactions).HasForeignKey(t => t.BookId);
			config.HasOne(t => t.User).WithMany(t => t.BookTransactions).HasForeignKey(t => t.UserId);
		}

		protected virtual void MapContactDetail(EntityTypeBuilder<ContactDetail> config)
		{
			config.ToTable("ContactDetails");
			config.HasKey(t => t.Id);
			config.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
			config.Property(t => t.UserId).HasColumnName("UserId");
			config.Property(t => t.MobileNo);
			config.Property(t => t.EmailAddress).HasMaxLength(30);
			config.HasOne(t => t.User).WithMany(t => t.ContactDetails).HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
		}

		protected virtual void MapInventory(EntityTypeBuilder<Inventory> config)
		{
			config.ToTable("Inventory");
			config.HasKey(t => t.ItemId);
			config.Property(t => t.ItemId).HasColumnName("ItemID").ValueGeneratedOnAdd();
			config.Property(t => t.CategoryId).HasColumnName("CategoryID");
			config.Property(t => t.ItemName).HasMaxLength(30);
			config.Property(t => t.ItemDescription).HasMaxLength(300);
			config.Property(t => t.Quantity).HasMaxLength(3);
			config.HasOne(t => t.ItemCategory).WithMany(t => t.Inventories).HasForeignKey(t => t.CategoryId);
		}

		protected virtual void MapItemCategory(EntityTypeBuilder<ItemCategory> config)
		{
			config.ToTable("ItemCategory");
			config.HasKey(t => t.CategoryId);
			config.Property(t => t.CategoryId).HasColumnName("CategoryID").ValueGeneratedOnAdd();
			config.Property(t => t.CategoryName).HasMaxLength(50);
		}

		protected virtual void MapItemTransaction(EntityTypeBuilder<ItemTransaction> config)
		{
			config.ToTable("ItemTransaction");
			config.HasKey(t => t.TransactionId);
			config.Property(t => t.TransactionId).HasColumnName("TransactionID").ValueGeneratedOnAdd();
			config.Property(t => t.AdminId).HasColumnName("AdminID");
			config.Property(t => t.UserId).HasColumnName("UserId");
			config.Property(t => t.ItemId).HasColumnName("ItemID");
			config.Property(t => t.IssueDate);
			config.Property(t => t.ReturnDate);
			config.HasOne(t => t.Admin).WithMany(t => t.ItemTransactions).HasForeignKey(t => t.AdminId);
			config.HasOne(t => t.Inventory).WithMany(t => t.ItemTransactions).HasForeignKey(t => t.ItemId);
			config.HasOne(t => t.User).WithMany(t => t.ItemTransactions).HasForeignKey(t => t.UserId);
		}

		protected virtual void MapUser(EntityTypeBuilder<User> config)
		{
			config.ToTable("Users");
			config.HasKey(t => t.UserId);
			config.Property(t => t.UserId).HasColumnName("UserId").ValueGeneratedOnAdd();
			config.Property(t => t.JoiningDate);
		}

		protected virtual void MapUserDetail(EntityTypeBuilder<UserDetail> config)
		{
			config.ToTable("UserDetails");
			config.HasKey(t => t.Id);
			config.Property(t => t.Id).HasColumnName("ID").ValueGeneratedOnAdd();
			config.Property(t => t.UserId).HasColumnName("UserId");
			config.Property(t => t.FirstName).HasMaxLength(15);
			config.Property(t => t.LastName).HasMaxLength(15);
			config.HasOne(t => t.User).WithMany(t => t.UserDetails).HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
		}
	}


	internal static partial class LibraryCoreModelModelBuilderExtensions
	{
        private static readonly string READONLY_ANNOTATION = "custom:readonly";

		internal static EntityTypeBuilder<TEntity> IsReadOnly<TEntity>(this EntityTypeBuilder<TEntity> builder)
			where TEntity : class
		{
			builder.HasAnnotation(READONLY_ANNOTATION, true);
			return builder;
		}
		
		public static bool IsReadOnly(this IEntityType entity)
		{
			var annotation = entity.FindAnnotation(READONLY_ANNOTATION);
			return annotation != null && (bool)annotation.Value;
		}
	}
}

