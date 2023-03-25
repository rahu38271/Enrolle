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
    public class SocietyRepository : ISocietyRepository
    {
        private CustomContext _custonContext = new CustomContext();
        public int CreateUpdateSociety(Society society)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateSociety {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10}",society.Id, society.Name, society.Chairman, society.PhoneNo, society.AltPhoneNo, society.Address, society.PinCode, society.WardNo, society.Taluka, society.District, DateTime.Now);
            }
            catch(Exception ex)
            {
                throw ex;
            }

        }

        public int DeleteSocietybuId(int Id)
        {
            try
            {
                return _custonContext.Database.ExecuteSqlRaw("Exec USP_DeleteSocietybyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Society> GetAllSociety()
        {
            try
            {
                return _custonContext.Set<Society>().FromSqlRaw("Exec USP_GetAllSociety").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
