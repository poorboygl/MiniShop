using System;

namespace BE.Models
{
    public class Customer
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime? Dob { get; set; }
        public string Email { get; set; }
    }
}
