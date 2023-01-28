using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;

namespace ElectionAlerts.Repository.Interface
{
   public interface ISettingRepository
    {
        List<Districts> GetAllDistricts();
        List<Taluka> GetAllTaluka(int DId);
    }
}
