using ElectionAlerts.Dto;
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


        [HttpPost("InsertUpdateSocietyComplaint")]
        public IActionResult InsertUpdateSocietyComplaint(SocietyModel societyModel)
        {
            try
            {
                return Ok(_societyService.InsertUpdateSocietyComplaint(societyModel));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/InsertUpdateSocietyComplaint");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetSocietyComplaints")]
        public IActionResult GetSocietyComplaints()
        {
            try
            {
                return Ok(_societyService.GetSocietyComplaints());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetSocietyComplaints");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetSocietyComplaintbyId")]
        public IActionResult GetSocietyComplaintbyId(int UserId)
        {
            try
            {
                return Ok(_societyService.GetSocietyComplaintbyId(UserId));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetSocietyComplaintbyId");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateComplaintStatus")]
        public IActionResult UpdateComplaintStatus(int Id,string Status)
        {
            try
            {
                return Ok(_societyService.UpdateComplaintStatus(Id, Status));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/UpdateComplaintStatus");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetComplaintsbyStatus")]
        public IActionResult GetComplaintsbyStatus(string Status)
        {
            try
            {
                return Ok(_societyService.GetComplaintsbyStatus(Status));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetComplaintsbyStatus");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetTodayComplaint")]
        public IActionResult GetTodayComplaint()
        {
            try
            {
                return Ok(_societyService.GetTodayComplaint());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetTodayComplaint");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetComplaintCount")]
        public IActionResult GetComplaintCount()
        {
            try
            {
                return Ok(_societyService.GetComplaintCount());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetComplaintCount");
                return BadRequest(ex);
            }
        }
    }
}
