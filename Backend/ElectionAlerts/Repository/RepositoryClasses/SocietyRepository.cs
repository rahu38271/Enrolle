using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
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
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateSociety {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10}",society.Id, society.Name, society.Chairman, society.PhoneNo, society.AltPhoneNo, society.Address, society.PinCode, society.WardNo, society.Taluka, society.District, DateTime.Now);
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

        public IEnumerable<Society> GetAllSociety()
        {
            try
            {
                return _custonContext.Set<Society>().FromSqlRaw("Exec USP_GetAllSociety").ToList();
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

        public IEnumerable<SocietyComplaint> GetComplaintsbyStatus(string Status)
        {
            try
            {
                return _custonContext.Set<SocietyComplaint>().FromSqlRaw("Exec USP_GetComplaintbyStatus {0}", Status).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public SocietyComplaint GetSocietyComplaintbyId(int UserId)
        {
            try
            {
                return _custonContext.Set<SocietyComplaint>().FromSqlRaw("Exec USP_GetSocietyComplaintbyId {0}",UserId).ToList().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SocietyComplaint> GetSocietyComplaints()
        {
            try
            {
                return _custonContext.Set<SocietyComplaint>().FromSqlRaw("Exec USP_GetAllSocietyComplaint").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SocietyComplaint> GetTodayComplaint()
        {
            try
            {
                return _custonContext.Set<SocietyComplaint>().FromSqlRaw("Exec Usp_GetTodaySocietyComplaint").ToList();
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
                string filename="";
                if (societyModel.FileName!=null)
                {
                    filename = Path.GetFileName(societyModel.FileName);
                    var fullPath= Path.Combine( Directory.GetCurrentDirectory(), @"wwwroot\SocietyImages");
                    var filePath = Path.Combine(fullPath, filename);
                    if (!Directory.Exists(fullPath))
                        Directory.CreateDirectory(fullPath);
                    if (File.Exists(filePath))
                    {
                        throw new IOException("File Already Exit");
                    }
                 //   File.Copy(societyModel.FileName, filePath);
                }
                
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateSocietyComplaint {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11}", societyModel.Id, societyModel.Subject, societyModel.FromDate, societyModel.ToDate, societyModel.Details, societyModel.Remark, filename, societyModel.UserId, societyModel.RoleId, societyModel.UserName, DateTime.Now,societyModel.Status);
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
