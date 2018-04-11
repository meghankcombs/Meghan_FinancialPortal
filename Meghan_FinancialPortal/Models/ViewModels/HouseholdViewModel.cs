using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Meghan_FinancialPortal.Models.ViewModels
{
    public class HouseholdViewModel
    {
        public List<PersonalAccount> Accounts { get; set; }
        public List<ApplicationUser> Users { get; set; }
        public List<Transaction> Transactions { get; set; }
        public List<Invite> Invitations { get; set; }

        public HouseholdViewModel()
        {
            this.Accounts = new List<PersonalAccount>();
            this.Users = new List<ApplicationUser>();
            this.Transactions = new List<Transaction>();
            this.Invitations = new List<Invite>();
        }
    }
}