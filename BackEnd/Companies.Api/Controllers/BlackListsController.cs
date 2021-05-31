using Companies.DataBase.Context;
using Companies.DataBase.Helper;
using Companies.Entities;
using Companies.Entities.ApiHelpers;
using Companies.Entities.DbHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Companies.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlackListsController : ControllerBase
    {
        private readonly DataContext _context;

        public BlackListsController(DataContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("GetItems")]
        public async Task<ActionResult<Result<BlackList>>> GetBlackLists(Page page)
        {
            IQueryable<BlackList> items = _context.BlackLists
                .AsNoTracking()
                .Where(x => x.IdentificationNumber.ToString().Contains(page.SearchData)
                || x.Id.ToString().Contains(page.SearchData))
                .AsQueryable();

            if (page.Pageable)
            {
                int totalPages = await QueryableExtension.TotalRecors(items, page.QuantityShow);
                return new Result<BlackList>
                {
                    Pages = totalPages,
                    ItemsPerPage = page.QuantityShow,
                    TotalData = items.Count(),
                    Data = await items.Page(page).ToListAsync()
                };
            }
            return new Result<BlackList>
            {
                ItemsPerPage = items.Count(),
                Pages = 1,
                TotalData = items.Count(),
                Data = await items.ToListAsync()
            };
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<BlackList>> GetBlackList(int id)
        {
            BlackList blackList = await _context.BlackLists.FindAsync(id);

            if (blackList == null)
            {
                return NotFound();
            }

            return blackList;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlackList(int id, BlackList blackList)
        {
            if (id != blackList.Id)
            {
                return BadRequest();
            }

            _context.Entry(blackList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlackListExists(id))
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
        public async Task<ActionResult<BlackList>> PostBlackList(BlackList blackList)
        {
            _context.BlackLists.Add(blackList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBlackList", new { id = blackList.Id }, blackList);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlackList(int id)
        {
            BlackList blackList = await _context.BlackLists.FindAsync(id);
            if (blackList == null)
            {
                return NotFound();
            }

            _context.BlackLists.Remove(blackList);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool BlackListExists(int id)
        {
            return _context.BlackLists.Any(e => e.Id == id);
        }
    }
}
