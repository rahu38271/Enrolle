﻿using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        public IActionResult InsertUpdateAppointment([FromForm] string appointments, [FromForm] IFormFile file)
        {
            try
            {
                Appointment appointment = JsonConvert.DeserializeObject<Appointment>(appointments);

                if (file != null)
                {
                    appointment.FileName = file.FileName;
                    if(appointment.Id>0)
                    {
                        var update = _appointmentService.GetAppointmentbyId(appointment.Id);
                        if (update.FileName != appointment.FileName)
                        {
                            var path = Path.Combine(Directory.GetCurrentDirectory(), "Image", "AppointmentImage", update.FileName);
                            if (System.IO.File.Exists(path))
                                System.IO.File.Delete(path);
                        }
                    }
                }

                var result = _appointmentService.InsertUpdateAppintment(appointment);
               
                if (file != null && result>1)
                {
                    string PathName = Path.Combine(Directory.GetCurrentDirectory(), "Image", "AppointmentImage");
                    if (!Directory.Exists(PathName))
                        Directory.CreateDirectory(PathName);
                    string FullPath = Path.Combine(PathName, file.FileName);
                    using (var stream = new FileStream(FullPath, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/InsertUpdateAppointment");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllAppointment")]
        public IActionResult GetAllAppointment(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_appointmentService.GetAppointments(UserId,RoleId,PageNo,NoofRow,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAllAppointment");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAppointmentbyDate")]
        public IActionResult GetAppointmentbyDate(int UserId, int RoleId,string dateTime)
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentbyDate(UserId,RoleId,dateTime));
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
                var result = _appointmentService.GetAppointmentbyId(Id);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.FileName))
                    {
                      
                        var path = Path.Combine(Directory.GetCurrentDirectory(), "Image", "AppointmentImage", result.FileName);
                        if (System.IO.File.Exists(path))
                            System.IO.File.Delete(path);
                    }
                }
                return Ok(_appointmentService.DeleteAppointmentbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/DeleteAppointmentbyId");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateAppointmnetStatus")]
        public IActionResult UpdateAppointmnetStatus(int Id,string Status,string dateTime)
        {
            try
            {
                return Ok(_appointmentService.UpdateApointmentStatus(Id, Status, dateTime));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/UpdateAppointmnetStatus");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetTodayAppointment")]
        public IActionResult GetTodayAppointment(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_appointmentService.GetTodayAppointment(UserId,RoleId,PageNo,NoofRow,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetTodayAppointment");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAppointmentbyStatus")]
        public IActionResult GetAppointmentbyStatus(int UserId, int RoleId, string Status, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentbyStatus(UserId,RoleId,Status,PageNo,NoofRow,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAppointmentbyStatus");
                return BadRequest(ex);
            }
        }

        //[HttpGet("DownloadFile")]
        //public IActionResult DownloadFile(int Id, string FileName)
        //{
        //    try
        //    {
        //        return Ok(_appointmentService.DownloadFile(Id,FileName));
        //    }
        //    catch(Exception ex)
        //    {
        //        _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/DownloadFile");
        //        return BadRequest(ex);
        //    }
        //}

        [HttpGet("GetAppointmentbyFromToDate")]
        public IActionResult GetAppointmentbyFromToDate(int UserId, int RoleId, string FromDate, string ToDate, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentFromToDate(UserId, RoleId, FromDate,ToDate,PageNo,NoofRow,SearchText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAppointmentbyFromToDate");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAppointmentCount")]
        public IActionResult GetAppointmentCount(int UserId, int RoleId)
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentCount(UserId, RoleId));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAppointmentCount");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAppointmentCountbyUser")]
        public IActionResult GetAppointmentCountbyUser()
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentCountbyUser());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAppointmentCountbyUser");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAppointmentbyUserId")]
        public IActionResult GetAppointmentbyUserId(int UserId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentbyUserId(UserId,PageNo,NoofRow,SearchText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAppointmentbyUserId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAppointmentbyId")]
        public IActionResult GetAppointmentbyId(int Id)
        {
            try
            {
                return Ok(_appointmentService.GetAppointmentbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/GetAppointmentbyId");
                return BadRequest(ex.Message);
            }
        }

        
        [HttpGet("DownLoadFile")]
        public IActionResult DownLoadFile(int Id)
        {
            try
            {
                var result = _appointmentService.GetAppointmentbyId(Id);
                if (result != null)
                {
                        if (!string.IsNullOrEmpty(result.FileName))
                        {
                            string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "AppointmentImage", result.FileName);
                              var provider = new FileExtensionContentTypeProvider();
                             if (!provider.TryGetContentType(Filepath, out var contentType))
                             {
                                contentType = "application/octet-stream";
                             }

                        var bytes =  System.IO.File.ReadAllBytes(Filepath);
                        return File(bytes, contentType, Path.GetFileName(Filepath));
                    }
                }
                return Ok("File Not Present");
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/DownoadFile");
                return BadRequest(ex.Message);
            }
        }
    }
}
