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
    public class AnnapurnaRepository : IAnnapurnaRepository
    {
        private CustomContext _custonContext = new CustomContext();

        public int DeletebyId(int Id)
        {
           try
            {
                return _custonContext.Database.ExecuteSqlRaw("EXEC USP_DeleteAnnapurnabyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteFamilybyId(int Id)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("EXEC USP_DeleteFamilybyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Annapurna> GetAllAnnapurna()
        {
           try
            {
                return _custonContext.Set<Annapurna>().FromSqlRaw("EXEC USP_GetAllAnnapurna").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Family> GetFamilybyId(int ANPID)
        {
            try
            {
                return _custonContext.Set<Family>().FromSqlRaw("Exec USP_GetFamilybyANPId {0}", ANPID).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertUpdate(Annapurna annnapurna)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("EXEC USP_InsertUpdateAnnapurna {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20}", annnapurna.Id, annnapurna.FirstName, annnapurna.MiddleName, annnapurna.LastName, annnapurna.PhoneNo, annnapurna.AltPhoneNo, annnapurna.Chal_SocietyName, annnapurna.PresentAddress, annnapurna.Area, annnapurna.YadiNo_PartNo, annnapurna.SrNo, annnapurna.EpicNo, annnapurna.VoterNo, annnapurna.TokenDate, annnapurna.TokenNo, annnapurna.VolunterName, annnapurna.CardDone, annnapurna.NewEntry_Remarks,DateTime.Now,annnapurna.ANPId,annnapurna.Relation);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertUpdateFamily(Family family)
        {

            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateFamily {0},{1},{2},{3},{4},{5},{6}", family.Id, family.FullName, family.ContactNo, family.AltContactNo, family.Address, family.ANPId,family.Relation);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
