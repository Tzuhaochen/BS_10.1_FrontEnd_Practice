using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace WebApplication.Controllers
{
    public class ContactController : ApiController
    {
        [HttpGet]
        public object Get()
        {
            var dat = new string[,]
             { { "Eric", "0912345678", "1980/1/1", "eric@gmail.com",
              "台北市光復南路179號13樓", "同學,客戶"},
            { "Amy", "0912345678", "1980/1/1", "eric@gmail.com",
              "台北市光復南路179號13樓", "同學,客戶"}
             };

            return dat;
        }
    }
}
