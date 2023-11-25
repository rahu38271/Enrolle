using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class SmsSettingController : ControllerBase
    {
        private readonly ISmsSettingService _smsSettingService;
        private readonly IExceptionLogService _exceptioLogService;

        public SmsSettingController(ISmsSettingService smsSettingService, IExceptionLogService exceptioLogService)
        {
            _smsSettingService = smsSettingService;
            _exceptioLogService = exceptioLogService;
        }

        [HttpGet("GetAllSmsSetting")]
        public IActionResult GetAllSmsSetting()
        {
            try
            {
                return Ok(_smsSettingService.GetAllSmsSetting());
            }
            catch (Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "SmsSettingController/GetAllSmsSetting");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetLastSmsSettingbyType")]
        public IActionResult GetSmsSettingbyId(string MType)
        {
            try
            {
                return Ok(_smsSettingService.GetSmsSettingbyId(MType));
            }
            catch(Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "SmsSettingController/GetSmsSettingbyId");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertUpdateSmsSetting")]
        public IActionResult InsertUpdateSmsSetting(SmsSetting smsSetting )
        {
            try
            {
                return Ok(_smsSettingService.InsertUpdateSmsSetting(smsSetting));
            }
            catch (Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "SmsSettingController/InsertUpdateSmsSetting");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteSmsSettingbyId")]
        public IActionResult DeleteSmsSettingbyId(int Id)
        {
            try
            {
                return Ok(_smsSettingService.DeleteSmsSettingbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "SmsSettingController/DeleteSmsSettingbyId");
                return BadRequest(ex);
            }
        }
    }
}
