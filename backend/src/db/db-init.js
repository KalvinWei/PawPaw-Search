/**
 * db connection
 */

import mongoose from 'mongoose';

import Post from "./schemas/PostSchema";
import User from "./schemas/UserSchema";
import PetType from "./schemas/PetTypeSchema";
import {firstPost, firstUser, somePetTypes, secondPost} from "./init-data";

main();

async function main() {
    await mongoose.connect('mongodb+srv://group26:MITCS732@cs732.pgo4d.mongodb.net/App', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');

    const user = await User.findOne({_id:'60892f753fdbd06344901984'}).populate('myPosts').populate('petType').execPopulate()
    console.log(user)

    // await clearDatabase();
    // console.log();
    // Only add, if data is not already initilaized
    //Need to find the way of checking this
    //Error will occur, if run it twice due to schema validation

    // await addUser()
    // console.log("add one user!")
    // await addPetTypes();
    // console.log("add all pet types")
    // await addPost();
    // console.log("add a post")

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}


//TODO Following functions are used to initialise the real database.
async function clearDatabase() {
    await Post.deleteMany({});
    await User.deleteMany({});
    await PetType.deleteMany({});
    console.log(`Cleared database.`);
}

async function addUser() {
    //Add first User
    let dbUser = new User(firstUser);
    await dbUser.save();
}

function addPetTypes(){
    somePetTypes.map(async type =>{
        let typeDoc = new PetType(type)
        await typeDoc.save();
    })
}

async function addPost() {
    //Get user
    let aUser = await User.findOne();
    let aPetType = await PetType.findOne();
    if (aUser) {
        //Add first Post
        let aPost = new Post( firstPost );
        aPost.poster = aUser._id;
        aPost.petType = aPetType._id;
        await aPost.save();

        let bPost = new Post( secondPost );
        bPost.poster = aUser._id;
        bPost.petType = aPetType._id;
        await bPost.save();

        // Also add this pet to the user's posts
        aUser.myPosts.push(aPost._id);
        aUser.myPosts.push(bPost._id);
        await aUser.save();
    }
}