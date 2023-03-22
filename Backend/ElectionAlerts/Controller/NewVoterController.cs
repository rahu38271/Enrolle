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
    public class NewVoterController : ControllerBase
    {
        private readonly IExceptionLogService _exceptionLogService;
        private readonly INewVoterService _newVoterService;

        public NewVoterController(IExceptionLogService exceptionLogService,INewVoterService newVoterService)
        {
            _exceptionLogService = exceptionLogService;
            _newVoterService = newVoterService;
        }

        [HttpPost("InsertUpdateNewVoter")]
        public IActionResult InsertUpdateNewVoter(NewVoter newVoter)
        {
            try
            {
                return Ok(_newVoterService.NewVoterInsertUpdate(newVoter));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NewVoterController/InsertUpdateNewVoter");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteNewVoterbyId")]
        public IActionResult DeleteNewVoterbyId(int Id)
        {
            try
            {
                return Ok(_newVoterService.DeleteNewVoterbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NewVoterController/DeleteNewVoterbyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllNewVoter")]
        public IActionResult GetAllNewVoter()
        {
            try
            {
                return Ok(_newVoterService.GetAllNewVoter());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NewVoterController/GetAllNewVoter");
                return BadRequest(ex);
            }
        }
    }
}
