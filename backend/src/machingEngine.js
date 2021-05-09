import mongoose from "mongoose";
import Post from "./db/schemas/PostSchema";

main()

async function main(){
    // setInterval(match,1000 * 60 * 60)

    await match()
    async function match(){
        await mongoose.connect('mongodb+srv://group26:MITCS732@cs732.pgo4d.mongodb.net/App', {
            useNewUrlParser: true
        });
        console.log('Connected to database!');

        //TODO iterate the posts and generate a matrix to indicate the relevance
        // between each other and populate top 5 relevant poss in 'matches'
        await Post.find().map(doc=>{
            console.log(doc._id)
        })

        await mongoose.disconnect();
        console.log('Disconnected from database!');
    }
}