using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface INewVoterRepository
    {
        int InsertUpdateNewVoter(NewVoter newVoter);
        int DeleteNewVoterbyId(int Id);
        IEnumerable<NewVoter> GetAllNewVoter(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
    }
}
