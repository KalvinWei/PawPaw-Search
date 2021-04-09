/**
 * db connection
 */

import mongoose from 'mongoose';
import {User} from "./schema";
import {createUser} from "../../DAO/userDAO";

main();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/PawsHome', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');

    await clearDatabase();
    console.log();

    await addUser();
    console.log();


    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

async function addUser() {
        const Bob = await createUser({
            username:'Bob123',
            name:'Bob Dylan',
            password:'111'
        });
        console.log(`User '${Bob.name}' added to database (_id = ${Bob._id})`);
}

async function clearDatabase() {
    await User.deleteMany({});
    console.log(`Cleared database.`);
}