using BE.Models.Dtos;
using System.Threading.Tasks;
using BE.Models.Dtos;

namespace BE.IServices
{
    public interface ICustomerService
    {
        public Task<ResponseDto> Get();
        public Task<ResponseDto> AddDataPayment(CustomerProductsDto model);

        public Task<ResponseDto> RefreshData();
    }
}
