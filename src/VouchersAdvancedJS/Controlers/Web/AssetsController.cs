using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Vouchers.Controlers.Web
{
    [Route("api/[controller]")]
    public class AssetsController : Controller
    {
        private VouchersDBContext ctx;

        public AssetsController(VouchersDBContext context)
        {
            ctx = context;
        }

        // GET: api/Assets
        [HttpGet]
        public IEnumerable<Asset> Get()
        {
            var assets = ctx.Assets.OrderByDescending(v => v.PurchaseDate).ToList();
            return assets;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Asset Get(int id)
        {
            return ctx.Assets.FirstOrDefault(v => v.ID == id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Asset value)
        {
            if (value.ID == 0)
            {
                ctx.Assets.Add(value);
            }
            else
            {
                var asset = ctx.Assets.FirstOrDefault(f => f.ID == value.ID);
                if (asset != null)
                {
                    Mapper.CopyData(value, asset);
                }
            }
            ctx.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/assets/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var remId = Get(id);
            if (remId != null)
            {
                ctx.Remove(remId);
                ctx.SaveChanges();
            }
        }
    }
}
