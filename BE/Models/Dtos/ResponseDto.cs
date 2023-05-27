using BE.Models;
using System.Collections.Generic;

namespace BE.Models.Dtos
{
    public class ResponseDto
    {
        public int Code { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public ResponseDto()
        {
        }

        public ResponseDto(int Code, bool Success, string Message, object Data)
        {
            this.Code = Code;
            this.Success = Success;
            this.Message = Message;
            this.Data = Data;
        }

    }
}
