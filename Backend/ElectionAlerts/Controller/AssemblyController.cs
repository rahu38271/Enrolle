using ElectionAlerts.Dto;
using ElectionAlerts.Helper;
using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssemblyController : ControllerBase
    {
        private readonly IAssemblyService _assemblyservice;
        private readonly IExceptionLogService _exceptionLogService;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public AssemblyController(IAssemblyService assemblyservice, IExceptionLogService exceptionLogService, IWebHostEnvironment hostingEnvironment)
        {
            _assemblyservice = assemblyservice;
            _exceptionLogService = exceptionLogService;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// Abhay
        /// </summary>
        /// <returns>GetAllAssembly</returns>
        [HttpGet("GetAllAssembly")]
        public IActionResult GetAllAssembly()
        {
            try
            {
                return Ok(_assemblyservice.GetAssembly());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AssemblyController/GetAllAssembly");
                return BadRequest(ex);
            }
        }
        [HttpPost("InsertAssembly")]
        public IActionResult InsertAssembly(Assembly assembly)
        {
            try
            {
                return Ok(_assemblyservice.InsertAssembly(assembly));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AssemblyController/InsertAssembly");
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Abhay
        /// </summary>
        /// <param name="file"></param>
        /// <returns> Read Excel and Insert Bulk</returns>
        [HttpPost("InsertBulkAssembly")]
        public IActionResult InsertBulkAssembly(IFormFile file)
        {
            List<Assembly> assemblies = new List<Assembly>();
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
                            Assembly assembly = new Assembly();
                            if (worksheet.Cells[row, 1].Value != null)
                                assembly.AssemblyNo = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                            if (worksheet.Cells[row, 2].Value != null)
                                assembly.AssemblyName = worksheet.Cells[row, 2].Value.ToString().Trim();
                            if (worksheet.Cells[row, 3].Value != null)
                               assembly.District = worksheet.Cells[row, 3].Value.ToString().Trim();
                            if (worksheet.Cells[row, 4].Value != null)
                                assembly.State = worksheet.Cells[row, 4].Value.ToString().Trim();
                            assemblies.Add(assembly);
                        }
                    }
                }
                if (System.IO.File.Exists(filename))
                {
                    System.IO.File.Delete(filename);
                }
                return Ok(_assemblyservice.InsertBulkAssemblyList(assemblies));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AssemblyController/InsertBulkAssembly");
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// abhay
        /// </summary>
        /// <param name="assemblies"></param>
        /// <returns>InsertBulkAssemblyList</returns>
        [HttpPost("InsertBulkAssemblyList")]
        public IActionResult InsertBulkAssemblyList(List<Assembly> assemblies)
        {
            try
            {
               return Ok(_assemblyservice.InsertBulkAssemblyList(assemblies));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AssemblyController/InsertBulkAssemblyList");
                return BadRequest(ex);
            }
        }

        [HttpPost("FilterAssemblyList")]
        public IActionResult FilterAssemblyList(Table table)
        {
            try
            {
                return Ok(_assemblyservice.FilterAssemblyList(table));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AssemblyController/FilterAssemblyList");
                return BadRequest(ex);
            }
        }

        [HttpPost("DeleteAssemblybyId")]

        public IActionResult DeleteAssemblybyId(int Id)
        {
            try
            {
                return Ok(_assemblyservice.DeleteAssemblybyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AssemblyController/DeleteAssemblybyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAssemblybyDistrict")]
        public IActionResult GetAssemblybyDistrict(string district)
        {
            try
            {
                return Ok(_assemblyservice.GetAssemblyDistrictwise(district));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exceptuion", "AssemblyController/GetAssemblybyDistrict");
                return BadRequest(ex);
            }
        }

    }
}
