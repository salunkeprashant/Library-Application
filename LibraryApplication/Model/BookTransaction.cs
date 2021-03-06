﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryApplication.Model
{
    /// <summary>Class which represents the entity 'BookTransaction'.</summary>
    public partial class BookTransaction
    {
        [Key]
        public int TransactionId { get; set; }
        public DateTime? IssueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int? AdminId { get; set; }
        public Guid BookId { get; set; }
        public int MemberId { get; set; }
        public int? ISBN { get; set; }

        public Admin Admin { get; set; }

        [ForeignKey("BookId")]
        public BookMetadata BookMetadatas { get; set; }

        [ForeignKey("ISBN")]
        public Book Books { get; set; }
        public Member Member { get; set; }


    }
}
