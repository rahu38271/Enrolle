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
    public class WardService : IWardService
    {
        private readonly IWardRepository _wardRepository;

        public WardService(IWardRepository wardRepository)
        {
            _wardRepository = wardRepository;
        }

        public int DeleteWardbyId(int Id)
        {
          return _wardRepository.DeleteWardbyId(Id);
        }

        public IEnumerable<Ward> FilterWardList(Table table)
        {
            return _wardRepository.FilterWardList(table);
        }

        public IEnumerable<Ward> GetWard()
        {
            return _wardRepository.GetWard();
        }

        public int InsertBulkWard(DataTable dt)
        {
            return _wardRepository.InsertBulkWard(dt);
        }

        public int InsertBulkWardList(List<Ward> wards)
        {
            return _wardRepository.InsertBulkWardList(wards);
        }

        public int InsertWard(Ward ward)
        {
            return _wardRepository.InsertWard(ward);
        }
    }
}
