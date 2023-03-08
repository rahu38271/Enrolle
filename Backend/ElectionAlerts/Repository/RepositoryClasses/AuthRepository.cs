using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    //public enum Role { SuperAdmin = 1, Admin = 2, Volunteer = 3,Default=0};
    public class AuthRepository : IAuthRepository
    {
        private CustomContext _customContext;
        private MasterCustomContext _MastercustomContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthRepository(IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _customContext = new CustomContext(_httpContextAccessor);
            _MastercustomContext = new MasterCustomContext(_httpContextAccessor);
        }
        public IEnumerable<UserModel> Login(string username, string password)
        {
            try
            {
                var user= _customContext.Set<User>().FromSqlRaw("EXEC USP_Login {0},{1}", username, password).ToList();
                var role = _customContext.Set<Role>().FromSqlRaw("USP_GetAllRole").ToList();
                //var userdetail= _mapper.Map<List<UserModel>>(user);
                //return userdetail;
                //var RoleName = ((Role)1).ToString();
                //var userdetails= user.Select(x => new UserModel { Id = x.Id, Username = x.Name, Contact = x.Contact, Email = x.Email, Name = x.Name, RoleId = x.RoleId, RoleName = ((Role)x.RoleId).ToString() });
                var userdetails = from u in user join r in role on u.RoleId equals r.RoleID select new UserModel{Id=u.Id,Username=u.UserName,Contact=u.Contact,Email=u.Email,Name=u.Name,RoleId=u.RoleId,RoleName=r.RoleName, AdminId=u.AdminId };
                return userdetails;
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
                string url = "http://45.114.143.189/api/mt/SendSMS?username=prolittechnologies&password=prolit3214&senderid=Prolit&type=0&destination=" + contact + "&text=" + msg + "&peid=%201301165123633080685";
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

                for (int i = 0; i < 4; i++)

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

        public int InsertUser(User user)
        {
            try
            {
                return _MastercustomContext.Database.ExecuteSqlRaw("EXEC Usp_InsertUser {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14}", user.Id,user.Name, user.Contact, user.UserName,  user.Password,user.Email,user.State,user.Taluka,user.AssemblyName,user.village, user.District, user.RoleId, user.CreatedDate, user.IsActive,user.AdminId);
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
                return _MastercustomContext.Database.ExecuteSqlRaw("EXEC Usp_InsertUser {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14}", user.Id, user.Name, user.Contact, user.UserName, user.Password, user.Email, user.State, user.Taluka, user.AssemblyName, user.village, user.District, user.RoleId, user.CreatedDate, user.IsActive, user.AdminId);
                //"EXEC Usp_UpdateUser {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19}", user.Id, user.Name, user.Contact, user.UserName, user.Address, user.Password, user.Email, user.State, user.District, user.Taluka, user.AssemblyName, user.Ward, user.village, user.Candidate, user.Quote, user.RoleId, user.CreatedDate, user.IsActive, user.IsDeleted,user.AdminId);
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
                return _MastercustomContext.Database.ExecuteSqlRaw("EXEC Usp_DeleteUser {0}", Id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public User GetUserbyId(int Id)
        {
            try
            {
                return _MastercustomContext.Set<User>().FromSqlRaw("EXEC Usp_GetUserbyId {0}", Id).AsEnumerable().First();
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
                return _MastercustomContext.Database.ExecuteSqlRaw("EXEC Usp_ChangeUserPassword {0},{1}", id, password);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<User> FilterUserList(Table table)
        {
            try
            {
                return _MastercustomContext.Set<User>().FromSqlRaw("EXEC USP_FilterSP {0},{1},{2}",table.TableName,table.ColumnName,table.ColumnValue).ToList();
            }
            catch(Exception Ex)
            {
                throw Ex;
            }
        }

        public IEnumerable<UserDetail> GetAllUser()
        {
            try
            {
                return _MastercustomContext.Set<UserDetail>().FromSqlRaw("USP_GetAllUser").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

        public int InsertUserAssigned(UserAssigned userAssigned)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertUserDetail {0},{1},{2},{3}", userAssigned.UserId, userAssigned.PartNoAssigned,DateTime.Now,userAssigned.AdminId);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public string GetPartNobyId(int userid)
        {
            try
            {
                var result= _customContext.Set<UserAssigned>().FromSqlRaw("USP_GetPartNumberbyUserid {0}", userid).ToList().FirstOrDefault();
                if (result != null)
                {
                    var partnumber = result.PartNoAssigned;
                    //var details = JObject.Parse(partnumber);
                    //var partname = details["partno"];
                    //string partstring = String.Join(",", partname);
                    return partnumber;
                }
                return string.Empty;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public PartNoAssigned GetPartNoAssigned(int userid)
        {
            try
            {
                var result = _customContext.Set<PartNoAssigned>().FromSqlRaw("USP_GetAllAssignedPartNo {0}", userid).ToList().FirstOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public PartNoAssigned GetPartNoAssignedOtherthanThisuser(int userid)
        {
            try
            {
                var result = _customContext.Set<PartNoAssigned>().FromSqlRaw("USP_GetPartNoAssignedOtherthanThisuser {0}", userid).ToList().FirstOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
