using ElectionAlerts.Dto;
using ElectionAlerts.Helper;
using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
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
    [ApiController]
    public class BoothController : ControllerBase
    {
        private readonly IBoothService _boothService;
        private readonly IExceptionLogService _exceptioLogService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public BoothController(IBoothService boothService ,IExceptionLogService exceptioLogService, IHostingEnvironment hostingEnvironment)
        {
            _boothService = boothService;
            _exceptioLogService = exceptioLogService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("GetAllBooth")]
        public IActionResult GetAllBooth()
        {
            try
            {
                return Ok(_boothService.GetAllBoth());
            }
            catch(Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "BoothController/GetAllBooth");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBooth")]
        public IActionResult InsertBooth(Booth booth)
        {
            try
            {
                return Ok(_boothService.InsertBoothSingle(booth));
            }
            catch(Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "BoothController/InsertBooth");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBoothBulk")]
        public IActionResult InsertBoothBulk(IFormFile file)
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
                return Ok(_boothService.InsertBoothBulk(data));
            }
            catch (Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "BoothController/InsertBoothBulk");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBoothBulkList")]
        public IActionResult InsertBoothBulkList(List<Booth> booths)
        {
            try
            {
                return Ok(_boothService.InsertBothBulkList(booths));
            }
            catch (Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "BoothController/InsertBoothBulkList");
                return BadRequest(ex);
            }
        }

        [HttpPost("FilterBoothList")]
        public IActionResult FilterBoothList(Table table)
        {
            try
            {
                return Ok(_boothService.FilterBoothList(table));
            }
            catch (Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "BoothController/FilterBoothList");
                return BadRequest(ex);
            }

        }

        [HttpPost("DeleteBoothbyId")]
        public IActionResult DeleteBoothbyId(int Id)
        {
            try
            {
                return Ok(_boothService.DeleteBoothbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptioLogService.ErrorLog(ex, "Exception", "BoothController/DeleteBoothbyId");
                return BadRequest(ex);
            }
        }
    }    
}
