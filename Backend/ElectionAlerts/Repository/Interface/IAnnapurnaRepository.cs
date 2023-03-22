using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IAnnapurnaRepository
    {
        int InsertUpdate(Annapurna annnapurna);
        IEnumerable<Annapurna> GetAllAnnapurna();
        int DeletebyId(int Id);
    }
}
