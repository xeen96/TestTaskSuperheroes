
# This is the project created by [Xeen](https://github.com/xeen96/) as a solution for the test task

## Back-End: Node.js + Express.js + Typescript

**Make sure Node.js installed `node -v`**

### To start back-end server follow these steps

1. Clone the repository: `git clone https://github.com/xeen96/TestTaskSuperheroes.git`

2. Navigate to the project directory: `cd TestTaskSuperheroes`

3. Navigate to the server directory: `cd server`

4. Install server dependencies: `npm install`

5. Create `.env` file in `/server`, fill it as in the `sample.env`, do not change the port and also make sure that the port is not used by another application

6. Run the back-end server: `npm run dev`

## Additional

**Make sure you in `/server` directory - `pwd`**

- To fill db with sample data, uncomment `line: 25` in `server.ts` **Function will overwrite existing documents**

- To run the tests enter in terminal `npm run test`, **NOTE: Tests delete all model documents before starting and after finishing.**

- To make build enter `npm run build`

- To run lint enter `npm run lint`

## Front-End: React with Router + TypeScript + Vite + CSS

### To start front-end dev server follow these steps

1. Open one more terminal (do not close previous)

2. Navigate to client directory `cd client`

3. Install client dependencies `npm install`

4. Create `.env` file in `/client` fill it as in the `sample.env`, do not change the port and also make sure that the port is not used by another application and it's equal to you server adress and port

5. Run front-end development server `npm run dev`;

6. Visit the url provided by result of previous command (default: <http://localhost:5173>)

### Possible bad-cases

- Incorrectly filled `.env` files

- The CORS policy often behaves strangely, there is a possibility that even with middleware, requests may not be executed, usually in the developer console (on the frontend) this will be written

- There is a low probability that the connection will be blocked by firewalls / antiviruses

## Tree

```
TestTaskSuperheroes/
├── client/          
│   ├── src/
│   │    ├── assets/
│   │    ├── components/
│   │    ├── context/
│   │    ├── definitions/
│   │    ├── layout/
│   │    ├── pages/
│   │    └── ...
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── definitions/
│   │   ├── middlwares/
│   │   ├── mongodb/
│   │   ├── routes/
│   │   ├── tests/
│   │   ├── uploads/
│   │   └── server.ts
│   │
│   └── ...
│
├── README.md
└── .gitignore
```
