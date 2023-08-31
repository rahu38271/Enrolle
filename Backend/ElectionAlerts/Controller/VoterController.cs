using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VoterController : ControllerBase
    {
        private readonly IVoterService _voterService;
        private readonly IExceptionLogService _exceptionLogService;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public VoterController(IVoterService voterService, IExceptionLogService exceptionLogService, IWebHostEnvironment hostingEnvironment)
        {
            _voterService = voterService;
            _exceptionLogService = exceptionLogService;
            _hostingEnvironment = hostingEnvironment;
        }
        
        [HttpPost("FilterVoterbyCondition")]           
        public IActionResult FilterVoterbyCondition(VoterTable table)
        {
            try
            {
                return Ok(_voterService.FilterVoterbyCondition(table));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/FilterVoterbyCondition");
                return BadRequest(ex);
            }
        }
       
        /// <summary>
        /// Abhay 
        /// </summary>
        /// <param name="table"></param>
        /// <returns>search </returns>
        [HttpPost("FilterVoterList")]
        public IActionResult FilterVoterList(VoterTable table)
        {
            try
            {
                return Ok(_voterService.FilterVoterList(table));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/FilterVoterList");
                return BadRequest(ex);
            }
        }


        [HttpPost("InsertVoter")]
        public IActionResult InsertVoter(Voter voter)
        {
            try
            {
                return Ok(_voterService.CreateVoter(voter));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertVoter");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllVoter")]
        public IActionResult GetAllVoter(int UserId,int RoleId, int PageNo, int NoofRow,string Language,string SearchText)
        {
            try
            {
                return Ok(_voterService.GetAllVoter(UserId, RoleId,PageNo,NoofRow, Language, SearchText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetAllVoter");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpadateVoter")]
        public IActionResult UpadateVoter(Voter voter)
        {
            try
            {
                return Ok(_voterService.UpadateVoter(voter));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpadateVoter");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertBulkVoter")]
        public IActionResult InsertBulkVoter(List<VoterBulk> voters)
        {
            try
            {
                voters.ForEach(x => x.CreatedDate = DateTime.Now.ToString("yyyy-MM-dd"));
                return Ok(_voterService.InsertBulkVoter(voters));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertBulkVoter");
                return BadRequest(ex);
            }
        }


        [HttpPost("InsertBulkMobile")]
        public IActionResult InsertBulkMobile(List<VoterMobileBulk> voterMobileBulks)
        {
            try
            {
                return Ok(_voterService.InsertBulkMobile(voterMobileBulks));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertBulkMobile");
                return BadRequest(ex);
            }
        }
        [HttpGet("GetVoterbyId")]
        public IActionResult GetVoterbyId(int id, string Language)
        {
            try
            {
                return Ok(_voterService.GetVoterDetailbyId(id,Language));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterbyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVoterbyRelation")]
        public IActionResult GetVoterbyRelation(int Id, int UserId,int RoleId,int PageNo,int NoofRow, string Language)
        {
            try
            {
                return Ok(_voterService.GetVoterbyRelation(Id, UserId, RoleId,PageNo,NoofRow,Language));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterbyRelation");
                return BadRequest(ex);
            }
        }


        [HttpPost("InserMobileExcel")]
        [RequestFormLimits(MultipartBodyLengthLimit = 500000000)]
        public IActionResult InserMobileExcel(IFormFile file)
        {
            List<VoterMobileBulk> voterMobiles = new List<VoterMobileBulk>();
            string[] dateformat = { "dd-MM-yyyy","yyyy-MM-dd HH:mm:ss", "MM/dd/yyyy hh:mm tt", "dd-MMM-yyyy h:mm tt", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm: ss", "dd-MM-yyyy HH:mm", "yyyy/MM/dd", "dddd, MMMM d, yyyy", "MM-dd-yy", "yyyy-MM-ddTHH:mm:ssZ", "dd MMMM yyyy", "MMM dd, yyyy", "MM/yyyy" };
            if (file == null || file.Length <= 0)
                {
                    return BadRequest("formfile is empty");
                }

                if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Not Support file extension");
                }
                try
                {
                    var filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload", file.FileName);

                     if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload")))
                         Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload"));

                    using (FileStream fs = new FileStream(filepath, FileMode.Create))
                    {
                        file.CopyTo(fs);
                    }
                using (var package = new ExcelPackage(new FileInfo(filepath)))
                {
                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowCount = worksheet.Dimension.Rows;

                    for (int row = 2; row <= rowCount; row++)
                    {
                        VoterMobileBulk voterMobile = new VoterMobileBulk();
                        if (worksheet.Cells[row, 1].Value != null)
                            voterMobile.FullName = worksheet.Cells[row, 1].Value.ToString().Trim();
                        if (worksheet.Cells[row, 2].Value != null)
                            voterMobile.MobileNo = worksheet.Cells[row, 2].Value.ToString().CheckLenght(15);
                        if (worksheet.Cells[row, 3].Value != null)
                        {
                            var valDate = worksheet.Cells[row, 3].Value.ToString().Split(' ');
                            const DateTimeStyles style = DateTimeStyles.RoundtripKind;
                            DateTime dt;
                            var result = DateTime.TryParseExact(valDate[0].ToString(), dateformat, CultureInfo.InvariantCulture, style, out dt);
                            if (result)
                            {
                                voterMobile.BirthDate = dt.ToString("yyyy-MM-dd");
                            }
                        }
                        if (worksheet.Cells[row, 5].Value != null)
                            voterMobile.LocalAddress = worksheet.Cells[row, 5].Value.ToString().Trim();
                        if (worksheet.Cells[row, 6].Value != null)
                            voterMobile.PermanentAddress = worksheet.Cells[row, 6].Value.ToString().Trim();
                        if (worksheet.Cells[row, 7].Value != null)
                            voterMobile.AltMobileNo = worksheet.Cells[row, 7].Value.ToString().CheckLenght(15);
                        if (worksheet.Cells[row, 8].Value != null)
                            voterMobile.Email = worksheet.Cells[row, 8].Value.ToString().Trim().CheckLenght(100);
                        if (worksheet.Cells[row, 11].Value != null)
                        {
                            var valDate = worksheet.Cells[row, 11].Value.ToString().Split(' ');
                            const DateTimeStyles style = DateTimeStyles.RoundtripKind;
                            DateTime dt;
                            var result = DateTime.TryParseExact(valDate[0].ToString(), dateformat, CultureInfo.InvariantCulture, style, out dt);
                            if (result)
                            {
                                voterMobile.BirthDate = dt.ToString("yyyy-MM-dd");
                            }
                        }
                        voterMobile.CreatedDate = DateTime.Now.ToString("yyyy-MM-dd");
                        voterMobiles.Add(voterMobile);
                    }
                }
                if (System.IO.File.Exists(filepath))
                {
                    System.IO.File.Delete(filepath);
                }
                return Ok(_voterService.InsertBulkMobile(voterMobiles));           
            }
            catch (Exception ex)
            {
               _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InserMobileExcel");
                return BadRequest(ex);
            }
        }

        [HttpPost("InserVoterExcel")]
        [RequestFormLimits(MultipartBodyLengthLimit = 500000000)]
        public IActionResult InserVoterExcel(IFormFile file)
        {
            List<VoterBulk> voters = new List<VoterBulk>();
            string[] dateformat = {"yyyy-MM-dd HH:mm:ss","MM/dd/yyyy hh:mm tt","dd-MMM-yyyy h:mm tt","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm: ss", "dd-MM-yyyy HH:mm", "yyyy/MM/dd", "dddd, MMMM d, yyyy", "MM-dd-yy", "yyyy-MM-ddTHH:mm:ssZ", "dd MMMM yyyy", "MMM dd, yyyy", "MM/yyyy" };
            if (file == null || file.Length <= 0)
            {
                return BadRequest("formfile is empty");
            }

            if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Not Support file extension");
            }
          
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload",file.FileName);

            if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload")))
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Upload"));


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
                        VoterBulk voter1 = new VoterBulk();
                        if (worksheet.Cells[row, 1].Value != null)
                            voter1.AssemblyNo = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                        if (worksheet.Cells[row, 2].Value != null)
                            voter1.PartNo = int.Parse(worksheet.Cells[row, 2].Value.ToString().Trim());
                        //if (worksheet.Cells[row, 4].Value != null)
                        //    voter1.SrNo = int.Parse(worksheet.Cells[row, 4].Value.ToString().Trim());

                        if ((worksheet.Cells[row, 6].Value != null) && (worksheet.Cells[row, 7].Value != null))
                            voter1.FullName = worksheet.Cells[row, 6].Value.ToString().Trim() + " " + worksheet.Cells[row, 7].Value.ToString().Trim();

                        if ((worksheet.Cells[row, 6].Value != null) && (worksheet.Cells[row, 7].Value == null))
                            voter1.FullName = worksheet.Cells[row, 6].Value.ToString().Trim();

                        if ((worksheet.Cells[row, 6].Value == null) && (worksheet.Cells[row, 7].Value != null))
                            voter1.FullName = worksheet.Cells[row, 7].Value.ToString().Trim();

                        if (worksheet.Cells[row, 11].Value != null)
                            voter1.Gender = worksheet.Cells[row, 11].Value.ToString().Trim();

                        if (worksheet.Cells[row, 12].Value != null)
                            voter1.Age = int.Parse(worksheet.Cells[row, 12].Value.ToString().Trim());

                        if (worksheet.Cells[row, 13].Value != null)
                            voter1.Address = worksheet.Cells[row, 13].Value.ToString().Trim();

                        if (worksheet.Cells[row, 20].Value != null)
                        {
                            var valDate = worksheet.Cells[row, 20].Value.ToString().Split(' ');

                            const DateTimeStyles style = DateTimeStyles.RoundtripKind;
                            DateTime dt;
                            var result = DateTime.TryParseExact(valDate[0].ToString(), dateformat, CultureInfo.InvariantCulture, style, out dt);
                            if (result)
                            {
                                voter1.BirthDate = dt.ToString("yyyy-MM-dd");
                            }
                        }
                        if (worksheet.Cells[row, 25].Value != null)
                            voter1.Village = worksheet.Cells[row, 25].Value.ToString().Trim();

                        if (worksheet.Cells[row, 5].Value != null)
                            voter1.VotingCardNo = worksheet.Cells[row, 5].Value.ToString().Trim();

                        if (worksheet.Cells[row, 19].Value != null)
                            voter1.MobileNo = worksheet.Cells[row, 19].Value.ToString().CheckLenght(15);

                        if ((worksheet.Cells[row, 15].Value != null) && (worksheet.Cells[row, 16].Value != null))
                            voter1.FullName_KR = worksheet.Cells[row, 15].Value.ToString().Trim() + " " + worksheet.Cells[row, 16].Value.ToString().Trim();

                        if ((worksheet.Cells[row, 15].Value != null) && (worksheet.Cells[row, 16].Value == null))
                            voter1.FullName_KR = worksheet.Cells[row, 15].Value.ToString().Trim();

                        if ((worksheet.Cells[row, 15].Value == null) && (worksheet.Cells[row, 16].Value != null))
                            voter1.FullName_KR = worksheet.Cells[row, 16].Value.ToString().Trim();

                        if (worksheet.Cells[row, 23].Value != null)
                            voter1.Assembly = worksheet.Cells[row, 23].Value.ToString().Trim();

                        if (worksheet.Cells[row, 24].Value != null)
                            voter1.AssemblyName_KR = worksheet.Cells[row, 24].Value.ToString().Trim();

                        if (worksheet.Cells[row, 26].Value != null)
                            voter1.Village_KR = worksheet.Cells[row, 26].Value.ToString().Trim();


                        if ((worksheet.Cells[row, 15].Value != null) && (worksheet.Cells[row, 16].Value != null))
                            voter1.FullName_HN = worksheet.Cells[row, 15].Value.ToString().Trim() + " " + worksheet.Cells[row, 16].Value.ToString().Trim();

                        if ((worksheet.Cells[row, 15].Value != null) && (worksheet.Cells[row, 16].Value == null))
                            voter1.FullName_HN = worksheet.Cells[row, 15].Value.ToString().Trim();

                        if ((worksheet.Cells[row, 15].Value == null) && (worksheet.Cells[row, 16].Value != null))
                            voter1.FullName_HN = worksheet.Cells[row, 16].Value.ToString().Trim();

                        if (worksheet.Cells[row, 26].Value != null)
                            voter1.Village_HN = worksheet.Cells[row, 26].Value.ToString().Trim();


                        if (worksheet.Cells[row, 24].Value != null)
                            voter1.AssemblyName_HN = worksheet.Cells[row, 24].Value.ToString().Trim();

                        voter1.CreatedDate = DateTime.Now.ToString("yyyy-MM-dd");

                        voters.Add(voter1);
                    }

                    if (System.IO.File.Exists(filepath))
                    {
                        System.IO.File.Delete(filepath);
                    }

                    return Ok(_voterService.InsertBulkVoter(voters));
                }
            }
            catch (Exception ex)
            {
                //Console.WriteLine(voters.Count);
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InserVoterExcel");
                return BadRequest(ex);
            }

        }


        [HttpGet("GetVoterbyRole")]
        public IActionResult GetVoterbyRole(VoterSuperDto superDto)
        {
            try
            {
                return Ok(_voterService.GetVoterbyRole(superDto));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterbyRole");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateMobileVoter")]
        public  IActionResult UpdateMobileVoter(int Id,string Mobile)
        {
            try
            {
                return Ok(_voterService.UpadateMobileVoter(Id, Mobile));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateMobileVoter");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateAltMobileVoter")]

        public IActionResult UpdateAltMobileVoter(int Id,string AlternateMobileNo)
        {
            try
            {
                return Ok(_voterService.UpadateAltMobileVoter(Id, AlternateMobileNo));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateAltMobileVoter");
                return BadRequest(ex);
            }
        }
        [HttpPost("UpdateAddressVoter")]
        public IActionResult UpdateAddressVoter(int Id,string Address)
        {
            try
            {
                return Ok(_voterService.UpdateAddressVoter(Id, Address));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateAddressVoter");
                return BadRequest(ex);
            }
        }

        [HttpPost("FilterColoumnCount")]
        public IActionResult FilterColoumnCount(VoterTable table)
        {
            try
            {
                return Ok(_voterService.FilterColoumnCount(table));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/FilterColoumnCount");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVoterCountbyLastName")]
        public IActionResult GetVoterCountbyLastName(int userid,int roleid,int pageno, int noofrow, string Language,string SearchText)
        {
            try
            {
                return Ok(_voterService.GetVoterCountbyLastName(userid,roleid, pageno, noofrow,Language, SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterCountbyLastName");
                return BadRequest(ex);
            }
        }

        //[HttpPost("InsertUpdateMemberDetail")]
        //public IActionResult InsertMemberDetail(MemberDetail memberDetail)
        //{
        //    try
        //    {
        //        return Ok(_voterService.InsertMemberDetail(memberDetail));
        //    }
        //    catch(Exception ex)
        //    {
        //        _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertMemberDetail");
        //        return BadRequest(ex);
        //    }
        //}

        //[HttpPost("UpdateMemberDetail")]
        //public IActionResult UpdateMemberDetail(MemberDetail memberDetail)
        //{
        //    try
        //    {
        //        return Ok(_voterService.UpdateMemberDetail(memberDetail));
        //    }
        //    catch(Exception ex)
        //    {
        //        _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateMemberDetail");
        //        return BadRequest(ex);
        //    }
        //}

        [HttpPost("UpdateStarVoter")]
        public IActionResult UpdateStarVoter(int Id,string YesNo)
        {
            try
            {
                return Ok(_voterService.UpdateStarVoter(Id,YesNo));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateStarVoter");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateVoterInclination")]
        public IActionResult UpdateVoterInclination(int Id,string Colour)
        {
            try
            {
                return Ok(_voterService.UpdateVoterInclination(Id, Colour));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateVoterInclination");
                return BadRequest(ex); 
            }
        }

        [HttpGet("GetMemberDetail")]
        public IActionResult GetMemberDetail(int VoterId)
        {
            try
            {
                return Ok(_voterService.GetMemberDetailsbyVId(VoterId));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetMemberDetail");
                return BadRequest(ex);
            }
        }

        [HttpGet("VoterDetailsbyLastName")]
        public IActionResult VoterDetailsbyLastName(string Name,int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return Ok(_voterService.VoterDetailsbyLastName(Name, UserId, RoleId,PageNo,NoofRow,Language,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/VoterDetailsbyLastName");
                return BadRequest(ex);
            }
        }

        [HttpGet("VoterDetailsbyColumn")]
        public IActionResult VoterDetailsbyColumn(string ColoumnName, string ColoumnValue,int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return Ok(_voterService.VoterDetailsbyColumn(ColoumnName, ColoumnValue, UserId, RoleId,PageNo,NoofRow,Language,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/VoterDetailsbyColumn");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetDistinctPartNumber")]
        public IActionResult GetDistinctPartNumber(int Role, int UserId)
        {
            try
            {
                var result = _voterService.GetDistinctPartNo(Role, UserId);
                //var result2 = result.Select(x => x.PartNo).Distinct().Select(x=>x);
                var result2 = result.GroupBy(p => p.PartNo).Select(g => g.First()).ToList();
                return Ok(result2);
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetDistinctPartNumber");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVoterbyUserId")]
        public IActionResult GetVoterbyUserId(int userid,int roleid, int pageno, int noofrow, string Language)
        {
            try
            {
                return Ok(_voterService.GetVoterByUserId(userid, roleid,pageno,noofrow,Language));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterbyUserId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVoterBetweenAge")]
        public IActionResult GetVoterBetweenAge(int age1,int age2,string gender,int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return Ok(_voterService.GetVoterAgeBetween(age1, age2, gender, UserId, RoleId,PageNo,NoofRow,Language,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterBetweenAge");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetTotalVoterCount")]
        public IActionResult GetTotalVoterCount(int userid, int roleid)
        {
            try
            {
                return Ok(_voterService.GetTotalVoterCount(userid,roleid));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetTotalVoterCount");
                return BadRequest(ex);
            }
        }

        [HttpGet("VoterwithMobileNo")]
        public IActionResult VoterwithMobileNo(int UserId,int RoleId, int PageNo, int NoofRow, string Language,string SearchText)
        {
            try
            {
                return Ok(_voterService.VoterwithMobileNo(UserId,RoleId,PageNo,NoofRow,Language,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/VoterwithMobileNo");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllMobile")]
        public IActionResult GetAllMobile()
        {
            try
            {
                return Ok(_voterService.GetAllMobile());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetAllMobile");
                return BadRequest(ex);
            }
        }

        [HttpGet("VoterCountbyBooth")]
        public IActionResult VoterCountbyBooth(int userid,int roleid)
        {
            try
            {
                return Ok(_voterService.GetVoterbybooth(userid, roleid));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/VoterCountbyBooth");
                return BadRequest(ex);
            }
        }

        [HttpPost("VoterSurvey")]
        public IActionResult VoterSurvey(VoterSurvey voterSurvey)
        {
            try
            {
                return Ok(_voterService.InsertSurveyDetails(voterSurvey));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/VoterSurvey");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVoterInclination")]
        public IActionResult GetVoterInclination(int UserId,int RoleId)
        {
            try
            {
                return Ok(_voterService.VoterInclination(UserId, RoleId));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterInclination");
                return BadRequest(ex);
            }
        }

        [HttpPost("AdvancedSearchVoter")]
        public IActionResult AdvancedSearchVoter(AdvanceSearchDTO searchDTO)
        {
            try
            {
                return Ok(_voterService.AdvancedSearch(searchDTO));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/AdvancedSearchVoter");
                return BadRequest(ex);
            }
        }

            [HttpGet("GetVoterInclinationUserId")]
            public IActionResult GetVoterInclinationUserId(string Inclination,int UserId,int RoleId, int PageNo, int NoofRow, string Language, string SearchText)
            {
                try
                {
                    return Ok(_voterService.GetVoterInclinationUserId(Inclination, UserId, RoleId,PageNo,NoofRow,Language,SearchText));
                }
                catch (Exception ex)
                {
                    _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterInclinationUserId");
                    return BadRequest(ex);
                }
            }

        [HttpGet("GetStarVoterbyUserId")]
        public IActionResult GetStarVoterbyUserId(int userid, int roleid, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return Ok(_voterService.GetStarVoterbyUserId(userid, roleid,PageNo,NoofRow,Language,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetStarVoterbyUserId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetBoothNamebyUserId")]

        public IActionResult GetBoothNamebyUserId(int userid,int roleid,int PageNo, int NoofRow)
        {
            try
            {
                return Ok(_voterService.GetBoothNamebyUserId(userid, roleid,PageNo,NoofRow));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetBoothNamebyUserId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVoterbyPartNo")]
        public IActionResult GetVoterbyPartNo(int partno, int PageNo, int NoofRow, string Language, string SearchText)
        {
            try
            {
                return Ok(_voterService.GetVoterByPartNo(partno,PageNo,NoofRow,Language,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterbyPartNo");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateIsVoted")]
        public IActionResult UpdateIsVoted(int Id,string YesNo)
        {
            try
            {
                return Ok(_voterService.UpdateIsVoted(Id, YesNo));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateIsVoted");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateIsAliveVoter")]
        public IActionResult UpdateIsAliveVoter(int Id,string YesNo)
        {
            try
            {
                return Ok(_voterService.UpdateIsAliveVoter(Id, YesNo));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/UpdateIsAliveVoter");
                return BadRequest(ex);
            }
        }


        [HttpGet("GetColoumncount")]
        public IActionResult GetColoumncount(int UserId, int RoleId, string Coloumn)
        {
            try
            {
                return Ok(_voterService.GetVoterCountbyColoumn(UserId,RoleId,Coloumn));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetColoumncount");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteVoterbyId")]
        public IActionResult DeleteVoterbyId(int Id)
        {
            try
            {
                return Ok(_voterService.DeleteVoterbyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/DeleteVoterbyId");
                return BadRequest(ex);
            }
        }

        [HttpPost("UpdateColoumnTBLVoter")]
        public IActionResult UpdateColoumnTBLVoter(int Id, string ColoumnName, string ColoumnValue)
        {
            try
            {
                return Ok(_voterService.UpdateColoumnTbl(Id, ColoumnName, ColoumnValue));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/DeleteVoterbyId");
                return BadRequest(ex);
            }
        }

        [HttpPost("AddCasteName")]
        public  IActionResult AddCasteName(IFormFile file)
        {
            try
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Upload", file.FileName);
                using (var stream = System.IO.File.Create(filePath))
                {
                    // The formFile is the method parameter which type is IFormFile
                    // Saves the files to the local file system using a file name generated by the app.
                     file.CopyTo(stream);
                }
                List<Caste> castes = new List<Caste>();
                using (var package = new ExcelPackage(new FileInfo(filePath)))
                {
                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowCount = worksheet.Dimension.Rows;
                   
                    for (int row = 2; row <= rowCount; row++)
                    {
                        Caste caste = new Caste();
                        if (worksheet.Cells[row, 2].Value != null)
                            caste.Caste_Eng = worksheet.Cells[row, 2].Value.ToString().Trim();
                        if (worksheet.Cells[row, 1].Value != null)
                            caste.Caste_Reg = worksheet.Cells[row, 1].Value.ToString().Trim();
                        if (worksheet.Cells[row, 3].Value != null)
                            caste.Caste_Hin = worksheet.Cells[row, 3].Value.ToString().Trim();
                        castes.Add(caste);
                    }
                }
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                return Ok(_voterService.AddCastName(castes));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/AddCasteName");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllCasteName")]
        public IActionResult GetAllCasteName(string Language)
        {
            try
            {
                return Ok(_voterService.GetAllCaste(Language));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetAllCasteName");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertProfession")]

        public IActionResult InsertProfession(string ProfessionName)
        {
            try
            {
                return Ok(_voterService.InsertProfession(ProfessionName));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertProfession");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllProfession")]
        public IActionResult GetAllProfession()
        {
            try
            {
                return Ok(_voterService.GetAllProfession());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetAllProfession");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllLandingPage")]
        public IActionResult GetAllLandingPage(int UserId)
        {
            try
            {
                var result = _voterService.GetAllLandingPage(UserId);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.ImagePath))
                    {
                        string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "LandingPage",result.ImageName);
                        if (System.IO.File.Exists(Filepath))
                        {
                            var provider = new FileExtensionContentTypeProvider();
                            if (!provider.TryGetContentType(Filepath, out var contentType))
                            {
                                contentType = "application/octet-stream";
                            }

                            var bytes = System.IO.File.ReadAllBytes(Filepath);
                            return File(bytes, contentType, Path.GetFileName(Filepath));
                        }
                        else
                            return Ok("File Not Present");
                    }
                }
                return Ok("File Not Present");
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetAllLandingPage");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertLandingPage")]
        public IActionResult InsertLandingPage([FromForm] string LandingPageImage, [FromForm] IFormFile file)
        {
            try
            {
                LandingPage landingPage = JsonConvert.DeserializeObject<LandingPage>(LandingPageImage);
                var result=_voterService.InsertLandingPage(landingPage.ImageName, landingPage.ImagePath,landingPage.UserId);
                if(file != null && result == 1)
                {
                    string PathName = Path.Combine(Directory.GetCurrentDirectory(), "Image", "LandingPage");
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
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertLandingPage");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertUpdateWhatUpContent")]
        public IActionResult InsertUpdateWhatUpContent([FromForm] string WhatUpContent, [FromForm] IFormFile file)
        {
            try
            {
                WhatAppContent whatAppContent = JsonConvert.DeserializeObject<WhatAppContent>(WhatUpContent);
                var result = _voterService.InsertUpdateWhatUpContent(whatAppContent);
                if (file != null && result == 1)
                {
                    string PathName = Path.Combine(Directory.GetCurrentDirectory(), "Image", "WhatAppImage");
                    if (!Directory.Exists(PathName))
                        Directory.CreateDirectory(PathName);
                    string FullPath = Path.Combine(PathName, file.FileName);
                    //using (var stream = new FileStream(FullPath, FileMode.OpenOrCreate, FileAccess.ReadWrite))
                    //{
                    //    file.CopyTo(stream);
                    //}
                    using (var stream = new FileStream(FullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Ok(result);
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertUpdateWhatUpContent");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetWhatAppContentbyUserId")]
        public IActionResult GetWhatAppContentbyUserId(int UserId)
        {
            try
            {
                List<WhatAppContent> whatAppContents = new List<WhatAppContent>();
                var result = _voterService.GetWhatAppContentbyUserId(UserId);

                if(result!=null)
                     whatAppContents.Add(result);

                return Ok(whatAppContents);
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetWhatAppContentbyUserId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetMobileMatch")]
        public IActionResult GetMobileMatch(string VoterName)
        {
            try
            {
                return Ok(_voterService.GetMobileMatch(VoterName));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetWhatAppContentbyUserId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVoterOldAddress")]

        public IActionResult GetVoterOldAddress(int userid, int RoleId, int PageNo, int NoofRow, string Language, string SearcText)
        {
            try
            {
                return Ok(_voterService.GetVoterOldAddress(userid, RoleId, PageNo, NoofRow, Language, SearcText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterOldAddress");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllVoterSurvey")]
        public IActionResult GetAllVoterSurvey(int userid, int RoleId, int PageNo, int NoofRow, string Language, string SearcText)
        {
            try
            {
                return Ok(_voterService.GetAllVoterSurvey(userid, RoleId,PageNo, NoofRow, Language, SearcText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetAllVoterSurvey");
                return BadRequest(ex);
            }
        }

        [HttpGet("MatchMobileDetails")]

        public IActionResult MatchMobileDetails(int userid, int RoleId, int PageNo, int NoofRow)
        {
            try
            {
                return Ok(_voterService.MatchMobileDetails(userid, RoleId, PageNo, NoofRow));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/MatchMobileDetails");
                return BadRequest(ex);
            }
        }


        [HttpGet("GetWhatAppImagebyUserId")]
        public IActionResult GetWhatAppImagebyUserId(int UserId)
        {
            try
            {
                var result = _voterService.GetWhatAppContentbyUserId(UserId);
                if (result != null)
                {
                    if (!string.IsNullOrEmpty(result.FileName))
                    {
                        string Filepath = Path.Combine(Directory.GetCurrentDirectory(), "Image", "WhatAppImage", result.FileName);
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
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetWhatAppImagebyUserId");
                return BadRequest(ex);
            }
        }
    }

    public static class Extensions
    {     
        public static string CheckLenght(this String str, int num)
        {
            if (!String.IsNullOrEmpty(str))
            {
                if (str.Length < num)
                {
                    return str;
                }
                else
                    return null;
            }
            else
                return str;
        }
    }
}
