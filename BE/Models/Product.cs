using System;
using System.Collections.Generic;

namespace BE.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string ShopId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
