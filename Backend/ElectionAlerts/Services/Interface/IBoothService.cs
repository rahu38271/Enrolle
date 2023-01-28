using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IBoothService
    {
        IEnumerable<Booth> GetAllBoth();
        int InsertBoothSingle(Booth booth);
        IEnumerable<Booth> FilterBoothList(Table table);
        int InsertBoothBulk(DataTable dataTable);
        int InsertBothBulkList(List<Booth> booths);
        int DeleteBoothbyId(int Id);
    }
}
