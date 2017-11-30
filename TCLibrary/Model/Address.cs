using System;
using System.Collections.Generic;

namespace TCLibrary.Model
{
    public partial class Address : CommonEntityBase
    {
        #region Class Extensibility Methods
        partial void OnCreated();
        #endregion

        public Address() : base()
        {
            OnCreated();
        }

        public int AddressId { get; set; }
        public string AddressLine { get; set; }
        public string CityName { get; set; }
        public string StateName { get; set; }
        public int? MemberId { get; set; }

        public Member Members { get; set; }
    }
}
