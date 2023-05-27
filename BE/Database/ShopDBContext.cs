using Microsoft.EntityFrameworkCore;
using BE.Models;

namespace BE.Database
{
    public class MiniShopContext : DbContext
    {
        protected override void OnConfiguring
         (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "MiniShop");
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CustomerProduct> CustomerProducts { get; set; }
    }
}
