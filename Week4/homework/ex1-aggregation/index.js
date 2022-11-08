import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

//Write a function that will return the array of the total population (M + F over all age groups) for a given Country per year.

const helper = async (client,pipeline) =>{
    const cursor = client 
        .db("databaseWeek4")
        .collection("population")
        .aggregate(pipeline);

    const res = await cursor.toArray(); 
    const result = res.forEach(each => console.table(each));
    return result;
}

const getTotalPopulationByYear = async (client, country) => {
    const pipeline = [
        {
            '$match': {
                'Country': country,
            },
        },
        {
            '$group': {
                '_id': "$Year",
                'count_population': {
                    '$sum': {
                        $sum: ["$F", "$M"],
                    },
                },
            },
        },
        {
            '$sort': {
                '_id': 1,
            },
        },
    ];
    await helper(client,pipeline);
}

//Write a function that will return all of the information of each continent for a given Year and Age field but add a new field TotalPopulation that will be the addition of M and F. 
const getTotalPopulationByContinent = async (client, age, year) => {
    const pipeline = [
        {
            '$match': {
                'Age': age, 
                'Year': year, 
                'Country': {
                    '$in': [
                    'AFRICA', 'ASIA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA'
                    ]
                }
            }
        }, 
        {
            '$addFields': {
                'TotalPopulation': {
                    '$sum': [
                    '$M', '$F'
                    ]
                }
            }
        }
    ];
    await helper(client,pipeline);
}


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
        await getTotalPopulationByYear(client,"Netherlands");
        await getTotalPopulationByContinent(client, "100+", 2020);
    } catch (err) {
        console.error(err);
        console.log("Error");
    } finally {
        // Always close the connection at the end
        client.close();
    }
}

main();