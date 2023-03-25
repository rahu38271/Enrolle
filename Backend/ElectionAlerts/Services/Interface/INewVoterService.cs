using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface INewVoterService
    {
        int NewVoterInsertUpdate(NewVoter newVoter);
        int DeleteNewVoterbyId(int Id);
        IEnumerable<NewVoter> GetAllNewVoter();
    }
}
