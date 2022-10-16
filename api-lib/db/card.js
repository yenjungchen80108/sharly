import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findCardById(db, id) {
  // console.log('db-id', id);
  const cards = await db
    .collection('cards')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'cards',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      // { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
    // console.log('cards',cards);
  if (!cards[0]) return null;
  return cards[0];
}

export async function findCards(db, before, by, skip, limit) {
  return db
    .collection('cards')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: 1 } },
      { $skip: skip },
      { $limit: limit },
      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'creatorId',
      //     foreignField: '_id',
      //     as: 'creator',
      //   },
      // },
      // { $unwind: '$creator' },
      // { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export function countCards(db, before, by) {
  return db
  .collection('cards')
  .aggregate([
    {
      $match: {
        ...(by && { creatorId: new ObjectId(by) }),
        ...(before && { createdAt: { $lt: before } }),
      },
    },
  ])
  .toArray();
}

export async function insertCard(db, { title, content, image, tags, category, creatorId }) {
  const card = {
    title,
    content,
    image,
    tags,
    category,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('cards').insertOne(card);
  card._id = insertedId;
  return card;
}

// export async function updateCardById(db, { title, content, image, tags, creatorId }) {
//   return db.collection('cards')
//   .update(
//     {
//         _id: new ObjectId(req.body),
//     },
//     { $set: { title, content, image, tags, creatorId } },
//     false, true
//   ).catch((err) => {
//     console.log('Error: ' + err);
//   });
// }

export async function updateCardById(db, id, { title, content, image, tags, category }) {
  const card = {
    title,
    content,
    image,
    tags,
    category,
    createdAt: new Date(),
  };
  
  return db
    .collection('cards')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: card },
    )
    // .then((value) => console.log('Value: ' + value))
    // .catch((err) => {
    //   console.log('Error: ' + err);
    // });
}

export async function deleteCardById(db, id) {
  return db
    .collection('cards')
    .deleteOne(
      { _id: new ObjectId(id) },
    )
    // .then((value) => console.log('Value: ' + value))
    // .catch((err) => {
    //   console.log('Error: ' + err);
    // });
}