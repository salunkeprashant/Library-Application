using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TCLibrary.Model
{
    public partial class ContactDetail
    {
        [Key]
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string EmailAddress { get; set; }
        public long MobileNo { get; set; }

        public Member Members { get; set; }
    }
}
