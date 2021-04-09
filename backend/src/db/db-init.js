/**
 * db connection
 */

import mongoose from 'mongoose';

import Post from "./schemas/PostSchema";
import User from "./schemas/UserSchema";
import PetType from "./schemas/PetTypeSchema";
import {firstPost, firstUser, somePetTypes} from "./init-data";

main();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/PawsHome', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');

    await clearDatabase();
    console.log();
    // Only add, if data is not already initilaized
    //Need to find the way of checking this
    //Error will occur, if run it twice due to schema validation

    await addUser()
    console.log("add one user!")
    await addPetTypes();
    console.log("add all pet types")
    await addPost();
    console.log("add a post")

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}


//TODO Following functions are used to initialise the real database.
async function clearDatabase() {
    await User.deleteMany({});
    console.log(`Cleared database.`);
}

async function addUser() {
    //Add first User
    let dbUser = new User(firstUser);
    await dbUser.save();
}

function addPetTypes(){
    somePetTypes.map(async function (type){
        let typeDoc = new PetType(type)
        await typeDoc.save();
    })
}

async function addPost() {
    //Get user
    let aUser = await User.findOne();
    let aPetType = await PetType.findOne();
    console.log("went here")
    if (aUser) {
        //Add first Post
        let firstPost = new Post(firstPost);
        firstPost.poster = aUser._id;
        firstPost.petType = aPetType._id;
        await firstPost.save();

        // Also add this pet to the user's posts
        aUser.myPosts.push(firstPost._id);
        await aUser.save();
    }
}