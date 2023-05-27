using BE.Models;
using System;
using System.Collections.Generic;

namespace BE.Models.Dtos
{
    public class SortedDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string ShopName { get; set; }
        public string ShopLocation { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
    }
}
