import { ValidateProps } from "../../../api-lib/constants";
import {
  findDonateItems,
  countDonateItems,
  insertDonateItem,
  updateDonateItemById,
  findDonateItemById,
  deleteDonateItemById,
} from "../../../api-lib/db";
import { auths, database, validateBody } from "../../../api-lib/middlewares";
import { ncOpts } from "../../../api-lib/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(database);

const ITEMS_PER_PAGE = 6;
handler.get(async (req, res) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * ITEMS_PER_PAGE;
  // get all items in donate item table
  const donateInfoAll = await countDonateItems(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by
  );
  const countPromise = donateInfoAll.length;
  // add skip and limit query for pagination
  const donateInfo = await findDonateItems(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.skip ? req.query.skip : skip,
    req.query.limit ? +req.query.limit : ITEMS_PER_PAGE
  );
  const [count, items] = await Promise.all([countPromise, donateInfo]);
  const pageCount = Math.ceil(countPromise / ITEMS_PER_PAGE);

  return res.json({
    pagination: {
      count,
      pageCount,
    },
    donateItems: items,
  });
});

handler.post(
  ...auths,
  validateBody({
    type: "object",
    properties: {
      ...ValidateProps.donateItem,
    },
    // required: ['_id'],
    additionalProperties: true,
  }),
  async (req, res) => {
    const donateItem = await insertDonateItem(req.db, {
      // _id: req.body._id,
      // creatorId: req.user._id,
      partnerId: req.body.partnerId,
      itemName: req.body.itemName,
      subTitle: req.body.subTitle,
      size: req.body.size,
      brand: req.body.brand,
      info: req.body.info,
      status: req.body.status,
      time: req.body.time,
      category: req.body.category,
      img: req.body.img,
      demand: req.body.demand,
    });
    return res.json({ donateItem });
  }
);

handler.patch(
  ...auths,
  validateBody({
    type: "object",
    properties: {
      _id: ValidateProps.donateItem._id,
      partnerId: ValidateProps.donateItem.partnerId,
      itemName: ValidateProps.donateItem.itemName,
      subTitle: ValidateProps.donateItem.subTitle,
      size: ValidateProps.donateItem.size,
      brand: ValidateProps.donateItem.brand,
      info: ValidateProps.donateItem.info,
      status: ValidateProps.donateItem.status,
      time: ValidateProps.donateItem.time,
      category: ValidateProps.donateItem.category,
      img: ValidateProps.donateItem.img,
      demand: ValidateProps.donateItem.demand,
    },
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const {
      _id,
      partnerId,
      itemName,
      subTitle,
      size,
      brand,
      info,
      status,
      time,
      category,
      img,
      demand,
    } = req.body;

    const donateItems = await updateDonateItemById(req.db, _id, {
      partnerId,
      itemName,
      subTitle,
      size,
      brand,
      info,
      status,
      time,
      category,
      img,
      demand,
    });

    res.json({ donateItems });
  }
);

handler.delete(...auths, async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  const { _id } = req.body;
  const donateItems = await deleteDonateItemById(req.db, _id);

  res.json({ donateItems });
});

export default handler;
