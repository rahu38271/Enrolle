using ElectionAlerts.Model;
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
    public class SuperAdminController : ControllerBase
    {
        private readonly ISuperAdminService _superAdminservice;
        private readonly IExceptionLogService _exceptionLogService;

        public SuperAdminController(ISuperAdminService superAdminservice, IExceptionLogService exceptionLogService)
        {
            _superAdminservice = superAdminservice;
            _exceptionLogService = exceptionLogService;
        }

        [HttpGet("GetAllSuperAdmin")]
        public IActionResult GetAllSuperAdmin()
        {
            try
            {
                return Ok(_superAdminservice.GetAllSuperAdmin());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SuperAdminController/GetAllSuperAdmin");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertSuperAdmin")]
        public IActionResult InsertSuperAdmin(SuperAdmin superAdmin )
        {
            try
            {
                return Ok(_superAdminservice.InsertSuperAdmin(superAdmin));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SuperAdminController/InsertSuperAdmin");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateSuperAdmin")]
        public IActionResult UpdateSuperAdmin(SuperAdmin superAdmin)
        {
            try
            {
                return Ok(_superAdminservice.UpdateSuperAdmin(superAdmin));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SuperAdminController/UpdateSuperAdmin");
                return BadRequest(ex);
            }

        }

    }
}
