using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class SocietyRepository : ISocietyRepository
    {
        private CustomContext _custonContext = new CustomContext();

        public int CreateUpdateSociety(Society society)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateSociety {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13}",society.Id, society.Name, society.Chairman, society.PhoneNo, society.AltPhoneNo, society.Address, society.PinCode, society.WardNo, society.Taluka, society.District, DateTime.Now, society.UserId, society.AdminId,society.UserName);
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

        public int DeleteSocietybuId(int Id)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_DeleteSocietybyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteSocietyComplaintbyId(int Id)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_DeleteSocietyComplaintbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SocietyDTO> GetAllSociety(int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _custonContext.Set<SocietyDTO>().FromSqlRaw("Exec USP_GetAllSociety {0},{1},{2}",PageNo,NoofRow,SearchText).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ComplaintCount> GetComplaintCount()
        {
            try
            {
                return _custonContext.Set<ComplaintCount>().FromSqlRaw("Exec USP_GetCountofComplaint").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SocietyComplaintDTO> GetComplaintsbyStatus(string Status, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _custonContext.Set<SocietyComplaintDTO>().FromSqlRaw("Exec USP_GetComplaintbyStatus {0},{1},{2},{3}", Status,PageNo,NoofRow,SearchText).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public SocietyComplaint GetSocietyComplaintbyId(int Id)
        {
            try
            {
                return _custonContext.Set<SocietyComplaint>().FromSqlRaw("Exec USP_GetSocietyComplaintbyId {0}", Id).ToList().FirstOrDefault();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public SocietyComplaint GetSocietyComplaintbyUserId(int UserId)
        {
            try
            {
                return _custonContext.Set<SocietyComplaint>().FromSqlRaw("Exec USP_GetSocietyComplaintbyUserId {0}", UserId).ToList().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SocietyComplaintDTO> GetSocietyComplaints(int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _custonContext.Set<SocietyComplaintDTO>().FromSqlRaw("Exec USP_GetAllSocietyComplaint {0},{1},{2}",PageNo,NoofRow,SearchText).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SocietyComplaintDTO> GetTodayComplaint(int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _custonContext.Set<SocietyComplaintDTO>().FromSqlRaw("Exec Usp_GetTodaySocietyComplaint {0},{1},{2}",PageNo,NoofRow,SearchText).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertUpdateSocietyComplaint(SocietyModel societyModel)
        {
 
            try
            {
                  
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateSocietyComplaint {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11}", societyModel.Id, societyModel.Subject, societyModel.FromDate, societyModel.ToDate, societyModel.Details, societyModel.Remark, societyModel.FileName, societyModel.UserId, societyModel.RoleId, societyModel.UserName, DateTime.Now,societyModel.Status);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateComplaintStatus(int Id, string Status)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_UpdateComplaintStatus {0},{1}", Id, Status);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
