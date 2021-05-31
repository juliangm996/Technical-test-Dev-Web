using System;

namespace Companies.Entities
{
    public class BlackList
    {
        public int Id { get; set; }
        public int IdentificationNumber { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
