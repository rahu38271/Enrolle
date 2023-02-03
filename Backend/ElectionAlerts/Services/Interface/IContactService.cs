using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;

namespace ElectionAlerts.Services.Interface
{
    public interface IContactService
    {
        IEnumerable<Contact> GetContacts();
        int InsertSingleContact(Contact contact);
        int InsertBulkContact(List<Contact> contact);
        int UpdateSingleContact(Contact contact);
    }
}
