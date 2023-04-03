using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly IDashBoardService _dashBoardService;
        private readonly IExceptionLogService _exceptionLogService;

        public DashBoardController(IDashBoardService dashBoardService, IExceptionLogService exceptionLogService)
        {
            _dashBoardService = dashBoardService;
            _exceptionLogService = exceptionLogService;
        }
        [HttpGet("GetDistrictCount")]
        public IActionResult GetDistrictCount(string Type)
        {
            try
             {
                return Ok(_dashBoardService.GetDistrictCount(Type));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "DashBoardController/GetDistrictAssemblyCount");
                return BadRequest(ex);

            }
        }

        [HttpGet("GetAssemblyCount")]
        public IActionResult GetAssemblyCount(string Type)
        {
            try
            {
                return Ok(_dashBoardService.GetAssemblyCount(Type));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "DashBoardController/GetDistrictAssemblyCount");
                return BadRequest(ex);
            }
        }
    }
}
