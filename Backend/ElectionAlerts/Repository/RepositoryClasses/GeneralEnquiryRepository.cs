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
    public class GeneralEnquiryRepository : IGeneralEnquiryRepository
    {
        private CustomContext _customContext = new CustomContext();
        public int InsertArea(Area area)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertArea {0}", area.AreaName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertTypeofComplaint(TypeOfComplaint typeOfComplaint)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertTypeOfComplaint {0}", typeOfComplaint.ComplaintName);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertTypeOfForm(TypeOfForm typeOfForm)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertTypeOfForm {0}", typeOfForm.FormName);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int InsertTypeofWork(TypeofWork typeofWork)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC Usp_InsertTypeOfWork {0}", typeofWork.WorkName);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
