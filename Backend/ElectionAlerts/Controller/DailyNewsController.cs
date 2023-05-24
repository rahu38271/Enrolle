using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyNewsController : ControllerBase
    {
        private readonly IDailyNewsService _dataNewsService;
        private readonly IExceptionLogService _exceptionLogService;

        public DailyNewsController(IDailyNewsService dataNewsService, IExceptionLogService exceptionLogService)
        {
            _dataNewsService = dataNewsService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpPost("InsertUpdateDailyNews")]
        public IActionResult InsertUpdateDailyNews([FromForm] IFormFile file, [FromForm] string dailynews)
        {
            try
            {
                DailyNews dailyNews = JsonConvert.DeserializeObject<DailyNews>(dailynews);
                if (file != null)
                    dailyNews.FileName = file.FileName;

                var result = _dataNewsService.InsetUpdateDailyNews(dailyNews);

                if (file != null && result > 0)
                {
                    string PathName = Path.Combine(Directory.GetCurrentDirectory(), "Image", "DailyNews");
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
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "DailyNewsController/InsertUpdateDailyNews");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllDailyNews")]
        public IActionResult GetAllDailyNews(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_dataNewsService.GetAllDailyNews(UserId, RoleId, PageNo, NoofRow, SearchText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "DailyNewsController/GetAllDailyNews");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetDailyNewsbyId")]
        public IActionResult GetDailyNewsbyId(int Id)
        {
            try
            {
                return Ok(_dataNewsService.GetDailyNewsbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "DailyNewsController/GetDailyNewsbyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("DownLoadFile")]
        public IActionResult DownLoadFile(int Id)
        {
            try
            {
                var result = _dataNewsService.GetDailyNewsbyId(Id);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.FileName))
                    {
                        string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "DailyNews", result.FileName);
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
                _exceptionLogService.ErrorLog(ex, "Exception", "AppointmentController/DownoadFile");
                return BadRequest(ex.Message);
            }
        }
    }
}
