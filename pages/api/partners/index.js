import { ValidateProps } from '../../../api-lib/constants';
import { findPartners, insertPartner, updatePartnerById, findPartnerById, deletePartnerById } from '../../../api-lib/db';
import { auths, database, validateBody } from '../../../api-lib/middlewares';
import { ncOpts } from '../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const partners = await findPartners(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(5, 10) : undefined
  );

  res.json({ partners });
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
    additionalProperties: true,
  }),
  async (req, res) => {
    // if (!req.user) {
    //   return res.status(401).end();
    // }

    const partner = await insertPartner(req.db, {
      partnerId: req.body.partnerId,
      title: req.body.title,
      year: req.body.year,
      content: req.body.content,
      image: req.body.image,
      tags: req.body.tags,
      accountInfo: req.body.accountInfo
      // creatorId: req.user._id,
    });
    // console.log('partner',partner);
    return res.json({ partner });
  }
);

handler.patch(
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
    }
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const { _id, partnerId, title, year, content, image, tags, accountInfo  } = req.body;
    // const newPartner = { rest };
    // const partner = await findpartnerById(req.db, _id);
    // if (!partner) {
    //   return res.status(404).json({ error: { message: 'partner is not found PATCH.' } });
    // }
    const partners = await updatePartnerById(req.db, _id, { partnerId, title, year, content, image, tags, accountInfo });

    res.json({ partners });
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
    const partners = await deletePartnerById(req.db, _id);

    res.json({ partners });
  }
);

export default handler;
