﻿using System;
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
    public class HouseholdHelper : AuthorizeAttribute
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
                Household household = fdb.Households.Find(householdId); //assigns entire record to Household, NOT just householdId
                var newUser = adb.Users.Find(userId);

                household.Users.Add(newUser);
                fdb.Entry(household).State = EntityState.Modified; //modifies existing Household record
                fdb.SaveChanges();
            }
        }

        public void RemoveUserFromHousehold(string userId, int householdId) //remove user (including self) from Household
        {
            if (userHelper.InHousehold(userId, householdId))
            {
                Household household = fdb.Households.Find(householdId);
                var delUser = adb.Users.Find(userId);

                household.Users.Remove(delUser);
                fdb.Entry(household).State = EntityState.Modified; //modifies existing Project record
                fdb.SaveChanges();
            }
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext) //only people in households are allow to do things
        {
            var isAuthorized = base.AuthorizeCore(httpContext);
            if (!isAuthorized)
            {
                return false;
            }
            return httpContext.User.Identity.IsInHousehold(); //check if user is in a household
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                base.HandleUnauthorizedRequest(filterContext);
            }
            else
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                {
                    controller = "Home",
                    action = "CreateJoinHousehold"
                }));
            }
        }
    }
}