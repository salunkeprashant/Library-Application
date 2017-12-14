using System;

namespace TCLibrary.ViewModels
{
    public class ReturnBookModel
    {
        public int TransactionId { get; set; }
        public DateTime? ReturnDate { get; set; }
        public Guid BookId { get; set; }
    }
}
