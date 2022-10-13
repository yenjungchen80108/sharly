import { ValidateProps } from '../../../../api-lib/constants';
import { findCardById, updateCardById } from '../../../../api-lib/db';
import { findCards, insertCard } from '../../../../api-lib/db';
import { auths, database, validateBody } from '../../../../api-lib/middlewares';
import { ncOpts } from '../../../../api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const card = await findCardById(req.db, req.query.cardId);

  if (!card) {
    return res.status(404).json({ error: { message: 'Card is not found GET.' } });
  }

  const cards = await findCards(
    req.db,
    req.query._id,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.json({ cards });
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
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;
    const category = req.body.category;
    // const tags = req.body.tags;
    // console.log('req.query',req.query.cardId);
    const card = await findCardById(req.db, req.query._id);

    if (!card) {
      return res.status(404).json({ error: { message: 'Card is not found POST.' } });
    }

    const cards = await insertCard(req.db, card._id, {
      creatorId: req.user._id,
      content, title, image, category, tags
    });

    return res.json({ cards });
  }
);

// handler.put(
//   ...auths,
//   validateBody({
//     type: 'object',
//     properties: {
//       title: ValidateProps.card.title,
//       content: ValidateProps.card.content,
//       image: ValidateProps.card.image,
//       tags: ValidateProps.card.tags
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
//     console.log('req.query',req.query.cardId);
//     const card = await findCardById(req.db, req.query.cardId);

//     if (!card) {
//       return res.status(404).json({ error: { message: 'Card is not found PUT.' } });
//     }

//     const cards = await updateCardById(req.db, card._id, {
//       creatorId: req.user._id,
//       content, title, image, tags
//     });

//     return res.json({ cards });
//   }
// )

export default handler;
