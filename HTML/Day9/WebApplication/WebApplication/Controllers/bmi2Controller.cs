using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class bmi2Controller : ApiController
    {
        [HttpPost] //前端Httppost可以在body裡面塞資料
        public IHttpActionResult Post(BMIParam para)
        {
            para.height = para.height / 100;
            var bmi = para.weight / (para.height * para.height);
            var ret = new BMIResult() { BMI = bmi };
            //在上面回Http200 並回傳JSON物件(ret)
            return Ok(ret);
        }
    }
}
