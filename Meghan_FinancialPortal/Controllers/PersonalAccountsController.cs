using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Meghan_FinancialPortal.Models;

namespace Meghan_FinancialPortal.Controllers
{
    public class PersonalAccountsController : Controller
    {
        private FinancialPortal fdb = new FinancialPortal();
        private ApplicationDbContext adb = new ApplicationDbContext();

        // GET: PersonalAccounts
        public ActionResult Index()
        {
            var personalAccounts = fdb.PersonalAccounts.Include(p => p.User).Include(p => p.Household);
            return View(personalAccounts.ToList());
        }

        // GET: PersonalAccounts/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PersonalAccount personalAccount = fdb.PersonalAccounts.Find(id);
            if (personalAccount == null)
            {
                return HttpNotFound();
            }
            return View(personalAccount);
        }

        // GET: PersonalAccounts/Create
        public ActionResult Create()
        {
            ViewBag.CreatedById = new SelectList(adb.Users, "Id", "FirstName");
            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name");
            return View();
        }

        // POST: PersonalAccounts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,HouseholdId,Name,Balance,ReconciledBalance,CreatedById,IsDeleted")] PersonalAccount personalAccount)
        {
            if (ModelState.IsValid)
            {
                fdb.PersonalAccounts.Add(personalAccount);
                fdb.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CreatedById = new SelectList(adb.Users, "Id", "FirstName", personalAccount.CreatedById);
            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name", personalAccount.HouseholdId);
            return View(personalAccount);
        }

        // GET: PersonalAccounts/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PersonalAccount personalAccount = fdb.PersonalAccounts.Find(id);
            if (personalAccount == null)
            {
                return HttpNotFound();
            }
            ViewBag.CreatedById = new SelectList(adb.Users, "Id", "FirstName", personalAccount.CreatedById);
            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name", personalAccount.HouseholdId);
            return View(personalAccount);
        }

        // POST: PersonalAccounts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,HouseholdId,Name,Balance,ReconciledBalance,CreatedById,IsDeleted")] PersonalAccount personalAccount)
        {
            if (ModelState.IsValid)
            {
                fdb.Entry(personalAccount).State = EntityState.Modified;
                fdb.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CreatedById = new SelectList(adb.Users, "Id", "FirstName", personalAccount.CreatedById);
            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name", personalAccount.HouseholdId);
            return View(personalAccount);
        }

        // GET: PersonalAccounts/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PersonalAccount personalAccount = fdb.PersonalAccounts.Find(id);
            if (personalAccount == null)
            {
                return HttpNotFound();
            }
            return View(personalAccount);
        }

        // POST: PersonalAccounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PersonalAccount personalAccount = fdb.PersonalAccounts.Find(id);
            fdb.PersonalAccounts.Remove(personalAccount);
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
