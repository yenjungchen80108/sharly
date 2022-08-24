import { ValidateProps } from '../../../api-lib/constants';
import { findDonateItems, insertDonateItem, updateDonateItemById, findDonateItemById, deleteDonateItemById } from '../../../api-lib/db';
import { auths, database, validateBody } from '../../../api-lib/middlewares';
import { ncOpts } from '../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const donateItems = await findDonateItems(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(5, 10) : undefined
  );

  res.json({ donateItems });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      // itemId: ValidateProps.donateItem.itemId,
      partnerId: ValidateProps.donateItem.partnerId,
      itemName: ValidateProps.donateItem.itemName,
      size: ValidateProps.donateItem.size,
      brand: ValidateProps.donateItem.brand,
      info: ValidateProps.donateItem.info,
      status: ValidateProps.donateItem.status,
      time: ValidateProps.donateItem.time,
      category: ValidateProps.donateItem.category,
      img: ValidateProps.donateItem.img,
      demand: ValidateProps.donateItem.demand
    },
    // required: ['_id'],
    additionalProperties: true,
  }),
  async (req, res) => {
    // if (!req.user) {
    //   return res.status(401).end();
    // }

    const donateItem = await insertDonateItem(req.db, {
      // _id: req.body._id,
      partnerId: req.body.partnerId,
      itemName: req.body.itemName,
      size: req.body.size,
      brand: req.body.brand,
      info: req.body.info,
      status: req.body.status,
      time: req.body.time,
      category: req.body.category,
      img: req.body.img,
      demand: req.body.demand,
      // creatorId: req.user._id,
    });
    // console.log('partner',partner);
    return res.json({ donateItem });
  }
);

handler.patch(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      _id: ValidateProps.donateItem._id,
      partnerId: ValidateProps.donateItem.partnerId,
      itemName: ValidateProps.donateItem.itemName,
      size: ValidateProps.donateItem.size,
      brand: ValidateProps.donateItem.brand,
      info: ValidateProps.donateItem.info,
      status: ValidateProps.donateItem.status,
      time: ValidateProps.donateItem.time,
      category: ValidateProps.donateItem.category,
      img: ValidateProps.donateItem.img,
      demand: ValidateProps.donateItem.demand
    }
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const { _id, partnerId, itemName, size, brand, info,
      status, time, category, img, demand  } = req.body;
    // const newPartner = { rest };
    // const partner = await findpartnerById(req.db, _id);
    // if (!partner) {
    //   return res.status(404).json({ error: { message: 'partner is not found PATCH.' } });
    // }
    const donateItems = await updateDonateItemById(req.db, _id, { partnerId, itemName, size, brand, info,
      status, time, category, img, demand });

    res.json({ donateItems });
  }
);

handler.delete(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const { _id } = req.body;
    // const newpartner = { rest };
    // const partner = await findpartnerById(req.db, _id);
    // if (!partner) {
    //   return res.status(404).json({ error: { message: 'partner is not found PATCH.' } });
    // }
    const donateItems = await deleteDonateItemById(req.db, _id);

    res.json({ donateItems });
  }
);

export default handler;
