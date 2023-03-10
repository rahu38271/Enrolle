using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;
using ElectionAlerts.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ElectionAlerts.Controller
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private INotificationService _notificationService;
        private IExceptionLogService _exceptionLogService;
        public NotificationsController(INotificationService notificationService, IExceptionLogService exceptionLogService)
        {
            _notificationService = notificationService;
            _exceptionLogService = exceptionLogService;
        }

        [HttpGet("GetTodaysNotification")]
        public IActionResult GetTodaysNotification(string NotificationType)
        {
            try
            {
                return Ok(_notificationService.GetTodaysNotifications(NotificationType));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NotificationsController/GetTodaysNotification");
                return BadRequest(ex);
            }

        }

        [HttpPost("SendNotification")]
        public IActionResult SendNotification(Contact cnt)
        {
            try
            {
                return Ok(_notificationService.SendNotifications(cnt));
            }
            catch (Exception ex)
            {
                _exceptionLogService.ErrorLog(ex, "Exception", "NotificationsController/SendNotification");
                return BadRequest(ex);
            }

        }

    }
}
