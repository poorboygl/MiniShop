using System;
using System.Collections.Generic;

namespace BE.Models.Dtos
{
    public class CustomerProductsDto
    {
        public ICollection<Shop> Shops { get; set; }
        public ICollection<Product> Products { get; set; }
        public ICollection<Customer> Customers { get; set; }
        public ICollection<CustomerProduct> CustomerProducts { get; set; }
    }
}
