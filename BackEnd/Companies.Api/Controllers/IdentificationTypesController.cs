using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Companies.DataBase.Context;
using Companies.Entities;
using Companies.Entities.ApiHelpers;
using Companies.Entities.DbHelpers;
using Companies.DataBase.Helper;

namespace Companies.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentificationTypesController : ControllerBase
    {
        private readonly DataContext _context;

        public IdentificationTypesController(DataContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("GetItems")]
        public async Task<ActionResult<Result<IdentificationType>>> GetIdentificationTypes(Page page)
        {
            var items = _context.IdentificationTypes
                .AsNoTracking()
                .Where(x => x.Name.Contains(page.SearchData)
                || x.Id.ToString().Contains(page.SearchData))
                .AsQueryable();

            if (page.Pageable)
            {
                var totalPages = await QueryableExtension.TotalRecors(items, page.QuantityShow);
                return new Result<IdentificationType>
                {
                    Pages = totalPages,
                    ItemsPerPage = page.QuantityShow,
                    TotalData = items.Count(),
                    Data = await items.Page(page).ToListAsync()
                };
            }
            return new Result<IdentificationType>
            {
                ItemsPerPage = items.Count(),
                Pages = 1,
                TotalData = items.Count(),
                Data = await items.ToListAsync()
            };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IdentificationType>> GetIdentificationType(int id)
        {
            var identificationType = await _context.IdentificationTypes.FindAsync(id);

            if (identificationType == null)
            {
                return NotFound();
            }

            return identificationType;
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIdentificationType(int id, IdentificationType identificationType)
        {
            if (id != identificationType.Id)
            {
                return BadRequest();
            }

            _context.Entry(identificationType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IdentificationTypeExists(id))
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

        [HttpPut]
        [Route("ChangeState")]
        public async Task<IActionResult> ChangeState(int id)
        {
            var item = await _context.IdentificationTypes.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }

            item.State = !item.State;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IdentificationTypeExists(id))
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
        public async Task<ActionResult<IdentificationType>> PostIdentificationType(IdentificationType identificationType)
        {
            _context.IdentificationTypes.Add(identificationType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIdentificationType", new { id = identificationType.Id }, identificationType);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIdentificationType(int id)
        {
            if (!await IsCompaniesWithType(id))
            {
                var identificationType = await _context.IdentificationTypes.FindAsync(id);
                if (identificationType == null)
                {
                    return NotFound();
                }

                _context.IdentificationTypes.Remove(identificationType);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            return NotFound();
        }

        private bool IdentificationTypeExists(int id)
        {
            return _context.IdentificationTypes.Any(e => e.Id == id);
        }

        private async Task<bool> IsCompaniesWithType(int id)
        {
            var items = await _context.Companies.Where(x => x.IdentificationTypeId == id).ToListAsync();

            if(items.Count == 0)
            {
                return false;
            }
            return true;
        }
    }
}
