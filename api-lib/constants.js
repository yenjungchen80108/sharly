import { nanoid } from "nanoid";

export const ValidateProps = {
  user: {
    username: { type: "string", minLength: 4, maxLength: 20 },
    name: { type: "string", minLength: 1, maxLength: 50 },
    password: { type: "string", minLength: 8 },
    email: { type: "string", minLength: 1 },
    bio: { type: "string", minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: "string", minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: "string", minLength: 1, maxLength: 280 },
  },
  card: {
    _id: {
      type: "string",
      default: () => nanoid(),
    },
    title: { type: "string", minLength: 1, maxLength: 20 },
    content: { type: "string", minLength: 1, maxLength: 20 },
    image: { type: "string", minLength: 1 },
    tags: { type: "array" },
    category: { type: "string" },
  },
  partner: {
    _id: {
      type: "string",
      default: () => nanoid(),
    },
    partnerId: { type: "string", minLength: 1, maxLength: 50 },
    year: { type: "string", minLength: 1, maxLength: 20 },
    title: { type: "string", minLength: 1, maxLength: 50 },
    content: { type: "string", minLength: 1, maxLength: 100 },
    image: { type: "string", minLength: 1 },
    tags: { type: "array" },
    accountInfo: { type: "object" },
  },
  donateItem: {
    _id: {
      type: "string",
      default: () => nanoid(),
    },
    // itemId: { type: 'string', minLength: 1, maxLength: 10 },
    partnerId: { type: "string", minLength: 1, maxLength: 50 },
    itemName: { type: "string", minLength: 1, maxLength: 80 },
    subTitle: { type: "string", minLength: 1, maxLength: 50 },
    size: { type: "string", minLength: 1, maxLength: 10 },
    brand: { type: "string", minLength: 1, maxLength: 10 },
    info: { type: "string", minLength: 1 },
    status: { type: "string", minLength: 1, maxLength: 10 },
    time: { type: "string", minLength: 1 },
    category: { type: "string", minLength: 1, maxLength: 10 },
    img: { type: "string", minLength: 1 },
    demand: { type: "string", minLength: 1, maxLength: 10 },
  },
};
