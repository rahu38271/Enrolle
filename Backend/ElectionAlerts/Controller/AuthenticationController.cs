using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ElectionAlerts.Controller
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthenticationController: ControllerBase
    {
        private readonly IAuthService _iauthservice;
        private readonly IExceptionLogService _exceptionLogService;
        private readonly IConfiguration _config;
        public AuthenticationController(IAuthService iauthservice, IConfiguration config, IExceptionLogService exceptionLogService)
        {
            _iauthservice = iauthservice;
            _config = config;
            _exceptionLogService = exceptionLogService;
        }

       //////[HttpGet("Login")]
       ////// public IActionResult Login(string Username,string Password)
       ////// {
       //////     var user = _iauthservice.Login(Username, Password);
       //////     if (user.Count()>0)
       //////     {
       //////         var token = GenerateJSONWebToken(null);
       //////         return Ok(new { token = token, ExpiryTime = 1800 , User =user});
       //////     }
       //////     else
       //////     {
       //////         return Ok("Invalid Username or Password!");
       //////     }
       ////// }

       ////// [HttpGet("Otp")]
       ////// public IActionResult Getotp(string Contact)
       ////// {
       //////     try
       //////     {
       //////         return Ok(_iauthservice.GetOtp(Contact));
       //////     }
       //////     catch(Exception ex)
       //////     {
       //////         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/Otp");
       //////         return BadRequest(ex);
       //////     }
       ////// }

       ////// private string GenerateJSONWebToken(ConfigureDB ConfigureDB)
       ////// {

       //////     var claims = new[] { new Claim(ClaimTypes.PrimarySid, ConfigureDB.IPAddress), new Claim(ClaimTypes.Name, ConfigureDB.DBName), new Claim(ClaimTypes.Role, ConfigureDB.UserName), new Claim(ClaimTypes.Authentication, ConfigureDB.Password) };
       //////     var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
       //////     var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
       //////     var token = new JwtSecurityToken(issuer: _config["Jwt:Issuer"], audience: _config["Jwt:Audience"],
       //////     expires: DateTime.Now.AddMinutes(30), claims: claims,
       //////     signingCredentials: credentials);
       //////     return new JwtSecurityTokenHandler().WriteToken(token);
       ////// }

       ////// private UserModel AuthenticateUser(UserModel login)
       ////// {
       //////     UserModel user = null;  
       //////     if (login.Username == "Jignesh")
       //////     {
       //////         user = new UserModel { Username = "Jignesh Trivedi", Email = "test.btest@gmail.com" };
       //////     }
       //////     return user;
       ////// }

       ////// [HttpPost("InsertUser")]
       ////// public IActionResult InsertUser(User user)
       ////// {
       //////     try
       //////     {
       //////         return Ok(_iauthservice.InsertUser(user));
       //////     }
       //////     catch (Exception ex)
       //////     {
       //////         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/InsertUser");
       //////         return BadRequest(ex);
       //////     }
       ////// }

       ////// [HttpPost("UpdateUser")]
       ////// public IActionResult UpdateUser(User user)
       ////// {
       //////     try
       //////     {
       //////         return Ok(_iauthservice.UpdateUser(user));
       //////     }
       //////     catch (Exception ex)
       //////     {
       //////         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/UpdateUser");
       //////         return BadRequest(ex);
       //////     }
       ////// }

       ////// [HttpPost("DeleteUser")]
       ////// public IActionResult DeleteUser(int Id)
       ////// {
       //////     try
       //////     {
       //////         return Ok(_iauthservice.DeleteUser(Id));
       //////     }
       //////     catch (Exception ex)
       //////     {
       //////         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/DeleteUser");
       //////         return BadRequest(ex);
       //////     }
       ////// }

       ////// [HttpGet("GetUserbyId")]
       //// public IActionResult GetUserbyId(int Id)
       //// {
       ////     try
       ////     {
       ////         return Ok(_iauthservice.GetUserbyId(Id));
       ////     }
       ////     catch (Exception ex)
       ////     {
       ////         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/GetUserbyId");
       ////         return BadRequest(ex);
       ////     }
       //// }

       //// [HttpPost("ChangeUserPassword")]
       //// public IActionResult ChangeUserPassword(int Id, string Password)
       //// {
       ////     try
       ////     {
       ////         return Ok(_iauthservice.ChangeUserPassword(Id, Password));
       ////     }
       ////     catch (Exception ex)
       ////     {
       ////         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/ChangeUserPassword");
       ////         return BadRequest(ex);
       ////     }
       //// }

       //// [HttpPost("FilterUserList")]

       //// public IActionResult FilterUserList(Table table)
       //// {
       ////     try
       ////     {
       ////         return Ok(_iauthservice.FilterUserList(table));
       ////     }
       ////     catch(Exception ex)
       ////     {
       ////         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/FilterUserList");
       ////         return BadRequest(ex);
       ////     }
       //// }

       // [HttpGet("GetAllUser")]
       // public IActionResult GetAllUser()
       // {
       //     try
       //     {
       //         return Ok(_iauthservice.GetAllUser());
       //     }
       //     catch(Exception ex)
       //     {
       //         _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/GetAllUser");
       //         return BadRequest(ex);
       //     }
       // }

        [HttpPost("InsertUpdateUserAssigned")]
        public IActionResult InsertUserAssigned(UserAssigned userAssigned)
        {
            try
            {
                return Ok(_iauthservice.InsertUserAssigned(userAssigned));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/InsertUserAssigned");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetPartNumberbyId")]
        public IActionResult GetPartNumberbyId(int userid)
        {
            try
            {
                return Ok(_iauthservice.GetPartNobyId(userid));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/GetPartNumberbyId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetPartNoAssigned")]
        public IActionResult GetAllPartNumber(int userid)
        {
            try
            {
                return Ok(_iauthservice.GetPartNoAssigned(userid));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "AuthenticationController/GetAllPartNumber");
                return BadRequest(ex);
            }
        }

    }
}
