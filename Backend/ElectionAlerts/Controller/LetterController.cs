using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class LetterController : ControllerBase
    {
        private readonly ILetterService _letterService;
        private readonly IExceptionLogService _exceptionLogService;

        public LetterController(ILetterService letterService, IExceptionLogService exceptionLogService)
        {
            _letterService = letterService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpPost("CreateUpdateLetter")]
        public IActionResult CreateUpdateLetter([FromForm] string letter, [FromForm] IFormFile file)
        {
            try
            {
                Letter letters = JsonConvert.DeserializeObject<Letter>(letter);
                if (file != null)
                    letters.FileName = file.FileName;

                var result = _letterService.AddUpdateLetter(letters);
                if (file != null && result > 0)
                {
                    string PathName = Path.Combine(Directory.GetCurrentDirectory(), "Image", "LetterImage");
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
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/CreateUpdateLetter");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllLetter")]
        public IActionResult GetAllLetter(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_letterService.GetAllLetter(UserId, RoleId, PageNo, NoofRow, SearchText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/GetAllLetter");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetLetterById")]
        public IActionResult GetLetterbyId(int Id)
        {
            try
            {
                return Ok(_letterService.GetLetterById(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/GetLetterById");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DeleteLetterbyId")]
        public IActionResult DeleteLetterbyId(int Id)
        {
            try
            {
                var letter = _letterService.GetLetterById(Id);
                if(letter!=null)
                {
                    var lettetbyid = letter.FirstOrDefault();
                    if(!String.IsNullOrEmpty(lettetbyid.FileName))
                    {
                        var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "LetterImage",lettetbyid.FileName);
                        if (System.IO.File.Exists(filepath))
                            System.IO.File.Delete(filepath);
                    }
                }
                return Ok(_letterService.DeleteLetterbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/DeleteLetterbyId");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DownLoadFile")]
        public IActionResult DownLoadFile(int Id)
        {
            try
            {
                var result = _letterService.GetLetterById(Id);
                var res = result.Where(x => x.Id == Id).FirstOrDefault();
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(res.FileName))
                    {
                        string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "LetterImage", res.FileName);
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
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/DownoadFile");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CreateUpdateDepartment")]
        public IActionResult CreateUpdateDepartment(Departmet departmet)
        {
            try
            {
                return Ok( _letterService.CreateUpdateDepartment(departmet));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/CreateUpdateDepartment");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CreateUpdateOffice")]
        public IActionResult CreateUpdateOffice(Office office)
        {
            try
            {
                return Ok(_letterService.CreateUpdateOffice(office));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/CreateUpdateOffice");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetDepartmet")]
        public IActionResult GetDepartmet()
        {
            try
            {
                return Ok(_letterService.GetDepartmet());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/GetDepartmet");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetOffice")]
        public IActionResult GetOffice()
        {
            try
            {
                return Ok(_letterService.GetOffice());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/GetOffice");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetLetterbyStatusandDate")]
        public IActionResult GetLetterbyStatusandDate(int UserId, int RoleId, int PageNo, int NoofRow, string Status, string StartDate, string EndDate, string SearchText)
        {
            try
            {
                return Ok(_letterService.GetLetterbyStatusandDate(UserId, RoleId, PageNo, NoofRow, Status, StartDate, EndDate, SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/GetLetterbyStatusandDate");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetDashBoardCount")]
        public IActionResult GetDashBoardCount(int UserId, int RoleId)
        {
            try
            {
                return Ok(_letterService.GetDashBoardCount(UserId,RoleId));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/GetDashBoardCount");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetLetterbyStatus")]
        public IActionResult GetLetterbyStatus(int UserId, int RoleId, int PageNo, int NoofRow)
        {
            try
            {
                return Ok(_letterService.GetLetterbyStatus(UserId, RoleId, PageNo, NoofRow));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LetterController/GetLetterbyStatus");
                return BadRequest(ex.Message);
            }
        }
    }
}
