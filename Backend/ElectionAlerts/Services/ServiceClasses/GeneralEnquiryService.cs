using ElectionAlerts.Dto;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class GeneralEnquiryService : IGeneralEnquiryService
    {
        private readonly IGeneralEnquiryRepository _generalEnquiryRepository;

        public GeneralEnquiryService(IGeneralEnquiryRepository generalEnquiryRepository)
        {
            _generalEnquiryRepository = generalEnquiryRepository;
        }

        public int DeleteArea(int Id)
        {
            return _generalEnquiryRepository.DeleteArea(Id);
        }

        public int DeleteEnquirybyId(int Id)
        {
            return _generalEnquiryRepository.DeleteEnquirybyId(Id);
        }

        public int DeleteTypeofComplaint(int Id)
        {
            return _generalEnquiryRepository.DeleteTypeofComplaint(Id);
        }

        public int DeleteTypeOfForm(int Id)
        {
            return _generalEnquiryRepository.DeleteTypeOfForm(Id);
        }

        public int DeleteTypeofWork(int Id)
        {
            return _generalEnquiryRepository.DeleteTypeofWork(Id);
        }

        public IEnumerable<Area> GetAllArea()
        {
            return _generalEnquiryRepository.GetAllArea();
        }

        public IEnumerable<GeneralEnquiryDTO> GetAllEnquiry(int UserId, int RoleId, int PageNo, int NoofRow, string SearchText)
        {
            return _generalEnquiryRepository.GetAllEnquiry(UserId, RoleId, PageNo, NoofRow, SearchText);
        }

        public IEnumerable<TypeOfComplaint> GetAllTypeOfComplaints()
        {
            return _generalEnquiryRepository.GetAllTypeOfComplaints();
        }

        public IEnumerable<TypeOfForm> GetAllTypeOfForms()
        {
            return _generalEnquiryRepository.GetAllTypeOfForms();
        }

        public IEnumerable<TypeofWork> GetAllTypeofWorks()
        {
            return _generalEnquiryRepository.GetAllTypeofWorks();
        }

        public IEnumerable<GeneralEnquiryDTO> GetEnquirybyDate(int UserId, int RoleId, int PageNo, int NoofRow, string FromDate, string ToDate)
        {
            return _generalEnquiryRepository.GetEnquirybyDate(UserId, RoleId, PageNo, NoofRow, FromDate,ToDate);
        }

        public IEnumerable<GeneralEnquiry> GetEnquirybyId(int Id)
        {
            return _generalEnquiryRepository.GetEnquirybyId(Id);
        }

        public int InsertArea(Area area)
        {
            return _generalEnquiryRepository.InsertArea(area);
        }

        public int InsertTypeofComplaint(TypeOfComplaint typeOfComplaint)
        {
            return _generalEnquiryRepository.InsertTypeofComplaint(typeOfComplaint);
        }

        public int InsertTypeOfForm(TypeOfForm typeOfForm)
        {
            return _generalEnquiryRepository.InsertTypeOfForm(typeOfForm);
        }

        public int InsertTypeofWork(TypeofWork typeofWork)
        {
            return _generalEnquiryRepository.InsertTypeofWork(typeofWork);
        }

        public int InsertUpdateGeneralEnquiry(GeneralEnquiry generalEnquiry)
        {
            return _generalEnquiryRepository.InsertUpdateGeneralEnquiry(generalEnquiry);
        }
    }
}
