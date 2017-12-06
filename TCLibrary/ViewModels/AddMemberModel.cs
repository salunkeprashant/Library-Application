using System;

namespace TCLibrary.ViewModels
{
    public class AddMemberModel
    {
        public string AddressLine { get; set; }
        public string CityName { get; set; }
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string LastName { get; set; }
        public int MemberId { get; set; }
        public long? MobileNo { get; set; }
        public string StateName { get; set; }
    }
}