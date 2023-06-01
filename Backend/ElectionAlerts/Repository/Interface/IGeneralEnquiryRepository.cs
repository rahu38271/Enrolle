using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Repository.Interface
{
    public interface IGeneralEnquiryRepository
    {
        int InsertTypeofWork(TypeofWork typeofWork);
        int InsertArea(Area area);
        int InsertTypeOfForm(TypeOfForm typeOfForm);
        int InsertTypeofComplaint(TypeOfComplaint typeOfComplaint);
        IEnumerable<Area> GetAllArea();
        IEnumerable<TypeOfComplaint> GetAllTypeOfComplaints();
        IEnumerable<TypeOfForm> GetAllTypeOfForms();
        IEnumerable<TypeofWork> GetAllTypeofWorks();
        int InsertUpdateGeneralEnquiry(GeneralEnquiry generalEnquiry);
        IEnumerable<GeneralEnquiryDTO> GetAllEnquiry(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<GeneralEnquiry> GetEnquirybyId(int Id);
        int DeleteEnquirybyId(int Id);
    }
}
