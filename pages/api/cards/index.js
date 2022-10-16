import { ValidateProps } from '../../../api-lib/constants';
import { findCards, countCards, insertCard, updateCardById, findCardById, deleteCardById } from '../../../api-lib/db';
import { auths, database, validateBody } from '../../../api-lib/middlewares';
import { ncOpts } from '../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

const ITEMS_PER_PAGE = 5;
handler.get(async (req, res) => {
  const page = req.query.page || 1;
  const skip = (page - 1) * ITEMS_PER_PAGE;
  // add skip and limit query for pagination
  const cardInfo = await findCards(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by,
    req.query.skip ? req.query.skip : skip,
    req.query.limit ? req.query.limit : ITEMS_PER_PAGE
  );
  // get all items in partner table
  const cardInfoAll = await countCards(
    req.db,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.by
  );
  const countPromise = cardInfoAll.length;
  const [count, items] = await Promise.all([countPromise, cardInfo]);
  const pageCount = Math.ceil(countPromise / ITEMS_PER_PAGE);
  return res.json({ 
    pagination: {
      count,
      pageCount
    },
    cards: items })
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      title: ValidateProps.card.title,
      content: ValidateProps.card.content,
      image: ValidateProps.card.image,
      category: ValidateProps.card.category,
      tags: ValidateProps.card.tags
    },
    required: ['title'],
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const { title, content, image, category, tags } = req.body
    const cards = await insertCard(req.db, {
      title, content, image, category, tags,
      creatorId: req.user._id,
    });

    return res.json({ cards });
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
      category: ValidateProps.card.category,
      tags: ValidateProps.card.tags
    }
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const { _id, title, content, image, category, tags  } = req.body;
    const cards = await updateCardById(req.db, _id, { title, content, image, category, tags });

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
