using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class ActivityLogService : IActivityLogService
    {
        private readonly IActivityLogRepository _activityLogRepository;

        public ActivityLogService(IActivityLogRepository activityLogRepository)
        {
            _activityLogRepository = activityLogRepository;
        }

        public IEnumerable<ActivityLogDTO> GetActivityLogbyUserId(int UserId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            return _activityLogRepository.GetActivityLogbyUserId(UserId, PageNo, NoofRow,FromDate,ToDate);
        }

        public IEnumerable<ActivityLogCount> GetActivityLogCountbyUserId(int Id, int RoleId, string FromDate, string ToDate)
        {
            return _activityLogRepository.GetActivityLogCountbyUserId(Id,RoleId, FromDate,ToDate);
        }

        public IEnumerable<ActivityLogDTO> GetActivityLogs(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            return _activityLogRepository.GetActivityLogs(UserId,RoleId,PageNo,NoofRow,SearchText);
        }

        public IEnumerable<ActivityLogDTO> GetActivityLogsBetweenDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            return _activityLogRepository.GetActivityLogsBetweenDate(UserId, RoleId, PageNo, NoofRow, FromDate, ToDate);
        }

        public IEnumerable<ActivityLogDTO> GetActivityLogsbyModule(int UserId, int RoleId, int PageNo, int NoofRow, string Module, string SearchText)
        {
            return _activityLogRepository.GetActivityLogsbyModule(UserId, RoleId, PageNo, NoofRow, Module, SearchText);
        }
    }
}
