using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Meghan_FinancialPortal.Models.Helpers
{
    public class UserHelper
    {
        private static ApplicationDbContext adb = new ApplicationDbContext();
        private static FinancialPortal fdb = new FinancialPortal();

        public static string UserFirstName() //logged in user's first name
        {
            if (HttpContext.Current.User != null)
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                var userFName = adb.Users.FirstOrDefault(n => n.Id == userId).FirstName;
                return (userFName);
            }
            return "";
        }

        public static string UserLastName() //logged in user's last name
        {
            if (HttpContext.Current.User != null)
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                var userLName = adb.Users.FirstOrDefault(n => n.Id == userId).LastName;
                return (userLName);
            }
            return "";
        }

        public bool InHousehold(string userId, int householdId) //Check if user is in household already
        {
            return fdb.Households.Find(householdId).Users.Any(u => u.Id == userId);
        }
    }
}