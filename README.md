# LIT BlogPOST

[![Build Status](https://travis-ci.org/oesukam/lit-blogpost.svg?branch=develop)](https://travis-ci.org/oesukam/lit-blogpost)
[![Coverage Status](https://coveralls.io/repos/github/oesukam/lit-blogpost/badge.svg?branch=develop)](https://coveralls.io/github/oesukam/lit-blogpost?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/218ae4cb97c51bf46d72/maintainability)](https://codeclimate.com/github/oesukam/lit-blogpost/maintainability)

## Get Started

- Clone the repo: `git clone https://github.com/oesukam/lit-blogpost.git`
- Set up dev environment: `duplicate .env.example`
- Create a postgress database rhen setup credentials in .env file
- Install packages:`npm install`
- Run the migration: `npm run db:migrate:seed`
- Run the development server: `npm run dev`

## Endpoints

| Endpoint                       | Methods | Functionalities          |
| ------------------------------ | ------- | ------------------------ |
| /api/v1/auth/login             | POST    | Login registered user    |
| /api/v1/auth/signup            | POST    | Register a new User      |
| /api/v1/users/<userId>/posts   | GET     | Retrieve user's posts    |
| /api/v1/posts/<postId>         | GET     | Retrieve a single post   |
| /api/v1/posts/<postId>/publish | PUT     | Publish a post           |
| /api/v1/posts/<postId>/        | PUT     | Update a single post     |
| /api/v1/comments/<postId>/post | GET     | Retrieve post's comments |

## Sequelize Commands

Installing Sequelize-cli => npm i sequelize-cli -g

create Models => \$ sequelize model:create --name User --attributes name:string, email:string

Migrate Database => \$ sequelize db:migrate
