using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ILetterService
    {
        int AddUpdateLetter(Letter letter);
        IEnumerable<LetterDTO> GetAllLetter(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<Letter> GetLetterById(int Id);
        int DeleteLetterbyId(int Id);
        int CreateUpdateDepartment(Departmet departmet);
        int CreateUpdateOffice(Office office);
        IEnumerable<Departmet> GetDepartmet();
        IEnumerable<Office> GetOffice();
        IEnumerable<LetterDTO> GetLetterbyStatusandDate(int UserId, int RoleId, int PageNo, int NoofRow, string Status, string StartDate, string EndDate, string SearchText);
        IEnumerable<LetterDashBoard> GetDashBoardCount(int UserId, int RoleId);
        IEnumerable<LetterDTO> GetLetterbyStatus(int UserId, int RoleId, int PageNo, int NoofRow);
    }
}
