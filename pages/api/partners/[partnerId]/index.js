import { ValidateProps } from '../../../../api-lib/constants';
import { findPartnerById, updatePartnerById } from '../../../../api-lib/db';
import { findPartners, insertPartner } from '../../../../api-lib/db';
import { auths, database, validateBody } from '../../../../api-lib/middlewares';
import { ncOpts } from '../../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const partner = await findPartnerById(req.db, req.query.partnerId);

  if (!partner) {
    return res.status(404).json({ error: { message: 'partner is not found GET.' } });
  }

  const partners = await findPartners(
    req.db,
    req.query.partnerId,
    req.query.before ? new Date(req.query.before) : undefined,
    // req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.json({ partners });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      partnerId: ValidateProps.partner.partnerId,
      title: ValidateProps.partner.title,
      year: ValidateProps.partner.year,
      content: ValidateProps.partner.content,
      image: ValidateProps.partner.image,
      tags: ValidateProps.partner.tags,
      accountInfo: ValidateProps.partner.accountInfo
    },
    required: ['partnerId'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const { _id, partnerId, title, year, content, image, tags, accountInfo  } = req.body;
    console.log('req.query',req.query.partnerId);
    const partner = await findPartnerById(req.db, req.query.partnerId);
    if (!partner) {
      return res.status(404).json({ error: { message: 'partner is not found POST.' } });
    }

    const partners = await insertPartner(req.db, partner._id, {
      // creatorId: req.user._id,
      partnerId, title, year, content, image, tags, accountInfo
    });

    return res.json({ partners });
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
