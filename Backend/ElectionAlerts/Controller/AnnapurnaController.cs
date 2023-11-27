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


        [HttpGet("GetAllFamilybyId")]
        public IActionResult GetAllFamilybyId(int anpnid)
        {
            try
            {
                return Ok(_annapurnaService.GetFamilybyId(anpnid));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/GetAllFamilybyId");
                return BadRequest();
            }
        }

        [HttpPost("InsertUpdateFamily")]
        public IActionResult InsertUpdateFamily(Family family)
        {
            try
            {
                return Ok(_annapurnaService.InsertUpdateFamily(family));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/InsertUpdateFamily");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteFamilybyId")]
        public IActionResult DeleteFamilybyId(int Id)
        {
            try
            {
                return Ok(_annapurnaService.DeleteFamilybyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/DeleteFamilybyId");
                return BadRequest(ex);
            }
        }
    }
}
