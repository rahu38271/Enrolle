using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;

namespace ElectionAlerts.Services.Interface
{
    public interface ISettingService
    {
        List<Districts> GetAllDistricts();
        List<Taluka> GetAllTaluka(int DId);
    }
}
