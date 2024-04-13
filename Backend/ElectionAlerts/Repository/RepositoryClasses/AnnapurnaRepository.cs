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
    public class AnnapurnaRepository : IAnnapurnaRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private CustomContext _custonContext;
        public AnnapurnaRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _custonContext = new CustomContext(_httpContextAccessor); 
        }
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

        public IEnumerable<AnnapurnaDTO> GetAllAnnapurnawithPage(int PageNo, int NoofRow)
        {
            try
            {
                return _custonContext.Set<AnnapurnaDTO>().FromSqlRaw("EXEC USP_GetAllAnnapurna_Page {0},{1}", PageNo,NoofRow).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<AnnapurnaBeneficiary> GetAnnapurnaBeneficiariesFromTo(string Name, string FromDate, string ToDate)
        {
            try
            {
                return _custonContext.Set<AnnapurnaBeneficiary>().FromSqlRaw("Exec USP_AnnapurnaBenefeciaryFromToDate {0},{1},{2}", Name, FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Annapurna> GetAnnapurnabyId(int Id)
        {
            try
            {
                return _custonContext.Set<Annapurna>().FromSqlRaw("Exec USP_GetAllAnnapurnabyId {0}", Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Annapurna> GetAnnapurnaFromTo(string Name, string FromDate, string ToDate)
        {
            try
            {
                return _custonContext.Set<Annapurna>().FromSqlRaw("Exec USP_AnnapurnaFromToDate {0},{1},{2}", Name, FromDate, ToDate);
            }
            catch (Exception ex)
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

        public int InsertUpdateAnnapurnaBeneficiary(AnnapurnaBeneficiary annapurna)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec Usp_InsertUpdateAnnapurnaBeneficiary {0},{1},{2},{3},{4},{5},{6}", annapurna.Id, annapurna.FullName, annapurna.Relation, annapurna.PhoneNo, annapurna.BenefittedDate, annapurna.SupplyGiven,annapurna.ANPId);
            }
            catch (Exception ex)
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
