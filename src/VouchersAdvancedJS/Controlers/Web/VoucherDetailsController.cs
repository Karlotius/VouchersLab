using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Vouchers.Api
{
    [Route("api/[controller]")]
    public class VoucherDetailsController : Controller
    {
        private VouchersDBContext ctx;

        public VoucherDetailsController(VouchersDBContext context)
        {
            ctx = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<VoucherDetail> Get()
        {
            var vds = ctx.VoucherDetails.ToList();
            return vds;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public VoucherDetail Get(int id)
        {
            return ctx.VoucherDetails.FirstOrDefault(v => v.ID == id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]VoucherDetail value)
        {
            ctx.VoucherDetails.Add(value);
            ctx.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]VoucherDetail value)
        {
            var v = Get(id);
            if (v != null)
            {
                Mapper.CopyData(value, v);
                ctx.SaveChanges();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var v = Get(id);
            if (v != null)
            {
                ctx.Remove(v);
                ctx.SaveChanges();
            }
        }
    }
}
