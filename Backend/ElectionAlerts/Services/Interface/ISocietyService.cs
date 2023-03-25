using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ISocietyService
    {
        int CreateUpdateSociety(Society society);
        IEnumerable<Society> GetAllSociety();
        int DeleteSocietybuId(int Id);
    }
}
