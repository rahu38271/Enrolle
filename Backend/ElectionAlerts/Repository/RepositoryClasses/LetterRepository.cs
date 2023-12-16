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
    public class LetterRepository : ILetterRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _customContext;
        public LetterRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _customContext = new CustomContext(_httpContextAccessor);
        }
        public int AddUpdateLetter(Letter letter)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateLetter {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20}",letter.Id, letter.CaseNo, letter.Letter_Request_Person, letter.Subject, letter.Mobile_No, letter.Office, letter.Department, letter.BirthDate, letter.Refference_Name, letter.Address, letter.District, letter.Taluka, letter.Village, letter.Letter_Outward_No, letter.Letter_Release_Date, letter.Letter_Submit_Date, letter.Status, letter.FileName, letter.UserId, DateTime.Now,letter.UserName);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int CreateUpdateDepartment(Departmet departmet)
        {
            try
            {
              return  _customContext.Database.ExecuteSqlRaw("Exec Usp_CreateUpdateDepartment {0},{1}", departmet.Id, departmet.Department_Name);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int CreateUpdateOffice(Office office)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec Usp_CreateUpdateOffice {0},{1}", office.Id, office.Office_Name);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteLetterbyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteLetterbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<LetterDTO> GetAllLetter(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _customContext.Set<LetterDTO>().FromSqlRaw("Exec USP_GetAllLetter {0},{1},{2},{3},{4}", UserId, RoleId, PageNo, NoofRow, SearchText);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<LetterDashBoard> GetDashBoardCount(int UserId, int RoleId)
        {
            try
            {
                return _customContext.Set<LetterDashBoard>().FromSqlRaw("Exec USP_LetterDashBoard {0},{1}",UserId,RoleId);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Departmet> GetDepartmet()
        {

            try
            {
                return _customContext.Set<Departmet>().FromSqlRaw("Exec Usp_GetAllDepartment");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Letter> GetLetterById(int Id)
        {
            try
            {
                return _customContext.Set<Letter>().FromSqlRaw("Exec USP_GetLetterbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<LetterDTO> GetLetterbyStatus(int UserId, int RoleId, int PageNo, int NoofRow)
        {
            try
            {
                return _customContext.Set<LetterDTO>().FromSqlRaw("Exec USP_GetLetterbySatus {0},{1},{2},{3}", UserId, RoleId, PageNo, NoofRow);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<LetterDTO> GetLetterbyStatusandDate(int UserId, int RoleId, int PageNo, int NoofRow, string Status, string StartDate, string EndDate, string SearchText)
        {
            try
            {
                return _customContext.Set<LetterDTO>().FromSqlRaw("Exec Usp_GetLetterbySatusandDate {0},{1},{2},{3},{4},{5},{6},{7}",UserId,RoleId,PageNo,NoofRow,Status, StartDate, EndDate, SearchText);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Office> GetOffice()
        {
            try
            {
                return _customContext.Set<Office>().FromSqlRaw("Exec Usp_GetAllOffice");
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
