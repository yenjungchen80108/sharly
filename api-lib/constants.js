export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  card: {
    title: { type: 'string', minLength: 1, maxLength: 20 },
    content: { type: 'string', minLength: 1, maxLength: 20 },
    image: { type: 'string', minLength: 1 },
    tags: { type: 'array' }
  },
  partner: {
    partnerId: { type: 'string', minLength: 1, maxLength: 50 },
    year: { type: 'string', minLength: 1, maxLength: 20 },
    title: { type: 'string', minLength: 1, maxLength: 50 },
    content: { type: 'string', minLength: 1, maxLength: 100 },
    image: { type: 'string', minLength: 1 },
    tags: { type: 'array' },
    accountInfo: { type: 'object' }
  },
};
