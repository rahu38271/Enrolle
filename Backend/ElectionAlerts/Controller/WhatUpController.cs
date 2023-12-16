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
    public class WhatUpController : ControllerBase
    {
        private readonly IWhatUpService _whatUpService;
        private readonly IExceptionLogService _exceptionLogService;

        public WhatUpController(IWhatUpService whatUpService, IExceptionLogService exceptionLogService)
        {
            _whatUpService = whatUpService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpPost("CreateUpdateWhatUp")]
        public IActionResult CreateUpdateWhatUp(WhatUpSetting whatUpSetting)
        {
            try
            {
                return Ok(_whatUpService.CreateUpdateWhatUp(whatUpSetting));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WhatUpController/CreateUpdate");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetWhatUpSetting")]
        public IActionResult GetWhatUpSetting()
        {
            try
            {
                return Ok(_whatUpService.GetWhatUpSetting());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WhatUpController/GetWhatUpSetting");
                return BadRequest(ex);
            }
        }
    }
}
