import mongoose from 'mongoose';

import { petsWithBreeds,firstUser,firstPost } from './initial-data';
import { Pet,User,Post} from './schema';


main();

async function main() {
    // Connect to database
    // For more extra options, see: https://mongoosejs.com/docs/connections.html

    await mongoose.connect('mongodb://localhost:27017/localPaws', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');
    console.log();
   
    // Only add, if data is not already initilaized
    //Need to find the way of checking this
    //Error will occur, if run it twice due to schema validation
  
        await addPetsAndBreeds(); 
 
        await addUsers();
      
        await addPosts();   

    // Disconnect when complete

    await mongoose.disconnect();
    console.log('Disconnected from database!');
}


async function addPetsAndBreeds(){

    //Populate Pets types and breeds 

    for(let pet of petsWithBreeds){
        let dbPet=new Pet();
        dbPet.category=pet.petCategory;
        dbPet.breeds=pet.petBreeds;
        await dbPet.save();
    }
}

async function addUsers(){

    //Add first User

    let dbUser=new User(firstUser);
    await dbUser.save();
}

async function addPosts(){

    //Get user
    let user= await User.findOne({});

    if(user)
        {
            //Add first Post
            let dbPost=new Post(firstPost);
            dbPost.userId=user._id;
            await dbPost.save();

            // Also add this pet to the user's posts
            user.posts.push(dbPost._id);
            await user.save();
        }
}

