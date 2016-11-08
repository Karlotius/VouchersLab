using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Vouchers.Controlers.Web
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private VouchersDBContext ctx;

        public AccountsController(VouchersDBContext context)
        {
            ctx = context;
        }

        [HttpGet]
        public IEnumerable<BalanceAccount> Get()
        {
            return ctx.BalanceAccounts.OrderBy(f => f.Name);
        }

        [HttpGet("{id}")]
        public BalanceAccount Get(int id)
        {
            return ctx.BalanceAccounts.FirstOrDefault(f=>f.ID == id);
        }

        [HttpPost]
        public void Post([FromBody]BalanceAccount value)
        {
            if (value.ID == 0)
            {
                ctx.BalanceAccounts.Add(value);                
            }
            else
            {
                var acct = ctx.BalanceAccounts.FirstOrDefault(f => f.ID == value.ID);
                if (acct != null)
                {
                    Mapper.CopyData(value, acct);
                }
            }
            ctx.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
