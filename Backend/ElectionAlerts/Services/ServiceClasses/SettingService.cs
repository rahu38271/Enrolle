using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;

namespace ElectionAlerts.Services.ServiceClasses
{
   public class SettingService: ISettingService
    {
        private ISettingRepository _isettingreposritory;
       
        public SettingService(ISettingRepository settingRepository)
        {
            _isettingreposritory = settingRepository;
        }

        public List<Districts> GetAllDistricts()
        {
          return  _isettingreposritory.GetAllDistricts();
        }
       
        public List<Taluka> GetAllTaluka(int DId)
        {
           return _isettingreposritory.GetAllTaluka(DId);
        }

    }
}
