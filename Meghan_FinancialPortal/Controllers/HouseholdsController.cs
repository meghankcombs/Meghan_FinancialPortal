using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Meghan_FinancialPortal.Models;
using Meghan_FinancialPortal.Models.Helpers;
using Meghan_FinancialPortal.Models.ViewModels;
using Microsoft.AspNet.Identity;

namespace Meghan_FinancialPortal.Controllers
{
    public class HouseholdsController : Controller
    {
        private FinancialPortal fdb = new FinancialPortal();
        private ApplicationDbContext adb = new ApplicationDbContext();
        private HouseholdHelper househldHelper = new HouseholdHelper();

        // GET: Households
        public ActionResult Index()
        {
            return View(fdb.Households.ToList());
        }

        // GET: Households/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Household household = fdb.Households.Find(id);
            if (household == null)
            {
                return HttpNotFound();
            }
            return View(household);
        }

        // GET: Households/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Households/Create
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create(HouseholdViewModel vm)
        {
            //Create new household
            Household household = new Household();

            //check if name is unique
            if(househldHelper.IsUnique(household.Name) == true)
            {
                household.Name = vm.HouseholdName;
            }
            else
            {
                TempData["NameNotUnique"] = "The Household name you entered is not unique. Please enter a different name.";
                return RedirectToAction("Create"); //bring create household view back up...
            }
            
            // add household to database
            fdb.Households.Add(household);
            fdb.SaveChanges();

            //Add the current user as the first member of the new household
            var user = adb.Users.Find(User.Identity.GetUserId());
            household.Users.Add(user);
            fdb.SaveChanges();
            await ControllerContext.HttpContext.RefreshAuthentication(user); //refresh thier cookies and direct them to their dashboard

            return RedirectToAction("Index", "Home");
        }

        // GET: Households/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Household household = fdb.Households.Find(id);
            if (household == null)
            {
                return HttpNotFound();
            }
            return View(household);
        }

        // POST: Households/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name")] Household household)
        {
            if (ModelState.IsValid)
            {
                fdb.Entry(household).State = EntityState.Modified;
                fdb.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(household);
        }

        //GET : Invite
        public ActionResult Invite()
        {
            return View();
        }

        //POST: INVITE
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Invite(string email)
        {
            var code = Guid.NewGuid();
            var callbackUrl = Url.Action("CreateJoinHousehold", "Home", new { code }, protocol: Request.Url.Scheme);

            //send email
            var from = "Financial Portal<meghankcombs@gmail.com>";
            var to = email;
            var sendEmail = new MailMessage(from, to)
            {
                Subject = "Financial Portal: Household Invite",
                Body = "You have been invited to a household! Click here to join: " + callbackUrl,
                IsBodyHtml = true
            };
            var svc = new PersonalEmail();
            await svc.SendAsync(sendEmail);

            //create invite record
            Invite model = new Invite();
            model.Email = email;
            model.HHToken = code;
            model.HouseholdId = User.Identity.GetHouseholdId().Value;
            model.InviteDate = DateTimeOffset.Now;
            model.InvitedById = User.Identity.GetUserId();

            fdb.Invites.Add(model);
            fdb.SaveChanges();

            return RedirectToAction("Index", "Home");
        }

        //POST: Leave Household
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> LeaveHousehold(int householdId)
        {
            //already in household details view, so can get household id through route values and pass in here
            Household household = fdb.Households.Find(householdId); //find household by id passed in
            ApplicationUser user = adb.Users.Find(User.Identity.GetUserId()); //get user's id
            household.Users.Remove(user);
            fdb.SaveChanges();

            await ControllerContext.HttpContext.RefreshAuthentication(user); //method in extensions class
            return RedirectToAction("Index", "Home");
        }
        
        // POST: Households/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Household household = fdb.Households.Find(id);
            fdb.Households.Remove(household);
            fdb.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                fdb.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
