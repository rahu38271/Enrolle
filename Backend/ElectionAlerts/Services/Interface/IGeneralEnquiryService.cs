using ElectionAlerts.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAlerts.Services.Interface
{
    public interface IGeneralEnquiryService
    {
        int InsertTypeofWork(TypeofWork typeofWork);
        int InsertArea(Area area);
        int InsertTypeOfForm(TypeOfForm typeOfForm);
        int InsertTypeofComplaint(TypeOfComplaint typeOfComplaint);
    }
}
