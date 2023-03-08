using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ILoginService
    {
        SuperAdmin Login(string username, string password);
        ConfigureDB GetConfigureDBbyUser(int SuperAdmin);
        IEnumerable<ConfigureDB> GetConfigureDB();
        int InsertConfigureDBbyUser(ConfigureDB configureDB);
        int DeleteConfigureDBbyUser(int Id);
        int InsertUser(AdminUser user);
        int DeleteUser(int Id);
        int ChangeUserPassword(int id, string password);
        AdminUser LoginUser(string username, string password);
        IEnumerable<AdminUser> GetAllUser();
        IEnumerable<AdminUser> GetAllAdminbySuperAdminId(int superid);
        IEnumerable<AdminUser> GetAllVolunterbyAdminId(int adminid);
        IEnumerable<Village> GetVillage(string taluka);
        List<Districts> GetAllDistricts();
        List<Taluka> GetAllTaluka(int DId);
        IEnumerable<Assembly> GetAssembly();
    }
}
