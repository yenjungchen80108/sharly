import { ValidateProps } from '../../../api-lib/constants';
import { findCards, insertCard, updateCardById, findCardById, deleteCardById } from '../../../api-lib/db';
import { auths, database, validateBody } from '../../../api-lib/middlewares';
import { ncOpts } from '../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const cards = await findCards(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ cards });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      title: ValidateProps.card.title,
      content: ValidateProps.card.content,
      image: ValidateProps.card.image,
      tags: ValidateProps.card.tags
    },
    required: ['title'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const card = await insertCard(req.db, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      tags: req.body.tags,
      creatorId: req.user._id,
    });

    return res.json({ card });
  }
);

handler.patch(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      title: ValidateProps.card.title,
      content: ValidateProps.card.content,
      image: ValidateProps.card.image,
      tags: ValidateProps.card.tags
    }
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const { _id, title, content, image, tags  } = req.body;
    // const newCard = { rest };
    // const card = await findCardById(req.db, _id);
    // if (!card) {
    //   return res.status(404).json({ error: { message: 'Card is not found PATCH.' } });
    // }
    const cards = await updateCardById(req.db, _id, { title, content, image, tags });

    res.json({ cards });
  }
);

handler.delete(
  ...auths,
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const { _id  } = req.body;
    // const newCard = { rest };
    // const card = await findCardById(req.db, _id);
    // if (!card) {
    //   return res.status(404).json({ error: { message: 'Card is not found PATCH.' } });
    // }
    const cards = await deleteCardById(req.db, _id);

    res.json({ cards });
  }
);

export default handler;
