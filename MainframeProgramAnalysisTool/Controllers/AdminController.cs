using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MainframeProgramAnalysisTool.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Validation()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Validation(string name, string password)
        {
            if (name == "admin" && password == "123")
            {
                return View("Index");
            }
            else
            {
                return View();
            }
        }
    }
}