using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface ISmsSettingRepository
    {
        int InsertUpdateSmsSetting(SmsSetting smsSetting);
        IEnumerable<SmsSetting> GetAllSmsSetting();
        IEnumerable<SmsSetting> GetSmsSettingbyId(string MType);
        int DeleteSmsSettingbyId(int Id);
    }
}
