using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class BMIResult
    {
        public float BMI { get; set; }
    }

    public class BMIParam
    {
        public float height { get; set; }
        public float weight { get; set; }
    }
}