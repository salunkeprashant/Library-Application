using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using LibraryApplication.Data;

namespace LibraryApplication.Migrations
{
    [DbContext(typeof(LibraryDataContext))]
    partial class LibraryDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752");

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("LibraryApplication.Model.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AddressLine");

                    b.Property<string>("CityName");

                    b.Property<int>("MemberId");

                    b.Property<string>("StateName");

                    b.HasKey("Id");

                    b.HasIndex("MemberId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("LibraryApplication.Model.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName");

                    b.Property<string>("IdentityId");

                    b.Property<string>("LastName");

                    b.HasKey("AdminId");

                    b.HasIndex("IdentityId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("LibraryApplication.Model.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("LibraryApplication.Model.Authors", b =>
                {
                    b.Property<int>("AuthorId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Author");

                    b.Property<string>("BookPublished");

                    b.HasKey("AuthorId");

                    b.ToTable("Authors");
                });

            modelBuilder.Entity("LibraryApplication.Model.Book", b =>
                {
                    b.Property<int>("ISBN")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<string>("Pages");

                    b.Property<int>("Quantity");

                    b.Property<decimal?>("Ratings");

                    b.Property<string>("Title");

                    b.Property<string>("YearOfPublish");

                    b.HasKey("ISBN");

                    b.HasIndex("CategoryId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("LibraryApplication.Model.BookAuthor", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AuthorId");

                    b.Property<int>("ISBN");

                    b.HasKey("id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("ISBN");

                    b.ToTable("BookAuthors");
                });

            modelBuilder.Entity("LibraryApplication.Model.BookCategory", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CategoryName");

                    b.HasKey("CategoryId");

                    b.ToTable("BookCategories");
                });

            modelBuilder.Entity("LibraryApplication.Model.BookMetadata", b =>
                {
                    b.Property<Guid>("BookId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ISBN");

                    b.Property<bool>("Status");

                    b.Property<DateTime?>("Timestamp");

                    b.HasKey("BookId");

                    b.HasIndex("ISBN");

                    b.ToTable("BookMetadatas");
                });

            modelBuilder.Entity("LibraryApplication.Model.BookTransaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AdminId");

                    b.Property<Guid>("BookId");

                    b.Property<int?>("ISBN");

                    b.Property<DateTime?>("IssueDate");

                    b.Property<int>("MemberId");

                    b.Property<DateTime?>("ReturnDate");

                    b.HasKey("TransactionId");

                    b.HasIndex("AdminId");

                    b.HasIndex("BookId");

                    b.HasIndex("ISBN");

                    b.HasIndex("MemberId");

                    b.ToTable("BookTransactions");
                });

            modelBuilder.Entity("LibraryApplication.Model.ContactDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EmailAddress");

                    b.Property<int>("MemberId");

                    b.Property<long>("MobileNo");

                    b.HasKey("Id");

                    b.HasIndex("MemberId");

