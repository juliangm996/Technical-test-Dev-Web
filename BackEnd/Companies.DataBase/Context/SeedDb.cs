using Companies.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Companies.DataBase.Context
{
    public class SeedDb
    {
        private readonly DataContext _context;

        public SeedDb(DataContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            await _context.Database.EnsureCreatedAsync();
            await CheckIdentificationTypeAsync();
            await CheckBlackListAsync();
        }

        private async Task CheckBlackListAsync()
        {
            if (!_context.BlackLists.Any())
            {
                _context.BlackLists.Add(new BlackList
                {
                    IdentificationNumber = 900674335
                });
                await _context.SaveChangesAsync();
            }
        }

        private async Task CheckIdentificationTypeAsync()
        {


            if (!_context.IdentificationTypes.Any())
            {
                _context.IdentificationTypes.AddRange(new IdentificationType[] {

                    new IdentificationType
                    {
                        Name = "Registro civil de nacimiento",
                        State = true,
                        CompanyType = false
                    },
                     new IdentificationType
                    {
                        Name = "Tarjeta de identidad",
                        State = true,
                        CompanyType = false
                    },
                      new IdentificationType
                    {
                        Name = "Cédula de ciudadanía",
                        State = true,
                        CompanyType = false
                    },
                       new IdentificationType
                    {
                        Name = "Tarjeta de extrajería",
                        State = true,
                        CompanyType = true
                    },
                        new IdentificationType
                    {
                        Name = "Cédula de extranjería",
                        State = true,
                        CompanyType = false
                    },
                         new IdentificationType
                    {
                        Name = "NIT",
                        State = true,
                        CompanyType = true
                    },
                          new IdentificationType
                    {
                        Name = "Pasaporte",
                        State = true,
                        CompanyType = false
                    },
                           new IdentificationType
                    {
                        Name = "Tipo de documento extrajero",
                        State = true,
                        CompanyType = false
                    },
                            new IdentificationType
                    {
                        Name = "Otro",
                        State = true,
                        CompanyType = false
                    },


                });
                await _context.SaveChangesAsync();
            }
        }

    }
}
