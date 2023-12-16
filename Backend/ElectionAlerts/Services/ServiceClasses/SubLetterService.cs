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
    public class SubLetterService : ISubLetterService
    {
        private readonly ISubLetterRepository _subLetterRepository;

        public SubLetterService(ISubLetterRepository subLetterRepository)
        {
            _subLetterRepository = subLetterRepository;
        }
        public int CreateUpdateSubLetter(SubLetter subLetter)
        {
            try
            {
                return _subLetterRepository.CreateUpdateSubLetter(subLetter);
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
                return _subLetterRepository.DeleteSubLetterbyId(Id);
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
                return _subLetterRepository.GetAllSubLetter(UserId, RoleId, PageNo, NoofRow);
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
                return _subLetterRepository.GetSubLetterbyId(Id);
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
                return _subLetterRepository.GetSubLettersbyLetterId(Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
