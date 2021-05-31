using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Companies.Entities.DbHelpers
{
    public class Page
    {
        public int CurrentPage { get; set; } = 1;
        public int QuantityShow { get; set; } = 10;
        public bool Pageable { get; set; } = true;
        public bool IsSearch { get; set; } = false;
        public string SearchData { get; set; } = string.Empty;

    }
}
