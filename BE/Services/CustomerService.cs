using Microsoft.EntityFrameworkCore;
using BE.Models.Dtos;
using BE.Database;
using System;
using System.Linq;
using System.Threading.Tasks;
using BE.IServices;

namespace BE.Repositories
{
    public class CustomerService : ICustomerService
    {
        public CustomerService()
        {
        }

        public async Task<ResponseDto> Get()
        {
            var result = new ResponseDto()
            {
                Code = 400,
                Success = false,
                Message = "You must add more data!!"
            };

            using (var context = new MiniShopContext())
            {
                try
                {
                    var shops = await context.Shops.ToListAsync();
                    if (!shops.Any() || shops.Count < 3)
                    {
                        return result;
                    }

                    var products = await context.Products.ToListAsync();
                    if (!products.Any() || products.Count < 3)
                    {
                        return result;
                    }

                    var customers = await context.Customers.ToListAsync();
                    if (!customers.Any() || customers.Count < 30)
                    {
                        return result;
                    }

                    var rs = (from cust in customers
                              join cusPro in context.CustomerProducts on cust.Id equals cusPro.CustomerId
                              join pro in products on cusPro.ProductId equals pro.Id
                              join shop in shops on pro.ShopId equals shop.Id
                              orderby cust.Email ascending, shop.Location descending, pro.Price ascending
                              select new SortedDto()
                              {
                                  Name = cust.Name,
                                  Email = cust.Email,
                                  ShopName = shop.Name,
                                  ShopLocation = shop.Location,
                                  ProductName = pro.Name,
                                  Price = pro.Price
                              }).ToList();

                    return new ResponseDto()
                    {
                        Code = 200,
                        Success = true,
                        Message = "You add data successfull",
                        Data = rs
                    };
                }
                catch (Exception ex)
                {
                    result.Code = 400;
                    result.Message = ex.Message;
                    return result;
                }
            }
        }

        public async Task<ResponseDto> AddDataPayment(CustomerProductsDto model)
        {
            var msg = CheckValidation(model);
            if (!string.IsNullOrEmpty(msg))
            {
                return new ResponseDto()
                {
                    Code = 400,
                    Success = false,
                    Message = msg
                };
            }

            using (var context = new MiniShopContext())
            {
                try
                {
                    await context.Shops.AddRangeAsync(model.Shops);
                    await context.Products.AddRangeAsync(model.Products);
                    await context.Customers.AddRangeAsync(model.Customers);
                    await context.CustomerProducts.AddRangeAsync(model.CustomerProducts);
                    await context.SaveChangesAsync();

                    return new ResponseDto()
                    {
                        Code = 200,
                        Success = true,
                        Message = "You add data successfull"
                    };
                }
                catch (Exception ex)
                {
                    return new ResponseDto()
                    {
                        Code = 400,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }

        
        private string CheckValidation(CustomerProductsDto model)
        {
            var msg = "";
            if (model == null)
            {
                msg = " You must add data!";
            }
            if (!model.Shops.Any() || (model.Shops.Count < 3))
            {
                msg += $"\n You must add at least 3 Shops!";
            }

            if (!model.Products.Any() || (model.Products.Count < 30))
            {
                msg += $"\n You must add at least 30 Products!";
            }

            if (!model.Customers.Any() || (model.Customers.Count < 30))
            {
                msg += $"\n You must add at least 30 Customers!";
            }
            return msg;
        }
        public async Task<ResponseDto> RefreshData()
        {
            
            using (var context = new MiniShopContext())
            {
                try
                {
                    context.Database.EnsureDeleted();
                    return new ResponseDto()
                    {
                        Code = 200,
                        Success = true,
                        Message = "You delete data successful"
                    };
                }
                catch (Exception ex)
                {
                    return new ResponseDto()
                    {
                        Code = 400,
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
        }
    }
}
