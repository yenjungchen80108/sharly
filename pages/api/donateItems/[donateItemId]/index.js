import { ValidateProps } from "../../../../api-lib/constants";
import {
  findDonateItemById,
  updateDonateItemById,
} from "../../../../api-lib/db";
import { findDonateItems, insertDonateItem } from "../../../../api-lib/db";
import { auths, database, validateBody } from "../../../../api-lib/middlewares";
import { ncOpts } from "../../../../api-lib/nc";
import nc from "next-connect";

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const donateItem = await findDonateItemById(req.db, req.query._id);

  if (!donateItem) {
    return res
      .status(404)
      .json({ error: { message: "donate item is not found GET." } });
  }

  const donateItems = await findPartners(
    req.db,
    req.query._id,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.json({ donateItems });
});

handler.post(
  ...auths,
  validateBody({
    type: "object",
    properties: {
      // itemId: ValidateProps.donateItem.itemId,
      partnerId: ValidateProps.donateItem.partnerId,
      size: ValidateProps.donateItem.size,
      itemName: ValidateProps.donateItem.itemName,
      subTitle: ValidateProps.donateItem.subTitle,
      brand: ValidateProps.donateItem.brand,
      info: ValidateProps.donateItem.info,
      status: ValidateProps.donateItem.status,
      time: ValidateProps.donateItem.time,
      category: ValidateProps.donateItem.category,
      img: ValidateProps.donateItem.img,
      demand: ValidateProps.donateItem.demand,
    },
    required: ["_id"],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
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
    // console.log('req.query',req.query._id);
    const donateItem = await findDonateItemById(req.db, req.query._id);
    if (!donateItem) {
      return res
        .status(404)
        .json({ error: { message: "donate item is not found POST." } });
    }

    const donateItems = await insertDonateItem(req.db, donateItem._id, {
      // creatorId: req.user._id,
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

    return res.json({ donateItems });
  }
);

// handler.put(
//   ...auths,
//   validateBody({
//     type: 'object',
//     properties: {
//       title: ValidateProps.partner.title,
//       content: ValidateProps.partner.content,
//       image: ValidateProps.partner.image,
//       tags: ValidateProps.partner.tags
//     },
//     required: ['title'],
//     additionalProperties: false,
//   }),
//   async (req, res) => {
//     if (!req.user) {
//       return res.status(401).end();
//     }

//     const title = req.body.title;
//     const content = req.body.content;
//     const image = req.body.image;
//     const tags = req.body.tags;
//     console.log('req.query',req.query.partnerId);
//     const partner = await findpartnerById(req.db, req.query.partnerId);

//     if (!partner) {
//       return res.status(404).json({ error: { message: 'partner is not found PUT.' } });
//     }

//     const partners = await updatepartnerById(req.db, partner._id, {
//       creatorId: req.user._id,
//       content, title, image, tags
//     });

//     return res.json({ partners });
//   }
// )

export default handler;
