using ElectionAlerts.Dto;
using ElectionAlerts.Helper;
using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class WardController : ControllerBase
    {
        private readonly IWardService _wardService;
        private readonly IExceptionLogService _exceptionLogService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public WardController(IWardService wardService, IExceptionLogService exceptionLogService, IHostingEnvironment hostingEnvironment)
        {
            _wardService = wardService;
            _exceptionLogService = exceptionLogService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("GetAllWard")]
        public IActionResult GetAllWard()
        {
            try
            {
                return Ok(_wardService.GetWard());
            } 
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WardController/GetAllWard");
                return BadRequest(ex);
            }
        }
        [HttpPost("InsertWard")]
        public IActionResult InsertWard(Ward ward)
        {
            try
            {
                return Ok(_wardService.InsertWard(ward));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WardController/InsertWard");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBulkWard")]
        public IActionResult InsertBulkWard(IFormFile file)
        {
            try
            {
                string webRootPath = _hostingEnvironment.WebRootPath;
                string folderName = "Upload";
                string fileName = file.FileName;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                    Directory.CreateDirectory(newPath);
                using (var stream = new FileStream(Path.Combine(newPath, fileName), FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                var filename = Path.Combine(newPath, fileName);
                var data = HelperClass.ReadExcel(filename);

                if (System.IO.File.Exists(filename))
                {
                    System.IO.File.Delete(filename);
                }
                return Ok(_wardService.InsertBulkWard(data));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WardController/InsertBulkWard");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBulkWardList")]
        public IActionResult InsertBulkWardList(List<Ward> wards)
        {
            try
            {
                return Ok(_wardService.InsertBulkWardList(wards));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WardController/InsertBulkWardList");
                return BadRequest(ex);
            }
        }

        [HttpPost("FilterWardList")]
        public IActionResult FilterWardList(Table table)
        {
            try
            {
                return Ok(_wardService.FilterWardList(table));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WardController/FilterWardList");
                return BadRequest(ex);
            }
        }

        [HttpPost("DeleteWardbyId")]
        public IActionResult DeleteWardbyId(int Id)
        {
            try
            {
                return Ok(_wardService.DeleteWardbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "WardController/DeleteWardbyId");
                return BadRequest(ex);
            }
        }
    }
}
