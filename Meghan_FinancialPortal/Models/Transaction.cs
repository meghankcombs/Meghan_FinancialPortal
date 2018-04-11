namespace Meghan_FinancialPortal.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Transaction
    {
        public int Id { get; set; }

        public int AccountId { get; set; }

        public string Description { get; set; }

        public DateTimeOffset Date { get; set; }

        public decimal Amount { get; set; }

        public bool Type { get; set; }

        public int CategoryId { get; set; }

        [StringLength(128)]
        public string EnteredById { get; set; }

        public bool Reconciled { get; set; }

        public decimal ReconciledAmount { get; set; }

        public bool Void { get; set; }

        public bool IsDeleted { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }

        public virtual Category Category { get; set; }

        public virtual PersonalAccount PersonalAccount { get; set; }
    }
}
