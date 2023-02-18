using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class LoginRepository : ILoginRepository
    {
        private CustomContext _customContext = new CustomContext();
        public SuperAdmin Login(string username, string password)
        {
            try
            {
                var user = _customContext.Set<SuperAdmin>().FromSqlRaw("EXEC USP_Login {0},{1}", username, password).ToList().FirstOrDefault();
                return user;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public ConfigureDB GetConfigureDBbyUser(int SuperAdmin)
        {
            try
            {
                return _customContext.Set<ConfigureDB>().FromSqlRaw("USP_GetDBConfigbyUser {0}", SuperAdmin).ToList().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertConfigureDBbyUser(ConfigureDB configureDB)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertDBConfigure {0},{1},{2},{3},{4},{5},{6}", configureDB.DBName, configureDB.IPAddress, configureDB.HostName, configureDB.UserName, configureDB.Password, configureDB.SuperAdminId,DateTime.Now.ToString());
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int InsertUser(User user)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertUser {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17}", user.Name, user.Contact, user.UserName, user.Address, user.Password, user.Email, user.State, user.District, user.Taluka,user.AssemblyName,user.Ward, user.Booth,user.Candidate,user.Quote,user.RoleId,user.CreatedDate,user.IsActive, user.IsDeleted);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int UpdateUser(User user)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_UpdateUser {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18}", user.Id, user.Name, user.Contact, user.UserName, user.Address, user.Password, user.Email, user.State, user.District, user.Taluka, user.AssemblyName, user.Ward, user.Booth, user.Candidate, user.Quote, user.RoleId, user.CreatedDate, user.IsActive, user.IsDeleted);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int DeleteUser(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_DeleteUser {0}",Id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        
        public int ChangeUserPassword(int id, string password)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_ChangeUserPassword {0},{1}",id,password);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public User LoginUser(string username, string password)
        {
            try
            {
                var user = _customContext.Set<User>().FromSqlRaw("EXEC USP_UserLogin {0},{1}", username, password).ToList().FirstOrDefault();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
