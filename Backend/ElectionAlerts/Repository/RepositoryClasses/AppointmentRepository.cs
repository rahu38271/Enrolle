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
    public class AppointmentRepository : IAppointmentRepository
    {
        private CustomContext _customContext=new CustomContext();

        public int DeleteAppointmentbyId(int Id)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_DeleteAppointmetbyId {0}", Id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointmentbyDate(DateTime dateTime)
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAppointmentbyDate {0}", dateTime ).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Appointment> GetAppointments()
        {
            try
            {
                return _customContext.Set<Appointment>().FromSqlRaw("EXEC USP_GetAllAppointment").ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int InsertUpdateAppintment(Appointment appointment)
        {
            try
            {
                return _customContext.Database.ExecuteSqlRaw("EXEC USP_InsertUpdateAppointment {0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10},{11},{12},{13},{14},{15},{16},{17},{18},{19}", appointment.Id, appointment.FirstName,appointment.MiddleName,appointment.LastName,appointment.BirthDate,appointment.PhoneNo,appointment.AppointmentDate,appointment.Category,appointment.Work,appointment.Other,appointment.District,appointment.Taluka,appointment.HouseNo,appointment.Soc_BldgName,appointment.WardNo,appointment.PinCode,appointment.City_Village,appointment.Remark,appointment.FileName,DateTime.Now);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
