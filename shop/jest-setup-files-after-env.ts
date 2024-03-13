import * as path from "path";
import { db } from "common";

beforeAll(async () => {
  console.log("beforeAll");

  await db.connect({
    dbPath: path.join(__dirname, "./src/db.json"),
  });
});

beforeEach(() => {
  console.log("beforeEach");
});

afterAll(() => {
  console.log("after all");

  db.disconnect();
});
