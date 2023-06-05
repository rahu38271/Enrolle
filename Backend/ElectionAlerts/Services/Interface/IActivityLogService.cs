using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IActivityLogService
    {
        IEnumerable<ActivityLogDTO> GetActivityLogs(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<ActivityLogDTO> GetActivityLogsbyModule(int UserId, int RoleId, int PageNo, int NoofRow, string Module, string SearchText);
        IEnumerable<ActivityLogDTO> GetActivityLogsBetweenDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate);
        IEnumerable<ActivityLogCount> GetActivityLogCountbyUserId(int Id,int RoleId,string FromDate, string ToDate);
        IEnumerable<ActivityLogDTO> GetActivityLogbyUserId(int UserId, int PageNo, int NoofRow, string FromDate, string ToDate);
    }
}
