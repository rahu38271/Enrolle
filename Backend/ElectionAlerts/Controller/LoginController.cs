using ElectionAlerts.Model;
using ElectionAlerts.Repository;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
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

        [HttpGet("LoginAdmin")]
        public IActionResult Login(string Username, string Password)
        {
            var user = _loginService.Login(Username, Password);
            if (user != null)
            {
                var token = GenerateJSONWebToken();
                return Ok(new { token = token, ExpiryTime = 1800, User = user });
            }
            else
            {
                return Ok("Invalid Username or Password!");
            }
        }

        [HttpGet("LoginUser")]
        public IActionResult LoginUser(string Username, string Password)
        {
            var user = _loginService.LoginUser(Username, Password);
            if (user != null)
            {
                if (user.AdminId != null)
                {
                    var configDB = _loginService.GetConfigureDBbyUser(Convert.ToInt32(user.AdminId));
                    ReadConfiguration(configDB);
                }
                return (Ok());
            }
            else
            {
                return Ok("Invalid Username or Password!");
            }
        }

        [HttpPost("InsertDBConfigure")]
        public IActionResult InsertDBConfigure(ConfigureDB configureDB)
        {
            try
            {
               return Ok( _loginService.InsertConfigureDBbyUser(configureDB));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/InsertDBConfigure");
                return BadRequest(ex);
            }
        }

        [HttpPost("CreateUser")]
        public IActionResult CreateUser(User user)
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

        [HttpPost("UpdateUser")]
        public IActionResult UpdateUser(User user)
        {
            try
            {
                return Ok(_loginService.UpdateUser(user));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "LoginController/UpdateUser");
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

        [HttpPost("DeleteUser")]
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

        private string GenerateJSONWebToken()
        {
            //var claims = new[] { new Claim(ClaimTypes.PrimarySid, configure.IPAddress), new Claim(ClaimTypes.Name, configure.DBName), new Claim(ClaimTypes.Role,configure.UserName), new Claim(ClaimTypes.Authentication, configure.Password) };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer: _config["Jwt:Issuer"], audience: _config["Jwt:Audience"],
            expires: DateTime.Now.AddMinutes(30));
            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public void ReadConfiguration(ConfigureDB configureDB)
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
    }
}
