import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;

const dbName = "habit-track";

let db: Db;
let client: MongoClient;

export function connect() {
  client = new MongoClient(uri);

  db = client.db(dbName);
}

export function database() {
  if (!db) {
    connect();
  }

  return db;
}
// console.log(">>>>", uri);

// export const client = new MongoClient(uri);

// export const database = client.db("habit-track");
