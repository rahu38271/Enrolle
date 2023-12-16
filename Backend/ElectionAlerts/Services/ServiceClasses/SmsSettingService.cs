using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class SmsSettingService : ISmsSettingService
    {
        private readonly ISmsSettingRepository _smsSettingRepository;

        public SmsSettingService(ISmsSettingRepository smsSettingRepository)
        {
            _smsSettingRepository = smsSettingRepository;
        }
        public int DeleteSmsSettingbyId(int Id)
        {
            return _smsSettingRepository.DeleteSmsSettingbyId(Id);
        }

        public IEnumerable<SmsSetting> GetAllSmsSetting()
        {
            return _smsSettingRepository.GetAllSmsSetting();
        }

        public IEnumerable<SmsSetting> GetSmsSettingbyId(string MType)
        {
            return _smsSettingRepository.GetSmsSettingbyId(MType);
        }

        public int InsertUpdateSmsSetting(SmsSetting smsSetting)
        {
            return _smsSettingRepository.InsertUpdateSmsSetting(smsSetting);
        }
    }
}
