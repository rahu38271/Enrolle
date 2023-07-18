using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IAssemblyService
    {
        IEnumerable<Assembly> GetAssembly();
        int InsertAssembly(Assembly assembly);

        int InsertBulkAssembly(DataTable dt);

        int InsertBulkAssemblyList(List<Assembly> assemblies);

        IEnumerable<Assembly> FilterAssemblyList(Table table);

        int DeleteAssemblybyId(int id);
        IEnumerable<Assembly> GetAssemblyDistrictwise(string district);
        IEnumerable<Assembly> GetAssemblyRegLang(int Assembly);
    }
}
