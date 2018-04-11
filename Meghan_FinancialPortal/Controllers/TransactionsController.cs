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
    public class TransactionsController : Controller
    {
        private FinancialPortal fdb = new FinancialPortal();
        private ApplicationDbContext adb = new ApplicationDbContext();

        // GET: Transactions
        public ActionResult Index()
        {
            var transactions = fdb.Transactions.Include(t => t.User).Include(t => t.Category).Include(t => t.PersonalAccount);
            return View(transactions.ToList());
        }

        // GET: Transactions/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Transaction transaction = fdb.Transactions.Find(id);
            if (transaction == null)
            {
                return HttpNotFound();
            }
            return View(transaction);
        }

        // GET: Transactions/Create
        public ActionResult Create()
        {
            ViewBag.EnteredById = new SelectList(adb.Users, "Id", "FirstName");
            ViewBag.CategoryId = new SelectList(fdb.Categories, "Id", "Name");
            ViewBag.AccountId = new SelectList(fdb.PersonalAccounts, "Id", "Name");
            return View();
        }

        // POST: Transactions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,AccountId,Description,Date,Amount,Type,CategoryId,EnteredById,Reconciled,ReconciledAmount,Void,IsDeleted")] Transaction transaction)
        {
            if (ModelState.IsValid)
            {
                fdb.Transactions.Add(transaction);
                fdb.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.EnteredById = new SelectList(adb.Users, "Id", "FirstName", transaction.EnteredById);
            ViewBag.CategoryId = new SelectList(fdb.Categories, "Id", "Name", transaction.CategoryId);
            ViewBag.AccountId = new SelectList(fdb.PersonalAccounts, "Id", "Name", transaction.AccountId);
            return View(transaction);
        }

        // GET: Transactions/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Transaction transaction = fdb.Transactions.Find(id);
            if (transaction == null)
            {
                return HttpNotFound();
            }
            ViewBag.EnteredById = new SelectList(adb.Users, "Id", "FirstName", transaction.EnteredById);
            ViewBag.CategoryId = new SelectList(fdb.Categories, "Id", "Name", transaction.CategoryId);
            ViewBag.AccountId = new SelectList(fdb.PersonalAccounts, "Id", "Name", transaction.AccountId);
            return View(transaction);
        }

        // POST: Transactions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,AccountId,Description,Date,Amount,Type,CategoryId,EnteredById,Reconciled,ReconciledAmount,Void,IsDeleted")] Transaction transaction)
        {
            if (ModelState.IsValid)
            {
                fdb.Entry(transaction).State = EntityState.Modified;
                fdb.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.EnteredById = new SelectList(adb.Users, "Id", "FirstName", transaction.EnteredById);
            ViewBag.CategoryId = new SelectList(fdb.Categories, "Id", "Name", transaction.CategoryId);
            ViewBag.AccountId = new SelectList(fdb.PersonalAccounts, "Id", "Name", transaction.AccountId);
            return View(transaction);
        }

        // GET: Transactions/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Transaction transaction = fdb.Transactions.Find(id);
            if (transaction == null)
            {
                return HttpNotFound();
            }
            return View(transaction);
        }

        // POST: Transactions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Transaction transaction = fdb.Transactions.Find(id);
            fdb.Transactions.Remove(transaction);
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
