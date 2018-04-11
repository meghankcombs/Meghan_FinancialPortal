namespace Meghan_FinancialPortal.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class FinancialPortal : DbContext
    {
        public FinancialPortal()
            : base("name=FinancialPortal")
        {
        }

        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<BudgetItem> BudgetItems { get; set; }
        public virtual DbSet<Budget> Budgets { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Household> Households { get; set; }
        public virtual DbSet<Invite> Invites { get; set; }
        public virtual DbSet<PersonalAccount> PersonalAccounts { get; set; }
        public virtual DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRole>()
                .HasMany(e => e.AspNetUsers)
                .WithMany(e => e.AspNetRoles)
                .Map(m => m.ToTable("AspNetUserRoles").MapLeftKey("RoleId").MapRightKey("UserId"));

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.AspNetUserClaims)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.AspNetUserLogins)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.Invites)
                .WithOptional(e => e.AspNetUser)
                .HasForeignKey(e => e.InvitedById);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.PersonalAccounts)
                .WithOptional(e => e.AspNetUser)
                .HasForeignKey(e => e.CreatedById);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.Transactions)
                .WithOptional(e => e.AspNetUser)
                .HasForeignKey(e => e.EnteredById);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Households)
                .WithMany(e => e.Categories)
                .Map(m => m.ToTable("CategoryHouseholds"));

            modelBuilder.Entity<PersonalAccount>()
                .HasMany(e => e.Transactions)
                .WithRequired(e => e.PersonalAccount)
                .HasForeignKey(e => e.AccountId);
        }
    }
}
