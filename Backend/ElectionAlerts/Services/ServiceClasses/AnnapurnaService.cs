using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class AnnapurnaService : IAnnapurnaService
    {
        private readonly IAnnapurnaRepository _annapurnaRepository;

        public AnnapurnaService(IAnnapurnaRepository annapurnaRepository)
        {
            _annapurnaRepository = annapurnaRepository;
        }

        public int DeletebyId(int Id)
        {
            return _annapurnaRepository.DeletebyId(Id);
        }

        public int DeleteFamilybyId(int Id)
        {
            return _annapurnaRepository.DeleteFamilybyId(Id);
        }

        public IEnumerable<Annapurna> GetAllAnnapurna()
        {
            return _annapurnaRepository.GetAllAnnapurna();    
        }

        public IEnumerable<AnnapurnaDTO> GetAllAnnapurnawithPage(int PageNo, int NoofRow)
        {
            return _annapurnaRepository.GetAllAnnapurnawithPage(PageNo, NoofRow);
        }

        public IEnumerable<AnnapurnaBeneficiary> GetAnnapurnaBeneficiariesFromTo(string Name, string FromDate, string ToDate)
        {
            return _annapurnaRepository.GetAnnapurnaBeneficiariesFromTo(Name, FromDate, ToDate);
        }

        public IEnumerable<Annapurna> GetAnnapurnabyId(int Id)
        {
            return _annapurnaRepository.GetAnnapurnabyId(Id);
        }

        public IEnumerable<Annapurna> GetAnnapurnaFromTo(string Name, string FromDate, string ToDate)
        {
            return _annapurnaRepository.GetAnnapurnaFromTo(Name, FromDate, ToDate);
        }

        public IEnumerable<Family> GetFamilybyId(int ANPID)
        {
            return _annapurnaRepository.GetFamilybyId(ANPID);
        }

        public int InsertUpdate(Annapurna annnapurna)
        {
            return _annapurnaRepository.InsertUpdate(annnapurna);
        }

        public int InsertUpdateAnnapurnaBeneficiary(AnnapurnaBeneficiary annapurna)
        {
            return _annapurnaRepository.InsertUpdateAnnapurnaBeneficiary(annapurna);
        }

        public int InsertUpdateFamily(Family family)
        {
            return _annapurnaRepository.InsertUpdateFamily(family);
        }
    }
}
