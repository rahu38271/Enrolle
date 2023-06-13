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
        int DeleteTypeofWork(int Id);
        int DeleteArea(int Id);
        int DeleteTypeOfForm(int Id);
        int DeleteTypeofComplaint(int Id);
        IEnumerable<Area> GetAllArea();
        IEnumerable<TypeOfComplaint> GetAllTypeOfComplaints();
        IEnumerable<TypeOfForm> GetAllTypeOfForms();
        IEnumerable<TypeofWork> GetAllTypeofWorks();
        int InsertUpdateGeneralEnquiry(GeneralEnquiry generalEnquiry);
        IEnumerable<GeneralEnquiryDTO> GetAllEnquiry(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText);
        IEnumerable<GeneralEnquiry> GetEnquirybyId(int Id);
        int DeleteEnquirybyId(int Id);
        IEnumerable<GeneralEnquiryDTO> GetEnquirybyDate(int UserId, int RoleId, int PageNo, int NoofRow,string FromDate,string ToDate);
        IEnumerable<GeneralEnquiryDTO> SearchEnquiry(GeneralEnquirySearch generalEnquiry);
        IEnumerable<GeneralEnquiryDTO> GetEnquirybyTypeofWorkAndDate(int UserId, int RoleId, int PageNo, int NoofRow,string TypeofWork, string FromDate, string ToDate);

    }
}
