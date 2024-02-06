import db from "./src/db.service";

beforeAll(async () => {
  console.log("beforeAll");
  await db.connect();
});

beforeEach(async () => {
  console.log("beforeEach");
});

afterAll(async () => {
  // TODO: clear DB
  console.log("afterAll");
});
