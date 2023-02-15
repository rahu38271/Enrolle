using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface ILoginRepository
    {
        
        SuperAdmin Login(string username, string password);
        ConfigureDB GetConfigureDBbyUser(int SuperAdmin);
        int InsertConfigureDBbyUser(ConfigureDB configureDB);
        int DeleteConfigureDBbyUser(int Id);
        int InsertUser(AdminUser user);
        int DeleteUser(int Id);
        int ChangeUserPassword(int id, string password);
        AdminUser LoginUser(string username, string password);
        IEnumerable<AdminUser> GetAllUsers();
    }
}
