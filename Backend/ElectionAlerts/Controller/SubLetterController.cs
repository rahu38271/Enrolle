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
    public class SubLetterController : ControllerBase
    {
        private readonly ISubLetterService _subLetterService;
        private readonly IExceptionLogService _exceptionLogService;

        public SubLetterController(ISubLetterService subLetterService, IExceptionLogService exceptionLogService)
        {
            _subLetterService = subLetterService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpPost("CreateUpdateSubLetter")]
        public IActionResult CreateUpdateSubLetter([FromForm] string subletter, [FromForm] IFormFile file)
        {
            try
            {
                SubLetter letters = JsonConvert.DeserializeObject<SubLetter>(subletter);
                if (file != null)
                    letters.FileName = file.FileName;

                var result = _subLetterService.CreateUpdateSubLetter(letters);
                if (file != null && result > 0)
                {
                    string PathName = Path.Combine(Directory.GetCurrentDirectory(), "Image", "SubLetterImage");
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
                _exceptionLogService.ErrorLog(ex, "Exception", "SubLetterController/CreateUpdateSubLetter");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllSubLetter")]
        public IActionResult GetAllSubLetter(int UserId, int RoleId, int PageNo, int NoofRow)
        {
            try
            {
                return Ok(_subLetterService.GetAllSubLetter(UserId, RoleId, PageNo, NoofRow));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SubLetterController/GetAllSubLetter");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetSubLetterbyId")]
        public IActionResult GetSubLetterbyId(int Id)
        {
            try
            {
                return Ok(_subLetterService.GetSubLetterbyId(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SubLetterController/GetSubLetterbyId");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DownLoadFile")]
        public IActionResult DownLoadFile(int Id)
        {
            try
            {
                var result = _subLetterService.GetSubLettersbyLetterId(Id);
                var res = result.Where(x => x.Id == Id).FirstOrDefault();
                if (res != null)
                {
                    if (!string.IsNullOrEmpty(res.FileName))
                    {
                        string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "SubLetterImage", res.FileName);
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
                _exceptionLogService.ErrorLog(ex, "Exception", "SubLetterController/DownoadFile");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DeleteSubLetterbyId")]
        public IActionResult DeleteSubLetterbyId(int Id)
        {
            try
            {
                var subletter = _subLetterService.GetSubLettersbyLetterId(Id);
                var subletterbyId = subletter.FirstOrDefault();
                if(!String.IsNullOrEmpty(subletterbyId.FileName))
                {
                    var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "SubLetterImage", subletterbyId.FileName);
                    if (System.IO.File.Exists(filepath))
                        System.IO.File.Delete(filepath);
                }
                return Ok(_subLetterService.DeleteSubLetterbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SubLetterController/DeleteSubLetterbyId");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("EditSubLetterbyId")]

        public IActionResult EditSubLetterbyId(int Id)
        {
            try
            {
                return Ok(_subLetterService.GetSubLettersbyLetterId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "SubLetterController/EditSubLetterbyId");
                return BadRequest(ex.Message);
            }
        }
    }
}
