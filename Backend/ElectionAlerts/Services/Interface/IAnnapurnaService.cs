using ElectionAlerts.Dto;
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
        IEnumerable<Annapurna> GetAnnapurnabyId(int Id);
        int DeletebyId(int Id);
        int InsertUpdateFamily(Family family);
        IEnumerable<Family> GetFamilybyId(int ANPID);
        int DeleteFamilybyId(int Id);
        IEnumerable<AnnapurnaDTO> GetAllAnnapurnawithPage(int PageNo, int NoofRow);
        IEnumerable<Annapurna> GetAnnapurnaFromTo(string Name, string FromDate, string ToDate);
        int InsertUpdateAnnapurnaBeneficiary(AnnapurnaBeneficiary annapurna);
        IEnumerable<AnnapurnaBeneficiary> GetAnnapurnaBeneficiariesFromTo(string Name, string FromDate, string ToDate);
    }
}
