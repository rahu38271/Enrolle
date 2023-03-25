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
    public class SocietyController : ControllerBase
    {
        private readonly ISocietyService _societyService;
        private readonly IExceptionLogService _exceptionLogService;

        public SocietyController(ISocietyService societyService, IExceptionLogService exceptionLogService)
        {
            _societyService = societyService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpPost("InsertUpdateSociety")]
        public IActionResult InsertUpdateAnnapurna(Society society)
        {
            try
            {
                return Ok(_societyService.CreateUpdateSociety(society));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/InsertUpdateSociety");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllSociety")]
        public IActionResult GetAllSociety()
        {
            try
            {
                return Ok(_societyService.GetAllSociety());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetAllSociety");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteSocietybyId")]
        public IActionResult DeleteSocietybyId(int Id)
        {
            try
            {
                return Ok(_societyService.DeleteSocietybuId(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/DeleteSocietybyId");
                return BadRequest(ex);
            }
        }
    }
}
