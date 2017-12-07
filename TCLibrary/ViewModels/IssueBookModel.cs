using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TCLibrary.ViewModels
{
    public class IssueBookModel
    {
        public int? AdminId { get; set; }
        public int? BookId { get; set; }
        public int ISBN { get; set; }
        public DateTime? IssueDate { get; set; }
        public int? MemberId { get; set; }
    }
}
