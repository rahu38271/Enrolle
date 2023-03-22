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

        public IEnumerable<Annapurna> GetAllAnnapurna()
        {
            return _annapurnaRepository.GetAllAnnapurna();    
        }

        public int InsertUpdate(Annapurna annnapurna)
        {
            return _annapurnaRepository.InsertUpdate(annnapurna);
        }
    }
}
