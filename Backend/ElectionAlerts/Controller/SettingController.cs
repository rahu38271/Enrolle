using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ElectionAlerts.Controller
{
    [Route("api/Setting")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private readonly ISettingService _settingService;
        private readonly IExceptionLogService _exceptionLogService;

        public SettingController(ISettingService settingService, IExceptionLogService exceptionLogService)
        {
            _settingService = settingService;
            _exceptionLogService = exceptionLogService;
        }

        // GET: api/<CommonController>
        [HttpGet("GetAllDistricts")]
        public IActionResult GetAllDistricts()
        {
            try
            {
             return Ok(_settingService.GetAllDistricts());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SettingController/GetAllDistricts");
                return BadRequest(ex);
            }
            
        }

        // GET api/<CommonController>/5
        [HttpGet("GetAllTaluka")]
        public IActionResult GetAllTaluka(int id)
        {
            try
            {
                return Ok(_settingService.GetAllTaluka(id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SettingController/GetAllTaluka");
                return BadRequest(ex);
            }
        }

       
    }
}
