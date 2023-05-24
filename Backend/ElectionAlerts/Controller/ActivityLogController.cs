using ElectionAlerts.Services.Interface;
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
    public class ActivityLogController : ControllerBase
    {
        private readonly IActivityLogService _activityLogService;
        private readonly IExceptionLogService _exceptionLogService;
        private readonly ILoginService _loginService;

        public ActivityLogController(IActivityLogService activityLogService, IExceptionLogService exceptionLogService, ILoginService loginService)
        {
            _activityLogService = activityLogService;
            _exceptionLogService = exceptionLogService;
            _loginService = loginService;
        }

        [HttpGet("GetActivityLogs")]

        public IActionResult GetActivityLogs(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return Ok(_activityLogService.GetActivityLogs(UserId,RoleId,PageNo,NoofRow,SearchText));
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ActivityLogController/GetActivityLogs");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetActivityLogsbyModule")]
        public IActionResult GetActivityLogsbyModule(int UserId, int RoleId, int PageNo, int NoofRow, string Module, string SearchText)
        {
            try
            {
                return Ok(_activityLogService.GetActivityLogsbyModule(UserId, RoleId, PageNo, NoofRow,Module, SearchText));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ActivityLogController/GetActivityLogsbyModule");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetActivityLogsBetweenDate")]
        public IActionResult GetActivityLogsBetweenDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            try
            {
                return Ok(_activityLogService.GetActivityLogsBetweenDate(UserId, RoleId, PageNo, NoofRow, FromDate, ToDate));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ActivityLogController/GetActivityLogsBetweenDate");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetActivityLogCountbyUserId")]
        public IActionResult GetActivityLogCount(string FromDate, string ToDate)
        {
            try
            {
                var users = _loginService.GetAllUser();
                var result=_activityLogService.GetActivityLogCountbyUserId(FromDate, ToDate);
                var finalcount = from rescount in result join user in users on rescount.UserId equals user.Id select new { rescount.UserId, rescount.TotalCount, user.Name, user.RoleId,user.AdminId };
                return Ok(finalcount);
            }
            catch(Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ActivityLogController/GetActivityLogCountbyUserId");
                return BadRequest(ex);
            }
        }

        [HttpGet("GetActivityLogbyUserId")]

        public IActionResult GetActivityLogbyUserId(int UserId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            try
            {
                return Ok(_activityLogService.GetActivityLogbyUserId(UserId, PageNo, NoofRow, FromDate, ToDate));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "ActivityLogController/GetActivityLogbyUserId");
                return BadRequest(ex);
            }
        }
    }
}
