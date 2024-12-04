import { MongoClient} from "mongodb";
import "dotenv/config";

export default async function connectToDatabase(database:string){
    const uri = process.env.CONNECTION_STRING || "";
    try {
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(database);
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);   
    }
}
