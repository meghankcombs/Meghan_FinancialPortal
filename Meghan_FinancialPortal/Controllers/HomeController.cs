using Meghan_FinancialPortal.Models;
using Meghan_FinancialPortal.Models.Helpers;
using Meghan_FinancialPortal.Models.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Meghan_FinancialPortal.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext adb = new ApplicationDbContext();
        private FinancialPortal fdb = new FinancialPortal();

        [AuthorizeHouseholdRequired] //goes to Attributes file and runs two methods to get householdId and 
        public ActionResult Index()
        {
            var id = User.Identity.GetHouseholdId(); //get the household id of user logged in
            Household household = fdb.Households.Find(id); //show their household data (control this in view)
            if(household == null)
            {
                return HttpNotFound();
            }
            return View(household);
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Contact(EmailModel model)
        {
            var emailBody = new StringBuilder();
            emailBody.AppendLine(model.Body);

            if (ModelState.IsValid)
            {
                try
                {
                    var body = "<p>Email from: <bold>{0}</bold>({1})</p><p>Message:</p><p>{2}</p>";
                    var from = "Financial Portal<meghankcombs@gmail.com>";
                    model.Body = emailBody.ToString();

                    var email = new MailMessage(from, ConfigurationManager.AppSettings["emailto"])
                    {
                        Subject = "Financial Portal Email",
                        Body = string.Format(body, model.FromName, model.FromEmail, model.Body),
                        IsBodyHtml = true
                    };
                    var svc = new PersonalEmail();
                    await svc.SendAsync(email);
                    TempData["Message"] = "Your message has been sent!";
                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    await Task.FromResult(0);
                }
            }
            return View(model);
        }

        [Authorize]
        public ActionResult CreateJoinHousehold(Guid? code) //creating household that a person joined
        {
            //If the current user accessing this page already has a HouseholdId, send them to their dashboard
            if (User.Identity.IsInHousehold())
            {
                return RedirectToAction("Index", "Home");
            }

            HouseholdViewModel household = new HouseholdViewModel(); //getting info for user without household to create a household

            //Determine whether the user has been sent an invite and set property values 
            if (code != null) //code sent via email (or some other means)
            {
                string msg = "";
                if (ValidInvite(code, ref msg)) //validate invitation code (ref = access variable by reference (default is usually value))
                {
                    Invite result = fdb.Invites.FirstOrDefault(i => i.HHToken == code);

                    household.IsJoinHouse = true;
                    household.HouseholdId = result.HouseholdId;
                    household.HouseholdName = result.Household.Name;

                    //Set USED flag to true for this invite

                    result.HasBeenUsed = true;

                    ApplicationUser user = adb.Users.Find(User.Identity.GetUserId());
                    user.InviteEmail = result.Email;
                    adb.SaveChanges();
                }
                else
                {
                    //if there's an error, throw a sweet alert to tell the user and redirect them to the home index
                    switch(msg)
                    {
                        case "invalid":
                            TempData["InvalidInvite"] = "Invalid household join attempt. You will be redirected.";
                            break;
                        case "expired":
                            TempData["ExpiredInvite"] = "This invite has expired. Try creating your own.";
                            break;
                        default:
                            break;
                    }
                    return RedirectToAction("Index", "Home");
                }
            }
            return View(household);
        }
        
        private bool ValidInvite(Guid? code, ref string message) //message references same memory location as msg in CreateJoinHousehold method above
        {
            if ((DateTime.Now - fdb.Invites.FirstOrDefault(i => i.HHToken == code).InviteDate).TotalDays < 6) //if invite newer than 6 days
            {
                bool result = fdb.Invites.FirstOrDefault(i => i.HHToken == code).HasBeenUsed;
                if (result)
                {
                    message = "invalid"; //this is what msg is being set to above and code acts on these outcomes
                }
                else
                {
                    message = "valid";
                }
                return !result;
            }
            else
            {
                message = "expired";
                return false;
            }
        }
        
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> JoinHousehold(HouseholdViewModel vm) //action user clicks when they have been sent an invite link
        {
            Household household = fdb.Households.Find(vm.HouseholdId);
            var user = adb.Users.Find(User.Identity.GetUserId());

            household.Users.Add(user);
            fdb.SaveChanges();

            await ControllerContext.HttpContext.RefreshAuthentication(user);
            return RedirectToAction("Index", "Home");
        }
    }

}