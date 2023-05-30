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
    }
}
