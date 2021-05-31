using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Companies.Entities
{
    public class IdentificationType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool CompanyType { get; set; } = false;
        public bool State { get; set; } = true;

        public ICollection<Company> Companies { get; set; }
    }
}
