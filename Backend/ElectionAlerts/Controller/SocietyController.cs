﻿using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
        public IActionResult GetAllSociety( int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_societyService.GetAllSociety(PageNo,NoofRow,SearchText));
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
        public IActionResult InsertUpdateSocietyComplaint([FromForm] string societycomplaint, [FromForm] IFormFile file)
        {
            try
            {
                SocietyComplaint societyComplaint = JsonConvert.DeserializeObject<SocietyComplaint>(societycomplaint);
              
                if (file != null)
                    societyComplaint.FileName = file.FileName;
                var result = _societyService.InsertUpdateSocietyComplaint(societyComplaint);
               
                if (file != null&&result==1)
                {
                    string PathName = Path.Combine(Directory.GetCurrentDirectory(), "Image", "SocietyImages");
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
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/InsertUpdateSocietyComplaint");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetSocietyComplaints")]
        public IActionResult GetSocietyComplaints(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_societyService.GetSocietyComplaints(UserId, RoleId, PageNo, NoofRow, SearchText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetSocietyComplaints");
                return BadRequest(ex);
            }
        }

        //[HttpGet("GetSocietyComplaintbyUserId")]
        //public IActionResult GetSocietyComplaintbyUserId(int UserId)
        //{
        //    try
        //    {
        //        return Ok(_societyService.GetSocietyComplaintbyUserId(UserId));
        //    }
        //    catch (Exception ex)
        //    {
        //        _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetSocietyComplaintbyUserId");
        //        return BadRequest(ex);
        //    }
        //}

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
        public IActionResult GetComplaintsbyStatus(int UserId, int RoleId, string Status, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_societyService.GetComplaintsbyStatus( UserId, RoleId,Status,PageNo,NoofRow,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetComplaintsbyStatus");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetTodayComplaint")]
        public IActionResult GetTodayComplaint(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_societyService.GetTodayComplaint( UserId, RoleId,PageNo,NoofRow,SearchText));
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


        [HttpGet("GetComplaintCountbyUserId")]
        public IActionResult GetComplaintCountbyUserId(int UserId, int RoleId)
        {
            try
            {
                return Ok(_societyService.GetComplaintCountbyUserId(UserId, RoleId));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetComplaintCountbyUserId");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DeleteSocietyComplaintbyId")]
        public IActionResult DeleteSocietyComplaintbyId(int Id)
        {
            try
            {
                    var result = _societyService.GetSocietyComplaintbyId(Id);
                    if (result != null)
                    {
                        if (result.FileName != null)
                        {
                            var path = Path.Combine(Directory.GetCurrentDirectory(), "Image", "SocietyImages", result.FileName);
                            System.IO.File.Delete(path);
                        }
                    }
                    return Ok(_societyService.DeleteSocietyComplaintbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/DeleteSocietyComplaintbyId");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetSocietyComplaintbyId")]
        public IActionResult GetSocietyComplaintbyId(int Id)
        {
            try
            {
                return Ok(_societyService.GetSocietyComplaintbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetSocietyComplaintbyId");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DownLoadFile")]
        public IActionResult DownLoadFile(int Id)
        {
            try
            {
                var result = _societyService.GetSocietyComplaintbyId(Id);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.FileName))
                    {
                        string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "SocietyImages", result.FileName);
                        var provider = new FileExtensionContentTypeProvider();
                        if (!provider.TryGetContentType(Filepath, out var contentType))
                        {
                            contentType = "application/octet-stream";
                        }

                        var bytes = System.IO.File.ReadAllBytes(Filepath);
                        return File(bytes, contentType, Path.GetFileName(Filepath));
                    }
                }
                return Ok("File Not Present");
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/DownoadFile");
                return BadRequest(ex.Message);
            }          
        }

        [HttpGet("GetSocietyComplaintbyDate")]
        public IActionResult GetSocietyComplaintbyDate(int UserId, int RoleId, string Subject, string FromDate, string ToDate, string UserName)
        {
            try
            {
                return Ok(_societyService.GetSocietyComplaintbyDate( UserId, RoleId,Subject, FromDate, ToDate, UserName));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetSocietyComplaintbyDate");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetSocietyComplaintFromDate")]
        public IActionResult GetSocietyComplaintFromDate(int UserId, int RoleId, string FromDate, string ToDate, string Status)
        {
            try
            {
                return Ok(_societyService.GetSocietyComplaintFromDate(UserId, RoleId,FromDate, ToDate, Status));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SocietyController/GetSocietyComplaintFromDate");
                return BadRequest(ex);
            }
        }
    }
}
