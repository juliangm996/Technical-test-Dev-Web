using System;

namespace Companies.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public int IdentificationTypeId { get; set; }
        public int IdentificationNumber { get; set; }
        public string CompanyName { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string Surname { get; set; }
        public string SecondSurname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsMobileMessage { get; set; }
        public bool IsEmailMessage { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public IdentificationType identificationType { get; set; }

    }
}
