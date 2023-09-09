using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class LetterService : ILetterService
    {
        private readonly ILetterRepository _letterRepository;

        public LetterService(ILetterRepository letterRepository)
        {
            _letterRepository = letterRepository;
        }
        public int AddUpdateLetter(Letter letter)
        {
            try
            {
                return _letterRepository.AddUpdateLetter(letter);
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
                return _letterRepository.CreateUpdateDepartment(departmet);
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
                return _letterRepository.CreateUpdateOffice(office);
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
                return _letterRepository.DeleteLetterbyId(Id);
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
                return _letterRepository.GetAllLetter(UserId, RoleId, PageNo, NoofRow, SearchText);
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
                return _letterRepository.GetDashBoardCount(UserId, RoleId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Departmet> GetDepartmet()
        {
            try
            {
                return _letterRepository.GetDepartmet();
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
                return _letterRepository.GetLetterById(Id);
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
                return _letterRepository.GetLetterbyStatus(UserId, RoleId, PageNo, NoofRow);
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
                return _letterRepository.GetLetterbyStatusandDate(UserId, RoleId,PageNo,NoofRow,Status, StartDate, EndDate, SearchText);
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
                return _letterRepository.GetOffice();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
