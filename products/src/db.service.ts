import fs from "node:fs/promises";
import * as path from "path";

const getId = () => {
  return Math.random().toString(16).slice(2);
};

class DB {
  #instance?: DB;
  DB_PATH: string = "";
  #schema: Array<string> = [];

  constructor() {
    // NOTE: Singleton
    if (typeof this.#instance !== "undefined") {
      return this.#instance;
    }

    this.#instance = this;
  }

  async connect(dbPath: string) {
    this.DB_PATH = path.join(__dirname, dbPath);

    const data = await this.readAll();

    for (const item of Object.keys(data)) {
      this.#schema.push(item);
    }
  }

  async read(prop: string) {
    if (!this.#schema.includes(prop)) {
      throw new Error(`There is no ${prop} in DB schema`);
    }

    const data = await this.readAll();

    return data[prop];
  }

  async readAll() {
    try {
      const data = await fs.readFile(this.DB_PATH, { encoding: "utf8" });
      const json = JSON.parse(data);

      return json;
    } catch (error: any) {
      throw new Error(`Cannot read data from db: ${error.message}`);
    }
  }

  async write(prop: string, data: any) {
    if (!this.#schema.includes(prop)) {
      throw new Error(`There is no ${prop} in DB schema`);
    }

    const allRecords = await this.readAll();

    data.id = getId();

    allRecords[prop].push(data);

    try {
      const content = JSON.stringify(allRecords);

      await fs.writeFile(this.DB_PATH, content, {
        encoding: "utf8",
      });

      return data;
    } catch (error: any) {
      throw new Error(`Cannot write data to db: ${error.message}`);
    }
  }
}

const db = new DB();

export default db;
