using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IAnnapurnaService
    {
        int InsertUpdate(Annapurna annnapurna);
        IEnumerable<Annapurna> GetAllAnnapurna();
        int DeletebyId(int Id);
        int InsertUpdateFamily(Family family);
        IEnumerable<Family> GetFamilybyId(int ANPID);
        int DeleteFamilybyId(int Id);
    }
}
