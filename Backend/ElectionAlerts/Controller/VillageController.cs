using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
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
    public class VillageController : ControllerBase
    {
        private readonly IVillageService _villageService;
        private readonly IExceptionLogService _exceptionLogService;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public VillageController(IVillageService villageService, IExceptionLogService exceptionLogService, IWebHostEnvironment hostingEnvironment)
        {
            _villageService = villageService;
            _exceptionLogService = exceptionLogService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost("InsertVillageExcel")]
        public IActionResult InsertVillageExcel(IFormFile file)
        {
            List<Village> villages = new List<Village>();
            try
            {
                if (file == null || file.Length <= 0)
                {
                    return BadRequest("formfile is empty");
                }

                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Not Support file extension");
                }
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

                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                    //using (var package = new ExcelPackage(stream))
                    using (var package = new ExcelPackage(new FileInfo(filename)))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension.Rows;
                        for (int row = 2; row <= rowCount; row++)
                        {
                            Village village = new Village();
                            if (worksheet.Cells[row, 1].Value != null)
                              village.VillageName = worksheet.Cells[row, 1].Value.ToString().Trim();
                            if (worksheet.Cells[row, 2].Value != null)
                                village.District= worksheet.Cells[row, 2].Value.ToString().Trim();
                            if (worksheet.Cells[row,3].Value != null)
                                village.Taluka = worksheet.Cells[row, 3].Value.ToString().Trim();
                            villages.Add(village);
                        }
                    }
                }
                if (System.IO.File.Exists(filename))
                {
                    System.IO.File.Delete(filename);
                }
                return Ok(_villageService.InsertBulkVillageList(villages));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VillageController/InsertVillageExcel");
                return BadRequest(ex);
            }

        }

        [HttpGet("GetAllVillagebyTaluka")]

        public IActionResult GetAllVillagebyTaluka(string taluka)
        {
            try
            {
                return Ok(_villageService.GetVillage(taluka));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VillageController/GetAllVillagebyTaluka");
                return BadRequest(ex);
            }
        }
    }
}
