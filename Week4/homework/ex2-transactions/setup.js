export const create = async (client) => {
  const allCollections = await client
    .db("databaseWeek4")
    .listCollections()
    .toArray();
  const names = allCollections.find((each) => each.name == "accounts");
  if (!names) {
    // if there is no collection with accounts name, create new one
    await client
      .db("databaseWeek4")
      .createCollection("accounts", (err, res) => {
        if (err) throw err;
        console.log("Accounts collection created!");
      });
  }

  const accounts = await client.db("databaseWeek4").collection("accounts");
  await accounts.deleteMany({}); // delete data
  await accounts.insertMany(
    // insert data
    [
      {
        account_number: 100,
        balance: 1000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: "2022-08-11 00:00:01",
            remark: "note1",
          },
        ],
      },
      {
        account_number: 101,
        balance: 2000,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: "2022-08-11 00:00:02",
            remark: "note2",
          },
        ],
      },
      {
        account_number: 102,
        balance: 2500,
        account_changes: [
          {
            change_number: 1,
            amount: 100,
            changed_date: "2022-08-11 00:00:03",
            remark: "note3",
          },
        ],
      },
      {
        account_number: 103,
        balance: 3500,
        account_changes: [
          {
            change_number: 1,
            amount: 300,
            changed_date: "2022-08-11 00:00:04",
            remark: "note4",
          },
        ],
      },
    ]
  );
};

export default { create };
