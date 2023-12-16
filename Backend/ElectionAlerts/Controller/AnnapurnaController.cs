using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnnapurnaController : ControllerBase
    {
        private readonly IAnnapurnaService _annapurnaService;
        private readonly IExceptionLogService _exceptionLogService;

        public AnnapurnaController(IAnnapurnaService annapurnaService, IExceptionLogService exceptionLogService)
        {
            _annapurnaService = annapurnaService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpGet("GetAllAnnapurna")]
        public IActionResult GetAllAnnapurna()
        {
            try
            {
                return Ok(_annapurnaService.GetAllAnnapurna());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/GetAllAnnapurna");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAnnapurnaFromTo")]
        public IActionResult GetAnnapurnaFromTo(string Name, string FromDate, string ToDate)
        {
            try
            {              
                return Ok(_annapurnaService.GetAnnapurnaFromTo(Name, FromDate, ToDate));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/GetAnnapurnaFromTo");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAnnapurnaBeneficiariesFromTo")]
        public IActionResult GetAnnapurnaBeneficiariesFromTo(string Name, string FromDate, string ToDate)
        {
            try
            {
                var result = _annapurnaService.GetAnnapurnaBeneficiariesFromTo(Name, FromDate, ToDate);
                if(result.Count()!=0)
                {
                    var annapurna = _annapurnaService.GetAllAnnapurna();
                    var benificary = from b in result join a in annapurna on b.ANPId equals a.Id select new { b.Id, b.FullName, b.PhoneNo, b.BenefittedDate, b.SupplyGiven,ANPName=(a.FirstName + " "  + a.MiddleName + " " + a.LastName).Trim() };
                    return Ok(benificary);
                }
                return Ok(0);
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/GetAnnapurnaBeneficiariesFromTo");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllAnnapurnaPage")]
        public IActionResult GetAllAnnapurnaPage(int PageNo, int NoofRow)
        {
            try
            {
                return Ok(_annapurnaService.GetAllAnnapurnawithPage(PageNo,NoofRow));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/GetAllAnnapurnaPage");
                return BadRequest(ex);
            }
        }
        [HttpPost("InsertUpdateAnnapurna")]
        public IActionResult InsertUpdateAnnapurna(Annapurna annapurna)
        {
            try
            {
                return Ok(_annapurnaService.InsertUpdate(annapurna));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/InsertUpdateAnnapurna");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteAnnapurnabyId")]

        public IActionResult DeleteAnnapurnabyId(int Id)
        {
            try
            {
                return Ok(_annapurnaService.DeletebyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/DeleteAnnapurnabyId");
                return BadRequest(ex);
            }
        }


        [HttpGet("GetAllFamilybyId")]
        public IActionResult GetAllFamilybyId(int anpnid)
        {
            try
            {
                return Ok(_annapurnaService.GetFamilybyId(anpnid));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/GetAllFamilybyId");
                return BadRequest();
            }
        }

        [HttpPost("InsertUpdateFamily")]
        public IActionResult InsertUpdateFamily(Family family)
        {
            try
            {
                return Ok(_annapurnaService.InsertUpdateFamily(family));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/InsertUpdateFamily");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteFamilybyId")]
        public IActionResult DeleteFamilybyId(int Id)
        {
            try
            {
                return Ok(_annapurnaService.DeleteFamilybyId(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/DeleteFamilybyId");
                return BadRequest(ex);
            }
        }

        [HttpPost("RemoveFamily")]
        public IActionResult RemoveFamily(List<Family> family)
        {
            try
            {
                if (family.Count == 1)
                {
                    RemoveAnnapurnaFamily(family[0]);
                }
                else
                {
                    var result=  RemoveAnnapurnaFamily(family[0]);
                    var FamilyHead = _annapurnaService.GetAllAnnapurna().Where(x => ((string.IsNullOrEmpty(x.FirstName) ? "" : x.FirstName + " ") + (string.IsNullOrEmpty(x.MiddleName) ? "" : x.MiddleName + " ") + (string.IsNullOrEmpty(x.LastName) ? "" : x.LastName)).Trim() == family[0].FullName & x.PhoneNo == family[0].ContactNo).FirstOrDefault();
                    for (int i =1;i<family.Count;i++)
                    {
                        family[i].ANPId = FamilyHead.Id;
                        _annapurnaService.InsertUpdateFamily(family[i]);
                    }
                }
                return Ok(1);
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/RemoveFamily");
                return BadRequest(ex);
            }
        }

        [HttpPost("InsertUpdateAnnapurnaBeneficiary")]
        public IActionResult InsertUpdateAnnapurnaBeneficiary(AnnapurnaBeneficiary annapurna)
        {
            try
            {
                return Ok(_annapurnaService.InsertUpdateAnnapurnaBeneficiary(annapurna));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AnnapurnaController/InsertUpdateAnnapurnaBeneficiary");
                return BadRequest(ex);
            }
        }
        private int RemoveAnnapurnaFamily(Family family)
        {
            Annapurna annapurna = new Annapurna();
            var namearr = family.FullName.Split(' ');
            if (namearr.Length == 3)
            {
                annapurna.FirstName = namearr[0];
                annapurna.MiddleName = namearr[1];
                annapurna.LastName = namearr[2];
            }
            if (namearr.Length == 2)
            {
                annapurna.FirstName = namearr[0];
                annapurna.LastName = namearr[1];
            }
            if (namearr.Length == 1)
            {
                annapurna.FirstName = namearr[0];
            }
            annapurna.PhoneNo = family.ContactNo;
            annapurna.AltPhoneNo = family.AltContactNo;
            annapurna.PresentAddress = family.Address;
            annapurna.Id = 0;

            var result = _annapurnaService.InsertUpdate(annapurna);

            if (result > 0)
                return _annapurnaService.DeleteFamilybyId(family.Id);
            else
                return 0;
        }
    }
}
