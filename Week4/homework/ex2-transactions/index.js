import { MongoClient, ServerApiVersion } from "mongodb";
import { create } from "./setup.js";
import { transactions } from "./transfer.js";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    console.log("Connected!");
    await create(client); // create collection and insert data
    await transactions(client, 101, 102, 500, "Transaction from 101 to 102!");
  } catch (err) {
    console.error("index.js error", err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();
