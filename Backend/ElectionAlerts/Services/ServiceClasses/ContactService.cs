using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectionAlerts.Model;
using ElectionAlerts.Repository.Interface;
using ElectionAlerts.Services.Interface;

namespace ElectionAlerts.Services.ServiceClasses
{
    public class ContactService:IContactService
    {
        private IContactReposritory _icontactreposritory;
        public ContactService(IContactReposritory contactreposritory)
        {
            _icontactreposritory = contactreposritory;
        }

        public IEnumerable<Contact> GetContacts(int PageNo, int NoofRow, string SearchText)
        {
            return _icontactreposritory.GetContacts(PageNo, NoofRow, SearchText);
        }
        public int InsertSingleContact(Contact contact)
        {
            return _icontactreposritory.InsertSingleContact(contact);
        }
        public int InsertBulkContact(List<Contact> contact)
        {
            return _icontactreposritory.InsertBulkContact(contact);
        }

        public int UpdateSingleContact(Contact contact)
        {
            return _icontactreposritory.UpdateSingleContact(contact);
        }

        public int DeleteContactbyId(int Id)
        {
            return _icontactreposritory.DeleteContactbyId(Id);
        }
    }
}
