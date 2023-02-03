using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class BoothService : IBoothService
    {
        private readonly IBoothRepository _bothRepository;

        public BoothService(IBoothRepository bothRepository)
        {
            _bothRepository = bothRepository;
        }

        public IEnumerable<Booth> FilterBoothList(Table table)
        {
            return _bothRepository.FilterBoothList(table);
        }

        public IEnumerable<Booth> GetAllBoth()
        {
            return _bothRepository.GetAllBoth();
        }

        public int InsertBoothSingle(Booth booth)
        {
            return _bothRepository.InsertBoothSingle(booth);
        }

        public int InsertBoothBulk(DataTable dataTable)
        {
            return _bothRepository.InsertBoothBulk(dataTable);
        }

        public int InsertBothBulkList(List<Booth> booths)
        {
            return _bothRepository.InsertBoothBulkList(booths);
        }

        public int DeleteBoothbyId(int Id)
        {
            return _bothRepository.DeleteBoothbyId(Id);
        }
    }
}
