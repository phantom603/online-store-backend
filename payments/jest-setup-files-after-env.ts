import jwt from "jsonwebtoken";

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  global.currentUser = {
    id: 1,
    email: global.userEmail,
  };
});

// NOTE: This is a global function that will be called before each test suite
global.signin = () => {
  // Create the JWT!
  const token = jwt.sign(global.currentUser, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
