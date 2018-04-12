using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Meghan_FinancialPortal.Models.Helpers
{
    public class HouseholdHelper
    {
        private static Household household = new Household();
        private static ApplicationDbContext adb = new ApplicationDbContext();
        private static FinancialPortal fdb = new FinancialPortal();
        private static UserHelper userHelper = new UserHelper();

        public bool IsUnique(string houseName) //check to see if household name is unique when creating it
        {
            foreach (Household house in fdb.Households.ToList())
            {
                if (house.Name == houseName)
                {
                    return false;
                }
            }
            return true;
        }

        public void AddUserToHousehold(string userId, int householdId) //add new user to household, if he/she not in household already
        {
            if (!userHelper.InHousehold(userId, householdId))
            {
                Household household = fdb.Households.Find(householdId);
                var newUser = adb.Users.Find(userId);

                household.Users.Add(newUser);
                fdb.Entry(household).State = EntityState.Modified; //modifies existing Household record
                fdb.SaveChanges();
            }
        }

        public void RemoveUserFromHousehold(string userId, int householdId) //remove user from Household
        {
            if (userHelper.InHousehold(userId, householdId))
            {
                Household household = fdb.Households.Find(householdId);
                var delUser = adb.Users.Find(userId);

                household.Users.Remove(delUser);
                fdb.Entry(household).State = EntityState.Modified; //modifies existing Household record
                fdb.SaveChanges();
            }
        }

    }
}