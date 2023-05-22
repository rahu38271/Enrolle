using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IActivityLogRepository
    {
        IEnumerable<ActivityLogDTO> GetActivityLogs(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<ActivityLogDTO> GetActivityLogsbyModule(int UserId, int RoleId, int PageNo, int NoofRow, string Module, string SearchText);
        IEnumerable<ActivityLogDTO> GetActivityLogsBetweenDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate);
        IEnumerable<ActivityLogCountDTO> GetActivityLogCountbyUserId();
    }
}
