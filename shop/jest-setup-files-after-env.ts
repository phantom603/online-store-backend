import db from "./src/db.service";

beforeAll(async () => {
  console.log("beforeAll");
  // TODO: make auth call here, maybe...
  await db.connect("db.json");
});

beforeEach(async () => {
  console.log("beforeEach");
});

afterAll(async () => {
  // TODO: clear DB
  console.log("afterAll");
});
