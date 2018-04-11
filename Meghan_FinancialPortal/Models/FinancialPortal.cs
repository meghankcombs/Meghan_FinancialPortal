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
        
        public virtual DbSet<BudgetItem> BudgetItems { get; set; }
        public virtual DbSet<Budget> Budgets { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Household> Households { get; set; }
        public virtual DbSet<Invite> Invites { get; set; }
        public virtual DbSet<PersonalAccount> PersonalAccounts { get; set; }
        public virtual DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
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
