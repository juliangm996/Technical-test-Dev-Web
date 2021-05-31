using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Companies.Entities.ApiHelpers
{
    public class Result<T>
    {
        public int Pages { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalData { get; set; } = 0;
        public List<T> Data { get; set; }
    }
}
