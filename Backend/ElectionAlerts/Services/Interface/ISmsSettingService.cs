using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ISmsSettingService
    {
        int InsertUpdateSmsSetting(SmsSetting smsSetting);
        IEnumerable<SmsSetting> GetAllSmsSetting();
        IEnumerable<SmsSetting> GetSmsSettingbyId(string MType);
        int DeleteSmsSettingbyId(int Id);
    }
}
