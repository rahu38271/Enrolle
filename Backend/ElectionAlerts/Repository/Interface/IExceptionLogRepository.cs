using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IExceptionLogRepository
    {
        void ErrorLog(Exception ex, string LogName, string LogType);
    }
}
