using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ElectionAlerts.Controller
{
    [Route("api/Contact")]
    [ApiController]
  //  [Authorize]
    public class ContactController : ControllerBase
    {
        private IContactService _contactService;
        private IExceptionLogService _exceptionLogService;
        public ContactController(IContactService contactService,IExceptionLogService exceptionLogService)
        {
            _contactService = contactService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_contactService.GetContacts());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/GetContact");
                return BadRequest(ex);
                
            }
          
        }
       
        [HttpPost("InsertSingleContact")]
        public IActionResult InsertSingleContact(Contact contact)
        {
            try
            {
                return Ok(_contactService.InsertSingleContact(contact));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/InsertSingleContact");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBulkContact")]
        public IActionResult InsertBulkContact(List<Contact> contact)
        {
            try
            {
                return Ok(_contactService.InsertBulkContact(contact));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/InsertBulkContact");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateSingleContact")]
        public IActionResult UpdateSingleContact(Contact contact)
        {
            try
            {
                return Ok(_contactService.UpdateSingleContact(contact));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/UpdateSingleContact");
                return BadRequest(ex);
            }
        }



    }
}
