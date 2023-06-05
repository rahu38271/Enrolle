using ElectionAlerts.Dto;
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

        public IEnumerable<TypeOfComplaint> GetAllTypeOfComplaints()
        {
            try
            {
                return _customContext.Set<TypeOfComplaint>().FromSqlRaw("Exec USP_GetAllTypeOfComplaint").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<TypeOfForm> GetAllTypeOfForms()
        {
            try
            {
                return _customContext.Set<TypeOfForm>().FromSqlRaw("Exec USP_GetAllTypeOfForm").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<TypeofWork> GetAllTypeofWorks()
        {
            try
            {
                return _customContext.Set<TypeofWork>().FromSqlRaw("Exec USP_GetAllTypeOfWork").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Area> GetAllArea()
        {
            try
            {
                return _customContext.Set<Area>().FromSqlRaw("Exec USP_GetAllArea").ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

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

        public int InsertUpdateGeneralEnquiry(GeneralEnquiry generalEnquiry)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_InsertUpdateEnquiry {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19},{20},{21},{22},{23},{24},{25},{26}", generalEnquiry.Id, generalEnquiry.TypeofWork, generalEnquiry.FullNameStudent, generalEnquiry.BirthDate, generalEnquiry.Society_BuildingName, generalEnquiry.AcknowledgementNumber, generalEnquiry.TypeofForm, generalEnquiry.BillBookNo, generalEnquiry.MobileNo, generalEnquiry.Anniversary, generalEnquiry.Landmark_Locality, generalEnquiry.SubmitDate, generalEnquiry.EpicNo, generalEnquiry.FullName, generalEnquiry.AlternateMobile, generalEnquiry.Gender, generalEnquiry.Area, generalEnquiry.Year, generalEnquiry.TypeofComplaints, generalEnquiry.FullNameParent, generalEnquiry.Email, generalEnquiry.Flat_HouseNo, generalEnquiry.AaddharCardNumber, generalEnquiry.Reference, generalEnquiry.PersonEnteringData, generalEnquiry.UserId, DateTime.Now);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<GeneralEnquiryDTO> GetAllEnquiry(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            try
            {
                return _customContext.Set<GeneralEnquiryDTO>().FromSqlRaw("Exec USP_GetAllGeneralEnquiry {0},{1},{2},{3},{4}", UserId,RoleId,PageNo,NoofRow,SearchText).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<GeneralEnquiry> GetEnquirybyId(int Id)
        {
            try
            {
                return _customContext.Set<GeneralEnquiry>().FromSqlRaw("Exec USP_GetEnquirybyId {0}", Id).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteEnquirybyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteEnquirybyId {0}", Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<GeneralEnquiryDTO> GetEnquirybyDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            try
            {
                return _customContext.Set<GeneralEnquiryDTO>().FromSqlRaw("Exec USP_GetEnquiryFromDate {0},{1},{2},{3},{4},{5}", UserId, RoleId, PageNo, NoofRow, FromDate,ToDate).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteTypeofWork(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteTypeOfWorkbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteArea(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteAreabyId {0}", Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteTypeOfForm(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteTypeofFormbyId {0}", Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteTypeofComplaint(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("Exec USP_DeleteTypeofComplaintbyId {0}", Id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
