using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MainframeProgramAnalysisTool.Models
{
    public class JsonResponse
    {
        private bool success;
        private string message;
        private string result;

        public bool Success { get => success; set => success = value; }
        public string Message { get => message; set => message = value; }
        public string Result { get => result; set => result = value; }
    }
}