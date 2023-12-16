using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class LoginRepository : ILoginRepository
    {
       private MasterCustomContext _customContext;
       // private CustomContext _customContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LoginRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _customContext = new MasterCustomContext(_httpContextAccessor);
        }
        public SuperAdmin Login(string username, string password)
        {
            try
            {
                return  _customContext.Set<SuperAdmin>().FromSqlRaw("EXEC USP_Login {0},{1}", username, password).ToList().FirstOrDefault();
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
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertDBConfigure {0},{1},{2},{3},{4},{5},{6},{7}", configureDB.Id,configureDB.DBName, configureDB.IPAddress, configureDB.HostName, configureDB.UserName, configureDB.Password, configureDB.SuperAdminId,DateTime.Now);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public int InsertUser(AdminUser user)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertUser {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15}",user.Id,user.Name, user.Contact, user.UserName, user.Password, user.Email, user.State, user.Taluka,user.AssemblyName,user.Village, user.District, user.RoleId,DateTime.Now,user.IsActive,user.AdminId,user.SuperAdminId);
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

        public AdminUser LoginUser(string username, string password)
        {
            try
            {
                var user = _customContext.Set<AdminUser>().FromSqlRaw("EXEC USP_UserLogin {0},{1}", username, password).ToList().FirstOrDefault();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AdminUser> GetAllUsers()
        {
            try
            {
                return _customContext.Set<AdminUser>().FromSqlRaw("EXEC USP_GetAllUser").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteConfigureDBbyUser(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_DeleteDBConfigure {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AdminUser> GetAllAdminbySuperAdminId(int superid)
        {
            try
            {
                return _customContext.Set<AdminUser>().FromSqlRaw("EXEC USP_GetAllAdminbySuperId {0}", superid).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AdminUser> GetAllVolunterbyAdminId(int adminid)
        {
            try
            {
                return _customContext.Set<AdminUser>().FromSqlRaw("EXEC USP_GetAllVolunterbyAdminId {0}", adminid).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Village> GetVillage(string taluka)
        {
            try
            {
                return _customContext.Set<Village>().FromSqlRaw("USP_GetAllVillagebyTaluka {0}", taluka);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Districts> GetAllDistricts()
        {
            try
            {
                return _customContext.Set<Districts>().FromSqlRaw("EXEC USP_GetAllDistricts").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Taluka> GetAllTaluka(int DId)
        {
            try
            {
                return _customContext.Set<Taluka>().FromSqlRaw("EXEC USP_GetAllTaluka {0}", DId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Assembly> GetAssembly()
        {
            try
            {
                return _customContext.Set<Assembly>().FromSqlRaw("EXEC USP_GetAllAssembly").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ConfigureDB> GetConfigureDB()
        {
            try
            {
                return _customContext.Set<ConfigureDB>().FromSqlRaw("EXEC USP_GetAllDBConfig").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AdminUser> GetAllSocietyMember(int userid)
        {
            try
            {
                return _customContext.Set<AdminUser>().FromSqlRaw("Exec USP_GetSocietyMemberbyId {0}", userid);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateMessageSent(int Id,string Type)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec Usp_UpdateMessageSent {0},{1}", Id,Type);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int EnableDisableUser(int Id, string IsActive)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_EnableDisableUser {0},{1}", Id, IsActive);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetOtp(string contact)
        {
            try
            {
                string otp = GenerateOtp();
                string msg = "Dear User , Your one time password is " + otp + ". Kindly do not share with any one. Prolit Technologies ";
                WebClient web = new WebClient();
                //string url = "http://45.114.143.189/api/mt/SendSMS?username=prolittechnologies&password=prolit3214&senderid=Prolit&type=0&destination=" + contact + "&text=" + msg + "&peid=%201301165123633080685";
                string url = "http://45.114.143.189/api/mt/SendSMS?username=prolittechnologies&password=Prolit@12&senderid=Prolit&type=0&destination=9579743709&text=Your One Time Password for login is " + otp + ". Put this OTP and press submit. Prolit Technology &peid=1301165123633080685";
                Stream stream = web.OpenRead(url);
                StreamReader reader = new StreamReader(stream);
                return otp;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GenerateOtp()
        {
            try
            {

                string[] saAllowedCharacters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
                string sOTP = string.Empty;

                string sTempChars = string.Empty;

                Random rand = new Random();

                for (int i = 0; i < 6; i++)

                {

                    int p = rand.Next(0, saAllowedCharacters.Length);

                    sTempChars = saAllowedCharacters[rand.Next(0, saAllowedCharacters.Length)];

                    sOTP += sTempChars;

                }
                return sOTP;
                //using (var client = new HttpClient())
                //{
                //    client.BaseAddress = new Uri("http://45.114.143.189/api/mt/");
                //    var responce = client.GetAsync("SendSMS?username=thakur&password=thakur123&senderid=Thakur&type=8&destination=" + MobileNo + "&text=Dear User, Kindly use this OTP " + sOTP + " to login. Office of Adv.Yashomati Thakur &peid=1301159187210511020").Result;
                //if (responce.IsSuccessStatusCode)                                                               
                //{
                //	return RedirectToAction("SubmitPatientDetails");
                //}
                //return RedirectToAction("SubmitPatientDetails");
                //}
                //return Request.CreateResponse(HttpStatusCode.OK, sOTP);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
