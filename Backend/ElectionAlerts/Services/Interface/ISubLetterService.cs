using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface ISubLetterService
    {
        int CreateUpdateSubLetter(SubLetter subLetter);
        IEnumerable<SubLetterDTO> GetAllSubLetter(int UserId, int RoleId, int PageNo, int NoofRow);
        IEnumerable<SubLetter> GetSubLetterbyId(int Id);
        int DeleteSubLetterbyId(int Id);
        IEnumerable<SubLetter> GetSubLettersbyLetterId(int Id);
        IEnumerable<SubLetterDTO> SubletterbyLetterNo(string LetterNo);
    }
}
