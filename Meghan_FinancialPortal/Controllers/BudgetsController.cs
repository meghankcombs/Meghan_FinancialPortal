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
    public class BudgetsController : Controller
    {
        private FinancialPortal fdb = new FinancialPortal();

        // GET: Budgets
        public ActionResult Index()
        {
            var budgets = fdb.Budgets.Include(b => b.Household);
            return View(budgets.ToList());
        }

        // GET: Budgets/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Budget budget = fdb.Budgets.Find(id);
            if (budget == null)
            {
                return HttpNotFound();
            }
            return View(budget);
        }

        // GET: Budgets/Create
        public ActionResult Create()
        {
            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name");
            return View();
        }

        // POST: Budgets/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,HouseholdId")] Budget budget)
        {
            if (ModelState.IsValid)
            {
                fdb.Budgets.Add(budget);
                fdb.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name", budget.HouseholdId);
            return View(budget);
        }

        // GET: Budgets/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Budget budget = fdb.Budgets.Find(id);
            if (budget == null)
            {
                return HttpNotFound();
            }
            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name", budget.HouseholdId);
            return View(budget);
        }

        // POST: Budgets/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,HouseholdId")] Budget budget)
        {
            if (ModelState.IsValid)
            {
                fdb.Entry(budget).State = EntityState.Modified;
                fdb.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.HouseholdId = new SelectList(fdb.Households, "Id", "Name", budget.HouseholdId);
            return View(budget);
        }

        // GET: Budgets/Delete/5
        //public ActionResult Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Budget budget = db.Budgets.Find(id);
        //    if (budget == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    return View(budget);
        //}

        // POST: Budgets/Delete/5
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Budget budget = fdb.Budgets.Find(id);
            fdb.Budgets.Remove(budget);
            fdb.SaveChanges();
            ViewBag.PreviousUrl = System.Web.HttpContext.Current.Request.UrlReferrer.ToString();
            return Redirect(ViewBag.PreviousUrl);
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
