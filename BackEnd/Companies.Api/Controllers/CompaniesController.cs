using Companies.DataBase.Context;
using Companies.DataBase.Helper;
using Companies.Entities;
using Companies.Entities.ApiHelpers;
using Companies.Entities.DbHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Companies.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly DataContext _context;

        public CompaniesController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context
                .Companies
                .AsNoTracking()
                .ToListAsync();
        }


        [HttpPost]
        [Route("CustomData")]
        public async Task<ActionResult<Result<CompanyDao>>> GetCompaniesCustom(Page page)
        {
            IQueryable<CompanyDao> items = from c in _context.Companies
                                           join i in _context.IdentificationTypes on c.IdentificationTypeId equals i.Id
                                           where (c.Id.ToString().Contains(page.SearchData) || page.SearchData.Equals(""))
                                           && (c.IdentificationNumber.ToString().Contains(page.SearchData) || page.SearchData.Equals(""))
                                           && (c.Name.Contains(page.SearchData) || page.SearchData.Equals(""))
                                           && (c.MiddleName.Contains(page.SearchData) || page.SearchData.Equals(""))
                                           && (c.Surname.Contains(page.SearchData) || page.SearchData.Equals(""))
                                           && (c.SecondSurname.Contains(page.SearchData) || page.SearchData.Equals(""))
                                           && (c.Email.Contains(page.SearchData) || page.SearchData.Equals(""))
                                           select new CompanyDao
                                           {
                                               Id = c.Id,
                                               DateTime = c.DateTime,
                                               DisplayName = i.CompanyType ? c.CompanyName :
                                               $"{c.Name} {c.MiddleName} {c.Surname} {c.SecondSurname}".Trim(),
                                               Email = c.Email,
                                               IdentificationNumber = c.IdentificationNumber,
                                               IdentificationType = i.Name,
                                               IsEmailMessage = c.IsEmailMessage,
                                               IsMobileMessage = c.IsMobileMessage
                                           };


           

            if (page.Pageable)
            {
                var totalPages = await QueryableExtension.TotalRecors(items, page.QuantityShow);
                return new Result<CompanyDao>
                {
                    Pages = totalPages,
                    ItemsPerPage = page.QuantityShow,
                    TotalData = items.Count(),
                    Data = await items.Page(page).ToListAsync()
                };
            }
            return new Result<CompanyDao>
            {
                ItemsPerPage = items.Count(),
                Pages = 1,
                TotalData = items.Count(),
                Data = await items.ToListAsync()
            };
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            Company company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }


        [HttpGet]
        [Route("GetCompanyByNumber")]
        public async Task<ActionResult<Company>> GetCompanyByNumber(int id)
        {
            Company company = await _context.Companies.FirstOrDefaultAsync(x=>x.IdentificationNumber == id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            if (IsBlacklist(company.IdentificationNumber))
            { return NotFound("Is Black List"); }

            if (CompanyExistsByNumber(company.IdentificationNumber))
            { return NotFound("Identification Number is alredy register"); }
            if (!IsValidModel(company))
            { return NotFound("Invalid Model"); }
            _context.Companies.Add(company);
            bool response = await _context.SaveChangesAsync() > 0;

            if (!response)
            {
                return BadRequest();
            }

            return Ok(true);

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            Company company = await _context.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("CompanyExistsByNumber")]
        public  bool CompanyExistsByNumber(int id)
        {
            return _context.Companies.Any(e => e.IdentificationNumber == id);
        }

        private bool IsCompanyType(int id)
        {
            IdentificationType item = _context.IdentificationTypes.Find(id);
            return item.CompanyType;
        }

        private bool IsValidModel(Company company)
        {
            bool isCompanyType = IsCompanyType(company.IdentificationTypeId);
            if (isCompanyType)
            {
                return IsValidCompanyType(company);
            }
            return IsValidNoCompanyType(company);
        }

        private bool IsValidCompanyType(Company c)
        {
            if (c.IdentificationTypeId > 0 && c.IdentificationNumber > 0 && !string.IsNullOrEmpty(c.CompanyName)
                && IsValidEmail(c.Email))
            {
                return true;
            }
            return false;
        }

        private bool IsValidNoCompanyType(Company c)
        {
            if (c.IdentificationTypeId > 0 && c.IdentificationNumber > 0 && !string.IsNullOrEmpty(c.Name)
                && !string.IsNullOrEmpty(c.Surname) && IsValidEmail(c.Email))
            {
                return true;
            }
            return false;
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                MailAddress address = new MailAddress(email);
                return address.Address == email;
            }
            catch
            {
                return false;
            }
        }

        [HttpGet]
        [Route("IsBlacklist")]
        public  bool IsBlacklist(int id)
        {
            BlackList item = _context.BlackLists.FirstOrDefault(x => x.IdentificationNumber == id);
            if (item == null)
            {
                return false;
            }
            return true;
        }
    }
}
