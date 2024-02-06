import fs from "node:fs/promises";
import * as path from "path";

interface Connection {
  state: Record<string, any>;

  get(prop?: string): any;
}

const connection: Connection = {
  state: {},

  get(prop: string) {
    if (this.state[prop]) {
      return this.state[prop];
    }

    throw new Error(`There is not data "${prop}" in DB`);
  },
};

class DB {
  #instance?: DB;
  #connection: Connection;

  constructor(connection: Connection) {
    this.#connection = connection;

    if (typeof this.#instance !== "undefined") {
      return this.#instance;
    }

    this.#instance = this;
  }

  async connect() {
    if (Object.keys(this.#connection.state).length) {
      return this.#connection;
    }

    try {
      const json = await fs.readFile(
        path.join(__dirname, "../../db.json"),
        "utf8"
      );

      this.#connection.state = JSON.parse(json);

      return this.#connection;
    } catch (error: any) {
      throw new Error(`Cannot get access to db: ${error.message}`);
    }
  }
}

const db = new DB(connection);

export default db;
