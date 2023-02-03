using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IBoothRepository
    {    
      IEnumerable<Booth> GetAllBoth();
      int InsertBoothSingle(Booth booth);

      int InsertBoothBulk(DataTable dataTable);
      int InsertBoothBulkList(List<Booth> booths);
      IEnumerable<Booth> FilterBoothList(Table table);

        int DeleteBoothbyId(int Id);

    }

}
