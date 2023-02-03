using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IWardRepository
    {
        IEnumerable<Ward> GetWard();
        int InsertWard(Ward ward);
        int InsertBulkWard(DataTable dt);
        int InsertBulkWardList(List<Ward> wards);
        IEnumerable<Ward> FilterWardList(Table table);
        int DeleteWardbyId(int Id);

    }
}
