using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Meghan_FinancialPortal.Models.ViewModels
{
    public class HomeViewModel
    {
        public List<Household> Households { get; set; }
        public List<PersonalAccount> Accounts { get; set; }
        public List<ApplicationUser> AllUsers { get; set; }
        public List<Budget> Budgets { get; set; }
        public List<Transaction> Transactions { get; set; }

        ////Constructor
        public HomeViewModel()
        {
            Households = new List<Household>();
            Accounts = new List<PersonalAccount>();
            AllUsers = new List<ApplicationUser>();
            Budgets = new List<Budget>();
            Transactions = new List<Transaction>();
        }
    }
}