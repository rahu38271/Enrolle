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
    public class GeneralEnquiryController : ControllerBase
    {
        private readonly IGeneralEnquiryService _generalEnquiryService;
        private readonly IExceptionLogService _exceptionLogService;

        public GeneralEnquiryController(IGeneralEnquiryService generalEnquiryService, IExceptionLogService exceptionLogService)
        {
            _generalEnquiryService = generalEnquiryService;
            _exceptionLogService = exceptionLogService;
        }
       
        [HttpPost("InsertArea")]
        public IActionResult InsertArea(Area area )
        {
            try
            {
                return Ok(_generalEnquiryService.InsertArea(area));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/InsertArea");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertTypeofComplaint")]
        public IActionResult InsertTypeofComplaint(TypeOfComplaint typeOfComplaint)
        {
            try
            {
                return Ok(_generalEnquiryService.InsertTypeofComplaint(typeOfComplaint));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/InsertTypeofComplaint");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertTypeofWork")]
        public IActionResult InsertTypeofWork(TypeofWork typeofWork)
        {
            try
            {
                return Ok(_generalEnquiryService.InsertTypeofWork(typeofWork));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/InsertTypeofWork");
                return BadRequest(ex);
            }
        }
        
        [HttpPost("InsertTypeOfForm")]
        public IActionResult InsertTypeOfForm(TypeOfForm typeOfForm)
        {
            try
            {
                return Ok(_generalEnquiryService.InsertTypeOfForm(typeOfForm));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/InsertTypeOfForm");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllArea")]
        public IActionResult GetAllArea() 
        {
            try
            {
                return Ok(_generalEnquiryService.GetAllArea());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/GetAllArea");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllTypeOfComplaints")]
        public IActionResult GetAllTypeOfComplaints()
        {
            try
            {
                return Ok(_generalEnquiryService.GetAllTypeOfComplaints());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/GetAllTypeOfComplaints");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllTypeOfForms")]
        public IActionResult GetAllTypeOfForms()
        {
            try
            {
                return Ok(_generalEnquiryService.GetAllTypeOfForms());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/GetAllTypeOfForms");
                return BadRequest(ex);
            }
        }


        [HttpGet("GetAllTypeofWorks")]
        public IActionResult GetAllTypeofWorks()
        {
            try
            {
                return Ok(_generalEnquiryService.GetAllTypeofWorks());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/GetAllTypeofWorks");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertUpdateGeneralEnquiry")]
        public IActionResult InsertUpdateGeneralEnquiry(GeneralEnquiry generalEnquiry)
        {
            try
            {
                return Ok(_generalEnquiryService.InsertUpdateGeneralEnquiry(generalEnquiry));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/InsertUpdateGeneralEnquiry");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllEnquiry")]
        public IActionResult GetAllEnquiry(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_generalEnquiryService.GetAllEnquiry(UserId, RoleId, PageNo, NoofRow, SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/GetAllEnquiry");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetEnquirybyId")]
        public IActionResult GetEnquirybyId(int Id)
        {
            try
            {
                return Ok(_generalEnquiryService.GetEnquirybyId(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/GetEnquirybyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteEnquirybyId")]
        public IActionResult DeleteEnquirybyId(int Id)
        {
            try
            {
                return Ok(_generalEnquiryService.DeleteEnquirybyId(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/DeleteEnquirybyId");
                return BadRequest(ex);
            }
        }
        
        [HttpGet("GetEnquirybyDate")]
        public IActionResult GetEnquirybyDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            try
            {
               return Ok(_generalEnquiryService.GetEnquirybyDate(UserId, RoleId, PageNo, NoofRow, FromDate,ToDate));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/GetEnquirybyDate");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteArea")]
        public IActionResult DeleteArea(int Id)
        {
            try
            {
                return Ok(_generalEnquiryService.DeleteArea(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/DeleteArea");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteTypeofComplaint")]
        public IActionResult DeleteTypeofComplaint(int Id)
        {
            try
            {
                return Ok(_generalEnquiryService.DeleteTypeofComplaint(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/DeleteTypeofComplaint");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteTypeOfForm")]
        public IActionResult DeleteTypeOfForm(int Id)
        {
            try
            {
                return Ok(_generalEnquiryService.DeleteTypeOfForm(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/DeleteTypeOfForm");
                return BadRequest(ex);
            }
        }


        [HttpGet("DeleteTypeofWork")]
        public IActionResult DeleteTypeofWork(int Id)
        {
            try
            {
                return Ok(_generalEnquiryService.DeleteTypeofWork(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "GeneralEnquiryController/DeleteTypeofWork");
                return BadRequest(ex);
            }
        }


    }
}
