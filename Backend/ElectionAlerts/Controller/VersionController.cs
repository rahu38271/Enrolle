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
    public class VersionController : ControllerBase
    {
        private readonly IVersionService _versionService;
        private readonly IExceptionLogService _exceptionLogService;

        public VersionController(IVersionService versionService, IExceptionLogService exceptionLogService)
        {
            _versionService = versionService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpPost("InsertUpdateVersion")]
        public IActionResult InsertUpdateVersion(Versions versions)
        {
            try
            {
                return Ok(_versionService.InsertUpdateVersion(versions));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VersionController/InsertUpdateVersion");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllVersion")]
        public IActionResult GetAllVersion()
        {
            try
            {
                return Ok(_versionService.GetAllVersion());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VersionController/GetAllVersion");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVersionbyId")]
        public IActionResult GetVersionbyId(int Id)
        {
            try
            {
                return Ok(_versionService.GetVersionbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VersionController/GetVersionbyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteVersionbyId")]

        public IActionResult DeleteVersionbyId(int Id)
        {
            try
            {
                return Ok(_versionService.DeleteVersionbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VersionController/DeleteVersionbyId");
                return BadRequest(ex);
            }
        }
    }
}
