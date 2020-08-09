# Task for Pixsy

## running Back-end

### Pre-requisites:

Node.js 10.19.0

### Run and test

First you need an active AWS account.
Go to the backend directory and set Environment variables (can be in a .env file):

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Then simply:

```
npm i
npm start
```

In order to run unit tests run:

```
npm test
```

## Running the client

Go to the client folder and run:

```
npm i
npm start
```

to run tests run:

```
npm test
```

go to http://localhost:3000 to get into the UI.

## Notes

I decided to use React for front end
Node.js and express for back-end
and AWS SNS for SMS service provider.

The data is stored using sqlite3 in memory, as it is a home task.

In production environment, a production-ready DB would be used. Both SQL and Non-SQL might be a good solution for this kind of a feature. But I probably would go to a no-sql slution as it would be very fast to query by known id and managing retention for expiary is very easy.

In the front-end, I would have used a Design system, probably Material-UI or AntD for React. This will help with the app consistency and over all look and feel.

However, in my solution I used native HTML forms (made them a bit prettier using Pure-Forms), if I had some more time, I would have created each form element into a unique react component, making code and css styles less redundent.
