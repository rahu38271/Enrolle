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

    }
}
