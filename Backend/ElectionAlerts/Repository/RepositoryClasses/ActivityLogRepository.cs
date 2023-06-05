using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class ActivityLogRepository : IActivityLogRepository
    {
        private CustomContext _custonContext = new CustomContext();

        public IEnumerable<ActivityLogDTO> GetActivityLogbyUserId(int UserId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            try
            {
                return _custonContext.Set<ActivityLogDTO>().FromSqlRaw("Exec USP_GetActivityLogbyUserId {0},{1},{2},{3}", UserId, PageNo, NoofRow,FromDate,ToDate);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ActivityLogCount> GetActivityLogCountbyUserId(int Id,int RoleId,string FromDate, string ToDate)
        {
            try
            {
                return _custonContext.Set<ActivityLogCount>().FromSqlRaw("Exec Usp_ActivityLogUserwiseCount {0},{1}",FromDate,ToDate).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ActivityLogDTO> GetActivityLogs(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _custonContext.Set<ActivityLogDTO>().FromSqlRaw("EXEC USP_GetAllActivityLog {0},{1},{2},{3},{4}",UserId,RoleId,PageNo,NoofRow,SearchText).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ActivityLogDTO> GetActivityLogsBetweenDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            try
            {
                return _custonContext.Set<ActivityLogDTO>().FromSqlRaw("EXEC USP_GetActivityLogBetweenDate {0},{1},{2},{3},{4},{5}", UserId, RoleId, PageNo, NoofRow, FromDate,ToDate).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ActivityLogDTO> GetActivityLogsbyModule(int UserId, int RoleId, int PageNo, int NoofRow, string Module, string SearchText)
        {
            try
            {
                return _custonContext.Set<ActivityLogDTO>().FromSqlRaw("EXEC USP_GetActivityLogbyModule {0},{1},{2},{3},{4},{5}", UserId, RoleId, PageNo, NoofRow, Module,SearchText).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
