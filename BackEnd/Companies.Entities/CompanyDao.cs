using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Companies.Entities
{
   public  class CompanyDao
    {
        public int Id { get; set; }
        public string IdentificationType { get; set; }
        public int IdentificationNumber { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public bool IsMobileMessage { get; set; }
        public bool IsEmailMessage { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
