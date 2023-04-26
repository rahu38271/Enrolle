using ElectionAlerts.Dto;
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
using System.Threading;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
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
        public IActionResult GetAllVoter(int UserId,int RoleId, int PageNo, int NoofRow,string Language)
        {
            try
            {
                return Ok(_voterService.GetAllVoter(UserId, RoleId,PageNo,NoofRow, Language));
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
        public IActionResult InsertBulkVoter(List<Voter> voters)
        {
            try
            {
                return Ok(_voterService.InsertBulkVoter(voters));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InsertBulkVoter");
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
        public IActionResult InserMobileExcel(IFormFile file)
        {
            List<Mobile> mobiles = new List<Mobile>();
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
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                //using (var package = new ExcelPackage(stream))
                using (var package = new ExcelPackage(new FileInfo(file.FileName)))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowCount = worksheet.Dimension.Rows;

                    for (int row = 2; row <= rowCount; row++)
                    {
                        Mobile mobileData = new Mobile();
                        if (worksheet.Cells[row, 1].Value != null)
                            mobileData.MobileNo = worksheet.Cells[row, 1].Value.ToString().Trim();
                        if (worksheet.Cells[row, 2].Value != null)
                            mobileData.CName = worksheet.Cells[row, 2].Value.ToString().Trim();
                        if (worksheet.Cells[row, 5].Value != null)
                            mobileData.Address = worksheet.Cells[row, 5].Value.ToString().Trim();
                        if (worksheet.Cells[row, 4].Value != null)
                            mobileData.MName = worksheet.Cells[row, 4].Value.ToString().Trim();

                        mobileData.CreatedDate = DateTime.Now;
                        mobiles.Add(mobileData);
                    }

                    return Ok(_voterService.InsertBulkMobile(mobiles));
                }
            }
            catch (Exception ex)
            {
               _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/InserMobileExcel");
                return BadRequest(ex);
            }
        }

        [HttpPost("InserVoterExcel")]
        public  IActionResult InserVoterExcel(IFormFile file)
        {
            List<Voter> voters = new List<Voter>();
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
                string fullpath = Directory.GetCurrentDirectory();
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
                //using (var stream = new MemoryStream())
                //{
                //    file.CopyTo(stream);
                //}
                    
                //using (var package = new ExcelPackage(stream))
                if (file.FileName.Contains("Kannada"))
                {
                    using (var package = new ExcelPackage(new FileInfo(filename)))
                    {
                        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++)
                        {
                            Voter voter1 = new Voter();
                            if (worksheet.Cells[row, 1].Value != null)
                                voter1.AssemblyNo = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                            if (worksheet.Cells[row, 2].Value != null)
                                voter1.PartNo = int.Parse(worksheet.Cells[row, 2].Value.ToString().Trim());
                            if (worksheet.Cells[row, 4].Value != null)
                                voter1.SrNo = int.Parse(worksheet.Cells[row, 4].Value.ToString().Trim());

                            if ((worksheet.Cells[row, 8].Value != null) && (worksheet.Cells[row, 13].Value != null))
                                voter1.FullName = worksheet.Cells[row, 8].Value.ToString().Trim() + " " + worksheet.Cells[row, 13].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 8].Value != null) && (worksheet.Cells[row, 13].Value == null))
                                voter1.FullName = worksheet.Cells[row, 8].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 8].Value == null) && (worksheet.Cells[row, 13].Value != null))
                                voter1.FullName = worksheet.Cells[row, 13].Value.ToString().Trim();

                            if (worksheet.Cells[row, 17].Value != null)
                                voter1.Gender = worksheet.Cells[row, 17].Value.ToString().Trim();
                            if (worksheet.Cells[row, 18].Value != null)
                                voter1.Age = int.Parse(worksheet.Cells[row, 18].Value.ToString().Trim());
                            if (worksheet.Cells[row, 27].Value != null)
                                voter1.Village = worksheet.Cells[row, 27].Value.ToString().Trim();
                            if (worksheet.Cells[row, 7].Value != null)
                                voter1.VotingCardNo = worksheet.Cells[row, 7].Value.ToString().Trim();

                            if (worksheet.Cells[row, 20].Value != null)
                                voter1.MobileNo = worksheet.Cells[row, 20].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 10].Value != null) && (worksheet.Cells[row, 15].Value != null))
                                voter1.FullName_KR = worksheet.Cells[row, 10].Value.ToString().Trim() + " " + worksheet.Cells[row, 15].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 10].Value != null) && (worksheet.Cells[row, 15].Value == null))
                                voter1.FullName_KR = worksheet.Cells[row, 10].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 10].Value == null) && (worksheet.Cells[row, 15].Value != null))
                                voter1.FullName_KR = worksheet.Cells[row, 15].Value.ToString().Trim();

                            if (worksheet.Cells[row, 21].Value != null)
                                voter1.Assembly = worksheet.Cells[row, 21].Value.ToString().Trim();

                            if (worksheet.Cells[row, 22].Value != null)
                                voter1.AssemblyName_KR = worksheet.Cells[row, 22].Value.ToString().Trim();

                            if (worksheet.Cells[row, 28].Value != null)
                                voter1.Village_KR = worksheet.Cells[row, 28].Value.ToString().Trim();


                            if ((worksheet.Cells[row, 35].Value != null) && (worksheet.Cells[row, 36].Value != null))
                                voter1.FullName_HN = worksheet.Cells[row,35].Value.ToString().Trim() + " " + worksheet.Cells[row, 36].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 35].Value != null) && (worksheet.Cells[row, 36].Value == null))
                                voter1.FullName_HN = worksheet.Cells[row, 35].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 35].Value == null) && (worksheet.Cells[row, 36].Value != null))
                                voter1.FullName_HN = worksheet.Cells[row, 36].Value.ToString().Trim();

                            if (worksheet.Cells[row, 37].Value != null)
                                voter1.Village_HN = worksheet.Cells[row, 37].Value.ToString().Trim();
                            voter1.AssemblyName_HN = "मुदबिद्री";
                            voter1.CreatedDate = DateTime.Now;

                            voters.Add(voter1);
                        }
                    }
                }
                if (file.FileName.Contains("Marathi"))
                {
                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                    using (var package = new ExcelPackage(new FileInfo(filename)))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++)
                        {
                            Voter voter1 = new Voter();
                            if (worksheet.Cells[row, 1].Value != null)
                                voter1.AssemblyNo = int.Parse(worksheet.Cells[row, 1].Value.ToString().Trim());
                            if (worksheet.Cells[row, 2].Value != null)
                                voter1.PartNo = int.Parse(worksheet.Cells[row, 2].Value.ToString().Trim());

                            if ((worksheet.Cells[row, 9].Value != null) && (worksheet.Cells[row, 10].Value != null))
                                voter1.FullName = worksheet.Cells[row, 9].Value.ToString().Trim() + " " + worksheet.Cells[row, 10].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 9].Value != null) && (worksheet.Cells[row, 10].Value == null))
                                voter1.FullName = worksheet.Cells[row, 9].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 9].Value == null) && (worksheet.Cells[row, 10].Value != null))
                                voter1.FullName = worksheet.Cells[row, 10].Value.ToString().Trim();

                            if (worksheet.Cells[row, 13].Value != null)
                                voter1.Gender = worksheet.Cells[row, 13].Value.ToString().Trim();
                            if (worksheet.Cells[row, 19].Value != null)
                                voter1.Age = int.Parse(worksheet.Cells[row, 19].Value.ToString().Trim());
                            //if (worksheet.Cells[row, 27].Value != null)
                            //    voter1.Village = worksheet.Cells[row, 27].Value.ToString().Trim();
                            if (worksheet.Cells[row,20].Value != null)
                                voter1.VotingCardNo = worksheet.Cells[row, 20].Value.ToString().Trim();

                            if (worksheet.Cells[row, 22].Value != null)
                                voter1.MobileNo = worksheet.Cells[row, 22].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 11].Value != null) && (worksheet.Cells[row, 12].Value != null))
                                voter1.FullName_KR = worksheet.Cells[row, 11].Value.ToString().Trim() + " " + worksheet.Cells[row, 12].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 11].Value != null) && (worksheet.Cells[row, 12].Value == null))
                                voter1.FullName_KR = worksheet.Cells[row, 11].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 11].Value == null) && (worksheet.Cells[row, 12].Value != null))
                                voter1.FullName_KR = worksheet.Cells[row, 12].Value.ToString().Trim();


                       

                            if ((worksheet.Cells[row, 24].Value != null) && (worksheet.Cells[row, 25].Value != null))
                                voter1.FullName_HN = worksheet.Cells[row, 24].Value.ToString().Trim() + " " + worksheet.Cells[row, 25].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 24].Value != null) && (worksheet.Cells[row,25].Value == null))
                                voter1.FullName_HN = worksheet.Cells[row, 24].Value.ToString().Trim();

                            if ((worksheet.Cells[row, 24].Value == null) && (worksheet.Cells[row, 25].Value != null))
                                voter1.FullName_HN = worksheet.Cells[row, 25].Value.ToString().Trim();

                            //if (worksheet.Cells[row, 21].Value != null)
                            voter1.Assembly = "Kothrud";

                          //  if (worksheet.Cells[row, 22].Value != null)
                                voter1.AssemblyName_KR = "कोथरूड";
                                voter1.AssemblyName_HN= "कोथरूड";

                            //if (worksheet.Cells[row, 28].Value != null)
                            //    voter1.Village_KR = worksheet.Cells[row, 28].Value.ToString().Trim();

                            voter1.CreatedDate = DateTime.Now;

                            voters.Add(voter1);
                        }
                    }
                }

                if (System.IO.File.Exists(filename))
                {
                    System.IO.File.Delete(filename);
                }
                return Ok(_voterService.InsertBulkVoter(voters));
            }
            catch(Exception ex)
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
        public IActionResult GetVoterCountbyLastName(int userid,int roleid,int pageno, int noofrow, string Language)
        {
            try
            {
                return Ok(_voterService.GetVoterCountbyLastName(userid,roleid, pageno, noofrow,Language));
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
        public IActionResult VoterDetailsbyLastName(string Name,int UserId,int RoleId, int PageNo, int NoofRow, string Language)
        {
            try
            {
                return Ok(_voterService.VoterDetailsbyLastName(Name, UserId, RoleId,PageNo,NoofRow,Language));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/VoterDetailsbyLastName");
                return BadRequest(ex);
            }
        }

        [HttpGet("VoterDetailsbyColumn")]
        public IActionResult VoterDetailsbyColumn(string ColoumnName, string ColoumnValue,int UserId,int RoleId, int PageNo, int NoofRow, string Language)
        {
            try
            {
                return Ok(_voterService.VoterDetailsbyColumn(ColoumnName, ColoumnValue, UserId, RoleId,PageNo,NoofRow,Language));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/VoterDetailsbyColumn");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetDistinctPartNumber")]
        public IActionResult GetDistinctPartNumber(int Role, int UserId)
        {
            try
            {
                return Ok(_voterService.GetDistinctPartNo(Role, UserId));
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
        public IActionResult GetVoterBetweenAge(int age1,int age2,string gender,int UserId,int RoleId, int PageNo, int NoofRow, string Language)
        {
            try
            {
                return Ok(_voterService.GetVoterAgeBetween(age1, age2, gender, UserId, RoleId,PageNo,NoofRow,Language));
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
        public IActionResult VoterwithMobileNo(int UserId,int RoleId, int PageNo, int NoofRow, string Language)
        {
            try
            {
                return Ok(_voterService.VoterwithMobileNo(UserId,RoleId,PageNo,NoofRow,Language));
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
            public IActionResult GetVoterInclinationUserId(string Inclination,int UserId,int RoleId, int PageNo, int NoofRow, string Language)
            {
                try
                {
                    return Ok(_voterService.GetVoterInclinationUserId(Inclination, UserId, RoleId,PageNo,NoofRow,Language));
                }
                catch (Exception ex)
                {
                    _exceptionLogService.ErrorLog(ex, "Exception", "VoterController/GetVoterInclinationUserId");
                    return BadRequest(ex);
                }
            }

        [HttpGet("GetStarVoterbyUserId")]
        public IActionResult GetStarVoterbyUserId(int userid, int roleid, int PageNo, int NoofRow, string Language)
        {
            try
            {
                return Ok(_voterService.GetStarVoterbyUserId(userid, roleid,PageNo,NoofRow,Language));
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
        public IActionResult GetVoterbyPartNo(int partno, int PageNo, int NoofRow, string Language)
        {
            try
            {
                return Ok(_voterService.GetVoterByPartNo(partno,PageNo,NoofRow,Language));
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
                        if (worksheet.Cells[row, 3].Value != null)
                            caste.Caste_Reg = worksheet.Cells[row, 3].Value.ToString().Trim();
                        if (worksheet.Cells[row, 4].Value != null)
                            caste.Caste_Hin = worksheet.Cells[row, 4].Value.ToString().Trim();
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
    }
 }
