using Companies.Entities.DbHelpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Companies.DataBase.Helper
{
    public static class QueryableExtension
    {
        public static async Task<int> TotalRecors<T>(IQueryable<T> queryable, int CantidadResgistrosAMostrar)

        {
            double conteo = await queryable.CountAsync();
            double totalPaginas = Math.Ceiling(conteo / CantidadResgistrosAMostrar);
            return (int) totalPaginas;
        }

        public static IQueryable<T> Page<T>(this IQueryable<T> queryable, Page paginacion)
        {
            return queryable
                .Skip((paginacion.CurrentPage - 1) * paginacion.QuantityShow)
                .Take(paginacion.QuantityShow);
        }
    }
}
