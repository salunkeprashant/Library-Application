using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LibraryApplication.Model
{
    public partial class Address
    {
        [Key]
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string AddressLine { get; set; }
        public string CityName { get; set; }
        public string StateName { get; set; }
       
        public Member Members { get; set; }
    }
}
