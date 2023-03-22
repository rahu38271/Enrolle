using ElectionAlerts.Model;
using ElectionAlerts.Repository;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace ElectionAlerts.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IConfiguration _config;
        private readonly IExceptionLogService _exceptionLogService;

        public LoginController(ILoginService loginService,IConfiguration config, IExceptionLogService exceptionLogService)
        {
            _loginService = loginService;
            _config = config;
            _exceptionLogService = exceptionLogService;
        }

        [HttpGet("LoginUser")]
        public IActionResult LoginUser(string Username, string Password)
        {
            string msg="DB Changed";
            string token = "";
            Startup.ElectionAlertConStr = null;
            var Users = new List<AdminUser>();
            var user = _loginService.LoginUser(Username, Password);
            if (user != null)
            {            
                Users.Add(user);
                msg = "User Logined";
                if (user.RoleId>1)
                {
                    try
                    {
                        ConfigureDB configDB = null;
                        if (user.RoleId == 2)
                        {

                             configDB = _loginService.GetConfigureDBbyUser(Convert.ToInt32(user.Id));
                        }
                        else
                        {
                             configDB = _loginService.GetConfigureDBbyUser(Convert.ToInt32(user.SuperAdminId));
                        }
                        
                        if (configDB != null)
                        {
                            string cnstr = "Server=" + configDB.IPAddress + ";Database=" + configDB.DBName + ";User Id=" + configDB.UserName + ";Password =" + configDB.Password + ";pooling=false;";
                            Startup.ElectionAlertConStr = cnstr;
                            token = GenerateJSONWebToken(configDB);
                        }
                        else
                            msg = "No DB Config Found";
                    }
                    catch(Exception ex)
                    {
                        msg = ex.InnerException + "  Message : " + ex.Message;
                    }         
                    return Ok(new { token = token, ExpiryTime = 1800, User = Users});
                }
            }
            else
            {
                return Ok("Invalid Username or Password!");
            }
            return Ok(new { token = token, ExpiryTime = 1800, User = Users });
        }

        [HttpPost("InsertUpdateDBConfigure")]
        public IActionResult InsertDBConfigure(ConfigureDB configureDB)
        {
            try
            {
               return Ok( _loginService.InsertConfigureDBbyUser(configureDB));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/InsertUpdateDBConfigure");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteDBConfigure")]
        public IActionResult DeleteDBConfigure(int Id)
        {
            try
            {
                return Ok(_loginService.DeleteConfigureDBbyUser(Id));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/DeleteDBConfigure");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllConfigureDB")]
        public IActionResult GetAllConfigureDB()
        {
            try
            {
                return Ok(_loginService.GetConfigureDB());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetAllConfigureDB");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetConfigureDBbyUser")]
        public IActionResult GetConfigureDBbyUser(int SuperAdminId)
        {
            try
            {
                return Ok(_loginService.GetConfigureDBbyUser(SuperAdminId));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetConfigureDBbyUser");
                return BadRequest(ex);
            }
        }
        [HttpPost("CreateUpdateUser")]
        public IActionResult CreateUser(AdminUser user)
        {
            try
            {
                return Ok(_loginService.InsertUser(user));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/CreateUser");
                return BadRequest(ex);
            }
        }

        
        [HttpPost("UpdatePassword")]
        public IActionResult UpdatePassword(int Id,string PassWord )
        {
            try
            {
                return Ok(_loginService.ChangeUserPassword(Id, PassWord));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/UpdatePassword");
                return BadRequest(ex);
            }
        }

        [HttpGet("DeleteUser")]
        public IActionResult DeleteUser(int Id)
        {
            try
            {
                return Ok(_loginService.DeleteUser(Id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/DeleteUser");
                return BadRequest(ex);
            }
        }

        private string GenerateJSONWebToken(ConfigureDB ConfigureDB)
        {
            var claims = new[] { new Claim(ClaimTypes.PrimarySid, ConfigureDB.IPAddress), new Claim(ClaimTypes.Name, ConfigureDB.DBName), new Claim(ClaimTypes.Role, ConfigureDB.UserName), new Claim(ClaimTypes.Authentication, ConfigureDB.Password) };
            // var claims = new[] { new Claim("IP", ConfigureDB.IPAddress), new Claim("DBname", ConfigureDB.DBName), new Claim("UserName", ConfigureDB.UserName), new Claim("Password", ConfigureDB.Password) };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer: _config["Jwt:Issuer"], audience: _config["Jwt:Audience"],
            expires: DateTime.Now.AddMinutes(30), claims: claims,
            signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public void ReadConfiguration(ConfigureDB configureDB)
        {
            try
            {
                var appSettingsPath = Path.Combine(System.IO.Directory.GetCurrentDirectory(), "appsettings.json");
                var json = System.IO.File.ReadAllText(appSettingsPath);

                var jsonSettings = new JsonSerializerSettings();
                jsonSettings.Converters.Add(new ExpandoObjectConverter());
                jsonSettings.Converters.Add(new StringEnumConverter());

                dynamic config = JsonConvert.DeserializeObject<ExpandoObject>(json, jsonSettings);

                config.DebugEnabled = true;
                config.ConnectionStrings.DBCon = $"Server={configureDB.IPAddress};Database={configureDB.DBName};User Id={configureDB.UserName}; Password ={configureDB.Password};pooling=false;";

                var newJson = JsonConvert.SerializeObject(config, Formatting.Indented, jsonSettings);

                System.IO.File.WriteAllText(appSettingsPath, newJson);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("GetAllUser")]
        public IActionResult GetAllUser()
        {
            try
            {
                return Ok(_loginService.GetAllUser());
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetAllUser");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAdminbySuperAdminId")]
        public IActionResult GetAdminbySuperAdminId(int superid)
        {
            try
            {
                return Ok(_loginService.GetAllAdminbySuperAdminId(superid));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetAllUser");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVolunterbyAdminId")]
        public IActionResult GetVolunterbyAdminId(int adminid)
        {
            try
            {
                return Ok(_loginService.GetAllVolunterbyAdminId(adminid));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetAllUser");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllDistricts")]
        public IActionResult GetAllDistricts()
        {
            try
            {
                return Ok(_loginService.GetAllDistricts());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetAllDistricts");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllTaluka")]
        public IActionResult GetAllTaluka(int id)
        {
            try
            {
                return Ok(_loginService.GetAllTaluka(id));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetAllTaluka");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetVillage")]
        public IActionResult GetVillage(string taluka)
        {
            try
            {
                return Ok(_loginService.GetVillage(taluka));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetVillage");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetAllassembly")]
        public IActionResult GetAllassembly( )
        {
            try
            {
                return Ok(_loginService.GetAssembly());
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/GetAllassembly");
                return BadRequest(ex);
            }
        }
    }
}
