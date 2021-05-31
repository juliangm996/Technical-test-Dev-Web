using Companies.Entities;
using Microsoft.EntityFrameworkCore;

namespace Companies.DataBase.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<BlackList> BlackLists { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<IdentificationType> IdentificationTypes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BlackList>()
                .HasIndex(x => x.IdentificationNumber)
                .IsUnique();

            modelBuilder.Entity<Company>(e =>
            {
                e.HasIndex(x => x.IdentificationNumber)
                .IsUnique();

                e.HasOne(x => x.identificationType)
                .WithMany(x => x.Companies)
                .HasForeignKey(x => x.IdentificationTypeId);
            });


            modelBuilder.Entity<IdentificationType>()
            .HasIndex(x => x.Name)
            .IsUnique();
        }
    }
}