                    b.ToTable("ContactDetails");
                });

            modelBuilder.Entity("LibraryApplication.Model.Inventory", b =>
                {
                    b.Property<int>("InventoryId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId");

                    b.Property<string>("ItemDescription");

                    b.Property<string>("Quantity");

                    b.HasKey("InventoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Inventories");
                });

            modelBuilder.Entity("LibraryApplication.Model.InventoryMetadata", b =>
                {
                    b.Property<int>("ItemId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("InventoryId");

                    b.Property<DateTime?>("IsuueTimestamp");

                    b.Property<string>("ItemName");

                    b.Property<DateTime?>("ReturnTimestamp");

                    b.Property<string>("Status");

                    b.HasKey("ItemId");

                    b.HasIndex("InventoryId");

                    b.ToTable("InventoryMetadatas");
                });

            modelBuilder.Entity("LibraryApplication.Model.ItemCategory", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CategoryName");

                    b.HasKey("CategoryId");

                    b.ToTable("ItemCategories");
                });

            modelBuilder.Entity("LibraryApplication.Model.ItemTransaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AdminId");

                    b.Property<int?>("InventoryId");

                    b.Property<DateTime?>("IssueDate");

                    b.Property<int?>("ItemId");

                    b.Property<int?>("MemberId");

                    b.Property<DateTime?>("ReturnDate");

                    b.HasKey("TransactionId");

                    b.HasIndex("AdminId");

                    b.HasIndex("InventoryId");

                    b.HasIndex("ItemId");

                    b.HasIndex("MemberId");

                    b.ToTable("ItemTransactions");
                });

            modelBuilder.Entity("LibraryApplication.Model.Member", b =>
                {
                    b.Property<int>("MemberId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName");

                    b.Property<DateTime?>("JoiningDate");

                    b.Property<string>("LastName");

                    b.HasKey("MemberId");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("LibraryApplication.Model.AppUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("LibraryApplication.Model.AppUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LibraryApplication.Model.AppUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApplication.Model.Address", b =>
                {
                    b.HasOne("LibraryApplication.Model.Member", "Members")
                        .WithMany("Addresses")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApplication.Model.Admin", b =>
                {
                    b.HasOne("LibraryApplication.Model.AppUser", "Identity")
                        .WithMany()
                        .HasForeignKey("IdentityId");
                });

            modelBuilder.Entity("LibraryApplication.Model.Book", b =>
                {
                    b.HasOne("LibraryApplication.Model.BookCategory", "BookCategory")
                        .WithMany("Books")
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("LibraryApplication.Model.BookAuthor", b =>
                {
                    b.HasOne("LibraryApplication.Model.Authors", "Authors")
                        .WithMany("BookAuthors")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LibraryApplication.Model.Book", "Books")
                        .WithMany("BookAuthors")
                        .HasForeignKey("ISBN")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApplication.Model.BookMetadata", b =>
                {
                    b.HasOne("LibraryApplication.Model.Book", "books")
                        .WithMany("BookMetadatas")
                        .HasForeignKey("ISBN")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApplication.Model.BookTransaction", b =>
                {
                    b.HasOne("LibraryApplication.Model.Admin", "Admin")
                        .WithMany("BookTransactions")
                        .HasForeignKey("AdminId");

                    b.HasOne("LibraryApplication.Model.BookMetadata", "BookMetadatas")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LibraryApplication.Model.Book", "Books")
                        .WithMany("BookTransactions")
                        .HasForeignKey("ISBN");

                    b.HasOne("LibraryApplication.Model.Member", "Member")
                        .WithMany("BookTransactions")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApplication.Model.ContactDetail", b =>
                {
                    b.HasOne("LibraryApplication.Model.Member", "Members")
                        .WithMany("ContactDetails")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApplication.Model.Inventory", b =>
                {
                    b.HasOne("LibraryApplication.Model.ItemCategory", "ItemCategory")
                        .WithMany("Inventories")
                        .HasForeignKey("CategoryId");
                });

            modelBuilder.Entity("LibraryApplication.Model.InventoryMetadata", b =>
                {
                    b.HasOne("LibraryApplication.Model.Inventory", "Inventories")
                        .WithMany("InventoryMetadatas")
                        .HasForeignKey("InventoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApplication.Model.ItemTransaction", b =>
                {
                    b.HasOne("LibraryApplication.Model.Admin", "Admin")
                        .WithMany("ItemTransactions")
                        .HasForeignKey("AdminId");

                    b.HasOne("LibraryApplication.Model.Inventory", "Inventories")
                        .WithMany("ItemTransactions")
                        .HasForeignKey("InventoryId");

                    b.HasOne("LibraryApplication.Model.InventoryMetadata", "InventoryMetadatas")
                        .WithMany()
                        .HasForeignKey("ItemId");

                    b.HasOne("LibraryApplication.Model.Member", "Members")
                        .WithMany("ItemTransactions")
                        .HasForeignKey("MemberId");
                });
        }
    }
}
