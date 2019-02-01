const moment = require('moment');

const createdAt = moment('2018-01-07').format();
const updatedAt = createdAt;
const status = 'published';
module.exports = [
  {
    id: 'beb73945-1ec9-48a2-b45a-d6dc50e4893b',
    userId: '4b134316-966b-47f8-bb47-2fb27a36b40c',
    title: 'Manzi Post',
    text: 'Lorem lorem lorem lorem lorem',
    tags: ['Test'],
    status,
    createdAt,
    updatedAt
  },
  {
    id: 'aba349d5-1b72-4b2e-9400-15695539e07d',
    userId: 'dfef16f9-11a7-4eae-9ba0-7038c6ccaa73',
    title: 'Christian Post',
    text: 'Lorem lorem lorem lorem lorem',
    tags: ['Test'],
    status,
    createdAt,
    updatedAt
  },
  {
    id: 'e47fd3d2-850b-4afb-bcfc-bed3dd275a40',
    userId: '09a0a74f-e2d0-4976-84bc-8118b0c3d86c',
    title: 'Caleb Post',
    text: 'Lorem lorem lorem lorem',
    tags: ['Test'],
    status,
    createdAt,
    updatedAt
  },
  {
    id: 'dbc7017c-5a47-40ab-ab43-31244ce13c46',
    userId: '4bab4fb6-531e-494f-826c-880e532f076b',
    title: 'Daniel Post',
    text: 'Lorem lorem lorem lorem lorem',
    tags: ['Test'],
    status,
    createdAt,
    updatedAt
  },
  {
    id: '6e724784-fb80-42ad-bb37-c87e488c357b',
    userId: 'd018c3b5-13c7-41c0-8b2c-4ec1cb6b21da',
    title: 'Olivier Post 1',
    text: 'Lorem lorem lorem lorem lorem',
    tags: ['Test'],
    status,
    createdAt,
    updatedAt
  },
  {
    id: '95a05193-defe-4300-82ca-bfa2df451a2d',
    userId: 'd018c3b5-13c7-41c0-8b2c-4ec1cb6b21da',
    title: 'Olivier Post 2',
    text: 'Lorem lorem lorem lorem lorem',
    tags: ['Test'],
    status: 'unpublished',
    createdAt,
    updatedAt
  },
  {
    id: '55f3e850-9856-4091-843e-60000dc31ec8',
    userId: 'd018c3b5-13c7-41c0-8b2c-4ec1cb6b21da',
    title: 'Olivier Post 2',
    text: 'Lorem lorem lorem lorem lorem',
    tags: ['Test'],
    status: 'draft',
    createdAt,
    updatedAt
  },
  {
    id: '0650041a-f89e-424d-a69a-40fb436db00d',
    userId: 'd018c3b5-13c7-41c0-8b2c-4ec1cb6b21da',
    title: 'Olivier Post 3',
    text: 'Lorem lorem lorem lorem lorem',
    tags: ['Test'],
    status: 'deleted',
    createdAt,
    updatedAt
  }
];