using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;

namespace ElectionAlerts.Services.Interface
{
    public interface IContactService
    {
        IEnumerable<ContactwithCount> GetContacts(int PageNo, int NoofRow, string SearchText);
        int InsertSingleContact(Contact contact);
        int InsertBulkContact(List<BulkContact> contact);
        int UpdateSingleContact(Contact contact);
        int DeleteContactbyId(int Id);
        IEnumerable<Contact> GetContacts();
    }
}
