using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IAuthService
    {
        IEnumerable<UserModel> Login(string username, string password);
        string GetOtp(string contact);
        int InsertUser(User user);
        int UpdateUser(User user);
        int DeleteUser(int id);
        User GetUserbyId(int Id);
        int ChangeUserPassword(int id, string password);
        IEnumerable<User> FilterUserList(Table table);
        IEnumerable<UserDetail> GetAllUser();    
        int InsertUserAssigned(UserAssigned userAssigned);
        string GetPartNobyId(int userid);
        PartNoAssigned GetPartNoAssigned(int userid);
        PartNoAssigned GetPartNoAssignedOtherthanThisuser(int userid);

    }
}
