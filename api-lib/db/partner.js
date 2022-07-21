import { ObjectId } from 'mongodb';
import { dbProjectionUsers } from './user';

export async function findPartnerById(db, id) {
  // console.log('db-id', id);
  const partners = await db
    .collection('partners')
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
      // {
      //   $lookup: {
      //     from: 'partners',
      //     localField: 'creatorId',
      //     foreignField: '_id',
      //     as: 'creator',
      //   },
      // },
      // { $unwind: '$creator' },
      // { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
    // console.log('partners',partners);
  if (!partners[0]) return null;
  return partners[0];
}

export async function findPartners(db, before, by, limit = 5) {
  return db
    .collection('partners')
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'creatorId',
      //     foreignField: '_id',
      //     as: 'creator',
      // },
      // },
      // { $unwind: '$creator' },
      // { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}

export async function insertPartner(db, { partnerId, title, year, content, image, tags, accountInfo }) {
  const partner = {
    partnerId, title, year, content, image, tags, accountInfo,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection('partners').insertOne(partner);
  partner._id = insertedId;
  return partner;
}

// export async function updatepartnerById(db, { title, content, image, tags, creatorId }) {
//   return db.collection('partners')
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

export async function updatePartnerById(db, id, { partnerId, title, year, content, image, tags, accountInfo }) {
  const partner = {
    partnerId, title, year, content, image, tags, accountInfo,
    createdAt: new Date(),
  };
  
  return db
    .collection('partners')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: partner },
    )
    .then((value) => console.log('Value: ' + value))
    .catch((err) => {
      console.log('Error: ' + err);
    });
}

export async function deletePartnerById(db, id) {
  return db
    .collection('partners')
    .deleteOne(
      { _id: new ObjectId(id) },
    )
    .then((value) => console.log('Value: ' + value))
    .catch((err) => {
      console.log('Error: ' + err);
    });
}