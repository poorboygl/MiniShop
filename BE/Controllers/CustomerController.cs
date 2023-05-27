using Microsoft.AspNetCore.Mvc;
using BE.IServices;
using BE.Models.Dtos;
using BE.Models.Dtos;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<ResponseDto> Get()
        {
            var rs = await _customerService.Get();
            return rs;
        }

        [HttpPost("AddDataPayment")]
        [Produces("application/json")]
        public async Task<ResponseDto> AddDataPayment([FromBody] CustomerProductsDto model)
        {
            return await _customerService.AddDataPayment(model);
        }

        [HttpGet]
        [Route("RefreshData")]
        public async Task<ResponseDto> RefreshData()
        {
            var rs = await _customerService.RefreshData();
            return rs;
        }
    }
}
