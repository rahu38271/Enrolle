using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Dto;
using ElectionAlerts.Model;

namespace ElectionAlerts.Repository.Interface
{
    public interface IContactReposritory
    {
        IEnumerable<Contact> GetContacts(int PageNo,int NoofRow,string SearchText);
        int InsertSingleContact(Contact contact);
        int InsertBulkContact(List<Contact> contact);
        int UpdateSingleContact(Contact contact);
        int DeleteContactbyId(int Id);

    }
}
