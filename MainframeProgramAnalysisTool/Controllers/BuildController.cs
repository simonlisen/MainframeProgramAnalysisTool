using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace MainframeProgramAnalysisTool.Controllers
{
    public class BuildController : Controller
    {
        // GET: Build
        public ActionResult Index()
        {
            return View();
        }

        public void GetDataByFileName(string filename)
        {
            string json = string.Empty;
            using (FileStream fs = new FileStream(Server.MapPath("~/Generated/" + filename + ".txt"), FileMode.Open, System.IO.FileAccess.Read, FileShare.ReadWrite))
            {
                using (StreamReader sr = new StreamReader(fs, Encoding.GetEncoding("gb2312")))
                {
                    json = sr.ReadToEnd().ToString();
                }
            }
            
            //get rid of space, linebreak, etc.
            string pa = @"[\t\n\r\s]";
            string json_raw = System.Text.RegularExpressions.Regex.Replace(json, pa, "", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
           
            object jsonObj = JsonConvert.SerializeObject(json_raw);
            Response.Write(jsonObj);
            Response.End();
        }

    }
}