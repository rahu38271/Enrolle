using ElectionAlerts.Model;
using ElectionAlerts.Model.Data;
using ElectionAlerts.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.RepositoryClasses
{
    public class NewVoterRepository : INewVoterRepository
    {
        private CustomContext _customContext = new CustomContext();
        public int InsertUpdateNewVoter(NewVoter newVoter)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertUpdateNewVoter {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21},{22},{23},{24}", newVoter.Id, newVoter.AssemblyNo, newVoter.PartNo, newVoter.FirstName, newVoter.MiddleName, newVoter.LastName, newVoter.MobileNo, newVoter.AltMobileNo, newVoter.DOB, newVoter.HouseNo, newVoter.EpicNo, newVoter.Gender, newVoter.Age, newVoter.SocietyName, newVoter.Zone, newVoter.Address, newVoter.NewAddress, newVoter.Area, newVoter.Favour, newVoter.Remark, newVoter.ReferenceName, newVoter.Position, newVoter.VotingCard, newVoter.PersonalRelation, DateTime.Now);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
