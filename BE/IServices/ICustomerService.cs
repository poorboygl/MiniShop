using BE.Models.Dtos;
using System.Threading.Tasks;
using BE.Models.Dtos;

namespace BE.IServices
{
    public interface ICustomerService
    {
        Task<ResponseDto> Get(string strProduct, string strCustomer);
        Task<ResponseDto> AddDataPayment(CustomerProductsDto model);

        Task<ResponseDto> RefreshData();
    }
}
