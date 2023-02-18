using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class ExceptionLogRepository: IExceptionLogRepository
    {
        private CustomContext _customContext = new CustomContext();
        //public void ErrorLog(Exception ex, string LogName, string LogType)
        //{
        //    throw new NotImplementedException();
        //}
        public void ErrorLog(Exception ex, string LogType, string ExLocation)
        {
            try
            {
                DateTime today = DateTime.Now;
                _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertErrorLog {0},{1},{2},{3},{4},{5}",
                    ex.Message, ex.StackTrace, LogType, ExLocation, "1", today.ToString());
                //DateTime today = DateTime.Now;
                //_customContext.Database.ExecuteSqlRaw("EXEC USP_InsertErrorLog {0},{1},{2},{3},{4},{5}",
                //    ex.Message, ex.StackTrace, LogType, ExLocation, "1", string.Empty);
            }
            catch (Exception exs)
            {
                Console.WriteLine(exs.Message);
            }
        }
    }
}
