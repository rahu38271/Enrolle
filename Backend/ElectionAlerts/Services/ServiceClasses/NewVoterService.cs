using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class NewVoterService : INewVoterService
    {
        private readonly INewVoterRepository _newVoterRepository;

        public NewVoterService(INewVoterRepository newVoterRepository)
        {
            _newVoterRepository = newVoterRepository;
        }

        public int DeleteNewVoterbyId(int Id)
        {
            return _newVoterRepository.DeleteNewVoterbyId(Id);
        }

        public IEnumerable<NewVoter> GetAllNewVoter(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            return _newVoterRepository.GetAllNewVoter(UserId, RoleId, PageNo, NoofRow, SearchText);
        }

        public int NewVoterInsertUpdate(NewVoter newVoter)
        {
            return _newVoterRepository.InsertUpdateNewVoter(newVoter);
        }
    }
}
