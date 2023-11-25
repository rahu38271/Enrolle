using CsvHelper;
using CsvHelper.Configuration;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ElectionAlerts.Controller
{
    [Route("api/Contact")]
    [ApiController]
    [Authorize]
    public class ContactController : ControllerBase
    {
        private IContactService _contactService;
        private IExceptionLogService _exceptionLogService;
        public ContactController(IContactService contactService,IExceptionLogService exceptionLogService)
        {
            _contactService = contactService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpGet]
        public IActionResult Get(int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_contactService.GetContacts(PageNo, NoofRow, SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/GetContact");
                return BadRequest(ex);
                
            }
          
        }

        [HttpGet("GetContactFile")]
        public IActionResult GetContactFile(int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ContactList.csv");
                var result = _contactService.GetContacts();
                if (result != null && result.Count() != 0)
                {
                    using (var writer = new StreamWriter(filepath))
                    using (var csv = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture)))
                    {
                        csv.WriteRecords(result);
                    }
                    if (System.IO.File.Exists(filepath))
                    {
                        string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ContactList.csv");
                        var provider = new FileExtensionContentTypeProvider();
                        if (!provider.TryGetContentType(Filepath, out var contentType))
                        {
                            contentType = "application/octet-stream";
                        }

                        var bytes = System.IO.File.ReadAllBytes(Filepath);
                        System.IO.File.Delete(Filepath);
                        return File(bytes, contentType, Path.GetFileName(Filepath));
                    }
                }
                return Ok("Error");
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/GetContact");
                return BadRequest(ex);

            }

        }

        [HttpPost("InsertSingleContact")]
        public IActionResult InsertSingleContact(Contact contact)
        {
            try
            {
                return Ok(_contactService.InsertSingleContact(contact));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/InsertSingleContact");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBulkContact")]
        public IActionResult InsertBulkContact(List<BulkContact> contact)
        {
            try
            {
                return Ok(_contactService.InsertBulkContact(contact));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/InsertBulkContact");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateSingleContact")]
        public IActionResult UpdateSingleContact(Contact contact)
           {
            try
            {
                return Ok(_contactService.UpdateSingleContact(contact));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/UpdateSingleContact");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteContactbyId")]
        public IActionResult DeleteContactbyId(int Id)
        {
            try
            {
                return Ok(_contactService.DeleteContactbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/DeleteContactbyId");
                return BadRequest(ex);
            }
        }

        [HttpPost("ImportExcelContact")]
        public IActionResult ImportExcelContact(IFormFile file)
        {
            string[] dateformat = { "dd-MM-yyyy", "yyyy-MM-dd HH:mm:ss", "MM/dd/yyyy hh:mm tt", "dd-MMM-yyyy h:mm tt", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm: ss", "dd-MM-yyyy HH:mm", "yyyy/MM/dd", "dddd, MMMM d, yyyy", "MM-dd-yy", "yyyy-MM-ddTHH:mm:ssZ", "dd MMMM yyyy", "MMM dd, yyyy", "MM/yyyy" };
            List<BulkContact> contacts = new List<BulkContact>();
            if (file == null || file.Length <= 0)
            {
                return BadRequest("formfile is empty");
            }

            if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Not Support file extension");
            }

            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload", file.FileName);
            using (FileStream fs = new FileStream(filepath, FileMode.Create))
            {
                file.CopyTo(fs);
            }
            try
            {
                using (var package = new ExcelPackage(new FileInfo(filepath)))
                {
                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowCount = worksheet.Dimension.Rows;

                    for (int row = 2; row <= rowCount; row++)
                    {
                        BulkContact contact = new BulkContact();
                        if (worksheet.Cells[row, 1].Value != null)
                            contact.FullName = worksheet.Cells[row, 1].Value.ToString().Trim();
                        if (worksheet.Cells[row, 7].Value != null)
                            contact.Address = worksheet.Cells[row, 7].Value.ToString().Trim();
                        if(worksheet.Cells[row, 3].Value != null)
                        {
                            var valDate = worksheet.Cells[row, 3].Value;
                            var birthdate = valDate.ToString().Split(' ');

                            const DateTimeStyles style = DateTimeStyles.RoundtripKind;
                            DateTime dt;
                            var result = DateTime.TryParseExact(birthdate[0].ToString(), dateformat, CultureInfo.InvariantCulture, style, out dt);
                            if (result)
                            {
                                contact.BirthDate = dt.ToString("yyyy-MM-dd"); ;
                            }
                        }
                        if (worksheet.Cells[row, 4].Value != null)
                        {
                            var valDate = worksheet.Cells[row, 4].Value;
                            var birthdate = valDate.ToString().Split(' ');

                            const DateTimeStyles style = DateTimeStyles.RoundtripKind;
                            DateTime dt;
                            var result = DateTime.TryParseExact(birthdate[0].ToString(), dateformat, CultureInfo.InvariantCulture, style, out dt);
                            if (result)
                            {
                                contact.Anniversary = dt.ToString("yyyy-MM-dd"); ;
                            }
                        }
                        if (worksheet.Cells[row, 5].Value != null)
                        {
                            string number = worksheet.Cells[row, 5].Value.ToString().Trim().CheckLenght(15);
                            contact.MobileNo = number.convert_to_number();
                        }
                             
                        if (worksheet.Cells[row, 6].Value != null)
                            contact.AlternativeMobileNo = worksheet.Cells[row, 6].Value.ToString().Trim().CheckLenght(15);
                        if (worksheet.Cells[row, 2].Value != null)
                            contact.VilageName = worksheet.Cells[row, 2].Value.ToString().Trim();
                        contacts.Add(contact);
                    }

                }
                if (System.IO.File.Exists(filepath))
                {
                    System.IO.File.Delete(filepath);
                }
                return Ok(_contactService.InsertBulkContact(contacts));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ContactController/ImportExcelContact");
                return BadRequest(ex);
            }
        }
    }
}
