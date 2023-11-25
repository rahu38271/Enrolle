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
    public class NewVoterController : ControllerBase
    {
        private readonly IExceptionLogService _exceptionLogService;
        private readonly INewVoterService _newVoterService;

        public NewVoterController(IExceptionLogService exceptionLogService,INewVoterService newVoterService)
        {
            _exceptionLogService = exceptionLogService;
            _newVoterService = newVoterService;
        }

        [HttpPost("InsertUpdateOfficeWork")]
        public IActionResult InsertUpdateNewVoter(NewVoter newVoter)
        {
            try
            {
                return Ok(_newVoterService.NewVoterInsertUpdate(newVoter));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NewVoterController/InsertUpdateOfficeWork");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteOfficeWorkbyId")]
        public IActionResult DeleteNewVoterbyId(int Id)
        {
            try
            {
                return Ok(_newVoterService.DeleteNewVoterbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NewVoterController/DeleteOfficeWorkbyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllOfficeWork")]
        public IActionResult GetAllNewVoter(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_newVoterService.GetAllNewVoter(UserId,RoleId,PageNo,NoofRow,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NewVoterController/GetAllOfficeWork");
                return BadRequest(ex);
            }
        }
    }
}
