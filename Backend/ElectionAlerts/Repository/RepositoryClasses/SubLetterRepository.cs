using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class SubLetterRepository : ISubLetterRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _customContext;
        public SubLetterRepository(IHttpContextAccessor httpContextAccessor)
        {
           _httpContextAccessor = httpContextAccessor;
           _customContext = new CustomContext(_httpContextAccessor);
        }
        public int CreateUpdateSubLetter(SubLetter subLetter)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateSubLetter {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12}", subLetter.Id, subLetter.Letter_No, subLetter.Letter_Realese_Date, subLetter.To_Other_Department, subLetter.Department_Name, subLetter.Office_Name, subLetter.Remark, subLetter.FileName, subLetter.Status, subLetter.UserId, subLetter.UserName, DateTime.Now,subLetter.LetterID);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteSubLetterbyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteSubLetterbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SubLetterDTO> GetAllSubLetter(int UserId, int RoleId, int PageNo, int NoofRow)
        {
            try
            {
                return _customContext.Set<SubLetterDTO>().FromSqlRaw("Exec USP_GetAllSubLetter {0},{1},{2},{3}", UserId, RoleId, PageNo, NoofRow);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SubLetter> GetSubLetterbyId(int Id)
        {
            try
            {
                return _customContext.Set<SubLetter>().FromSqlRaw("Exec USP_GetSubLetterbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SubLetter> GetSubLettersbyLetterId(int Id)
        {
            try
            {
                return _customContext.Set<SubLetter>().FromSqlRaw("Exec USP_DownloadFilebyId {0}", Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SubLetterDTO> SubletterbyLetterNo(string LetterNo)
        {
            try
            {
                return _customContext.Set<SubLetterDTO>().FromSqlRaw("Exec Usp_SubletterbyLetterNo {0}", LetterNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
