import {createConnection, Repository, Brackets, Not, IsNull} from "typeorm";

import {Flow} from "./entity/Flow";
import {Checkout} from "./entity/Checkout";

createConnection().then(async connection => {
  const flowRepo = await connection.getRepository(Flow);
  const checkoutRepo = await connection.getRepository(Checkout);

  await checkoutRepo.delete({id: Not(IsNull())});
  await flowRepo.delete({id: Not(IsNull())});

  const flow = new Flow();
  await flowRepo.save(flow);

  {
    const checkout1 = new Checkout();
    await checkoutRepo.save(checkout1);
  }

  // Note that you apparently have to re-fetch to trigger the issue,
  // trying to re-save checkout1 doesn't seem to do anything.
  const checkout2 = await checkoutRepo.findOne({id: Not(IsNull())});

  {
    const checkout3 = await checkoutRepo.findOne({id: Not(IsNull())});
    checkout3.flow = flow;
    await checkoutRepo.save(checkout3);
  }

  await checkoutRepo.save(checkout2);

  await connection.close();
});

