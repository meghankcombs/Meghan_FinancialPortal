﻿using Meghan_FinancialPortal.Models;
using Meghan_FinancialPortal.Models.Helpers;
using Meghan_FinancialPortal.Models.ViewModels;
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

        public ActionResult Index()
        {
            var IndexData = new HomeViewModel();

            //Shows all data in datatables; can go to Household details page for specific data
            IndexData.Households = fdb.Households.ToList();
            IndexData.AllUsers = adb.Users.ToList();
            IndexData.Accounts = fdb.PersonalAccounts.ToList();
            IndexData.Budgets = fdb.Budgets.ToList();
            IndexData.Transactions = fdb.Transactions.OrderByDescending(t => t.Date).Take(50).ToList();

            return View(IndexData);
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
        public ActionResult CreateJoinHousehold(Guid? code)
        {
            if (User.Identity.IsInHousehold())
            {
                return RedirectToAction("Index", "Home");
            }

            HouseholdViewModel household = new HouseholdViewModel();

            //need to set the view model here...

            return View(household);
        }
    }
}