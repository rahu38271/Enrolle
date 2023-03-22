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
    public class AnnapurnaController : ControllerBase
    {
        private readonly IAnnapurnaService _annapurnaService;
        private readonly IExceptionLogService _exceptionLogService;

        public AnnapurnaController( IAnnapurnaService annapurnaService, IExceptionLogService exceptionLogService)
        {
            _annapurnaService = annapurnaService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpGet("GetAllAnnapurna")]
        public IActionResult GetAllAnnapurna()
        {
            try
            {
                return Ok(_annapurnaService.GetAllAnnapurna());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/GetAllAnnapurna");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertUpdateAnnapurna")]
        public IActionResult InsertUpdateAnnapurna(Annapurna annapurna)
        {
            try
            {
                return Ok(_annapurnaService.InsertUpdate(annapurna));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/InsertUpdateAnnapurna");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteAnnapurnabyId")]

        public IActionResult DeleteAnnapurnabyId(int Id)
        {
            try
            {
                return Ok(_annapurnaService.DeletebyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/DeleteAnnapurnabyId");
                return BadRequest(ex);
            }
        }
    }
}
