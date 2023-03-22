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
    public class AppointmentController : ControllerBase
    {
        private readonly IExceptionLogService _exceptionLogService;
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IExceptionLogService exceptionLogService,IAppointmentService appointmentService)
        {
            _exceptionLogService = exceptionLogService;
            _appointmentService = appointmentService;
        }

        [HttpPost("InsertUpdateAppointment")]
        public IActionResult InsertUpdateAppointment(Appointment appointment)
        {
            try
            {
                return Ok(_appointmentService.InsertUpdateAppintment(appointment));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/InsertUpdateAppointment");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllAppointment")]
        public IActionResult GetAllAppointment()
        {
            try
            {
                return Ok(_appointmentService.GetAppointments());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAllAppointment");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAppointmentbyDate")]
        public IActionResult GetAppointmentbyDate(DateTime dateTime)
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentbyDate(dateTime));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAppointmentbyDate");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteAppointmentbyId")]
        public IActionResult DeleteAppointmentbyId(int Id)
        {
            try
            {
                return Ok(_appointmentService.DeleteAppointmentbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/DeleteAppointmentbyId");
                return BadRequest(ex);
            }
        }
    }
}
