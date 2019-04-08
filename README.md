# LIT BlogPOST

[![Build Status](https://travis-ci.org/oesukam/lit-blogpost.svg?branch=develop)](https://travis-ci.org/oesukam/lit-blogpost)
[![Coverage Status](https://coveralls.io/repos/github/oesukam/lit-blogpost/badge.svg)](https://coveralls.io/github/oesukam/lit-blogpost)
[![Maintainability](https://api.codeclimate.com/v1/badges/218ae4cb97c51bf46d72/maintainability)](https://codeclimate.com/github/oesukam/lit-blogpost/maintainability)

A Mini Project to demonstrate gitflow, restfull design, agile methodology and team work skills
`https://lit-blog.herokuapp.com`

## Get Started

- Clone the repo: `git clone https://github.com/oesukam/lit-blogpost.git`
- Set up dev environment: `duplicate .env.example`
  ```
    PORT=3000
    JWT_SECRET=
    DATABASE_URL=postgresql://username:password@localhost:5432/database
    API_VERSION=v1
  ```
- Create a postgress database rhen setup credentials in .env file
- Install packages:`npm install`
- Run the migration: `npm run db:migrate:seed`
- Run the development server: `npm run dev`

## NPM Scrips

- `npm run test`: Runs the test
- `npm run coveralls`: Runs the test with coveralls (To be used in Travis CI)
- `npm run start`: Start the production version of the app
- `npm run dev`: Starts the development version of the app
- `npm run db:migrate`: Migrate the database (Make sure to have postgress up and running)
- `npm run db:migrate:fresh`: Migrate the database by cleaning dropping all tables
- `npm run dd:migrate:seed`: Migrate and populate tables with dummy data
- `npm run db:seed`: Populate the database with dummy data

## Endpoints

| Endpoint                          | Methods | Token  | Functionalities          |
| --------------------------------- | ------- | ------ | ------------------------ |
| /api/v1/auth/login                | POST    | No     | Login registered user    |
| /api/v1/auth/signup               | POST    | No     | Register a new User      |
| /api/v1/users/`<userId>`/posts    | GET     | Yes    | Retrieve user's posts    |
| /api/v1/posts/`<postId>`          | GET     | Yes/No | Retrieve a single post   |
| /api/v1/posts/`<postId>`          | PUT     | Yes    | Update a single post     |
| /api/v1/posts/`<postId>`/publish  | PUT     | Yes    | Publish a post           |
| /api/v1/posts/`<postId>`/comments | GET     | Yes/No | Fetct post comments      |
| /api/v1/posts/`<postId>`/comments | POST    | Yes    | Comment a post           |
| /api/v1/posts/`<postId>`/         | PUT     | YES    | pdate a single post      |
| /api/v1/posts/`<postId>/`comments | GET     | YES    | Retrieve post's comments |

## Authors

- **Caleb Mugisha**
- **Christian Nshogoza**
- **Daniel Nziranziza**
- **Fabrice Manzi**
- **Olivier Esuka**

## Acknowledgments

- Alpha Ogilo
