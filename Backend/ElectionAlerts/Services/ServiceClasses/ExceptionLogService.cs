using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class ExceptionLogService: IExceptionLogService
    {
        private IExceptionLogRepository _exception;
        public ExceptionLogService(IExceptionLogRepository exception)
        {
            _exception = exception;
        }
        public void ErrorLog(Exception ex, string ExType, string ExLocation)
        {
            _exception.ErrorLog(ex, ExType, ExLocation);
        }
    }
}
