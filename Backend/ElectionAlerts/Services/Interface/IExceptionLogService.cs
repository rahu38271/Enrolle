using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IExceptionLogService
    {
      void  ErrorLog(Exception ex, string ExType, string ExLocation);
    }
}
