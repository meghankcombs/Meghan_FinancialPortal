namespace Meghan_FinancialPortal.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class BudgetItem
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }

        public int BudgetId { get; set; }

        public decimal Amount { get; set; }

        public virtual Budget Budget { get; set; }

        public virtual Category Category { get; set; }
    }
}
