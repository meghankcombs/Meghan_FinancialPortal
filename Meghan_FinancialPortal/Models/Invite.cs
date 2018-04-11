namespace Meghan_FinancialPortal.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Invite
    {
        public int Id { get; set; }

        public int HouseholdId { get; set; }

        public string Email { get; set; }

        public Guid HHToken { get; set; }

        public DateTimeOffset InviteDate { get; set; }

        [StringLength(128)]
        public string InvitedById { get; set; }

        public bool HasBeenUsed { get; set; }

        public virtual ApplicationUser User { get; set; }

        public virtual Household Household { get; set; }
    }
}
