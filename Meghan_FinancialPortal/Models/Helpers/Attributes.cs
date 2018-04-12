using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Meghan_FinancialPortal.Models.Helpers
{
    public class AuthorizeHouseholdRequired : AuthorizeAttribute
    {
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