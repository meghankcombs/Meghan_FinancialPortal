using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Meghan_FinancialPortal.Models.Helpers
{
    public class EmailModel
    {
        [Required, Display(Name = "Name")]
        public string FromName { get; set; }

        [Required, Display(Name = "Email")]
        public string FromEmail { get; set; }

        [Required]
        public string Body { get; set; }
    }
}