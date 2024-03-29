import { ObjectId } from "mongodb";
// import { dbProjectionUsers } from './user';

export async function findDonateItemById(db, id) {
  const donateItems = await db
    .collection("donateItems")
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

  if (!donateItems[0]) return null;
  return donateItems[0];
}

export async function findDonateItems(db, before, by, skip, limit) {
  return db
    .collection("donateItems")
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $skip: skip },
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

export function countDonateItems(db, before, by) {
  return db
    .collection("donateItems")
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

export async function insertDonateItem(
  db,
  {
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
  }
) {
  const donateItem = {
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
    createdAt: new Date(),
  };
  const { insertedId } = await db
    .collection("donateItems")
    .insertOne(donateItem);
  donateItem._id = insertedId;
  return donateItem;
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

export async function updateDonateItemById(
  db,
  id,
  {
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
  }
) {
  const donateItem = {
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
    createdAt: new Date(),
  };

  return db
    .collection("donateItems")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: donateItem })
    .then((value) => console.log("Value: " + value))
    .catch((err) => {
      console.log("Error: " + err);
    });
}

export async function deleteDonateItemById(db, id) {
  return db
    .collection("donateItems")
    .deleteOne({ _id: new ObjectId(id) })
    .then((value) => console.log("Value: " + value))
    .catch((err) => {
      console.log("Error: " + err);
    });
}
