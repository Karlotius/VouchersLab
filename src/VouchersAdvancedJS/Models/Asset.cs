using System;

namespace Vouchers
{
    public class Asset
    {
        public int ID { get; set; }
        public string Text { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime ActivatedOn { get; set; }
        public decimal Periods { get; set; }
        public decimal Value { get; set; }
    }
}
