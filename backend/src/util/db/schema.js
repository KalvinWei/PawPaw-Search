/** Schemas such as Post, Pet, User are defined here.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//TODO - User
const UserSchema = new Schema(
    {
        name: String,
        username:String,
        password:String
    },
    {timestamps: {}})


const User = mongoose.model('loginUser', UserSchema);


//TODO - Post



//TODO - export all
export {User};



import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Schema definition for pet types and breeds
const petSchema=new Schema({

    category:{ type: String, unique: true, required: true },
    breeds: [{ type: String}]
   
});

export const Pet = mongoose.model('Pet', petSchema);


//Schema definition for Users

const userSchema = new Schema({

    userName: { type: String, unique: true, required: true },       // Each user must have a unique username   
    email: { type: String, unique: true, required: true },          // Each user must have a unique email address   
    password: { type: String, required: true },
    firstName: { type: String, required: true },  
    lastName: String,
    phone: String,    
    address: { // address is a nested document
        number: String,
        street: String,
        city: String,
        postcode: String  //Saving it as Number was truncating initial 0s 
        },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },
    { 
    timestamps: {}
});

// Allows us to add an extra "virtual property" to the schema. This value won't actually be stored in the DB, but can be used like
// a normal property, e.g. console.log(myUser.fullName); or myUser.fullName = 'Bob Marley';
userSchema.virtual('fullName')
    .get(function () { return `${this.firstName} ${this.lastName}`; })
    .set(function (value) {
        this.firstName = value.substr(0, value.indexOf(' '));
        this.lastName = value.substr(value.indexOf(' ') + 1);
    });

// Actually create the User schema
export const User = mongoose.model('User', userSchema);

/**
 * Schema for Posts(Lost/Found Pets Listings) in the database.
 */

// Enums/objects for String validation, defined before schema definition

const sizeEnum = Object.freeze({
    Small: 'Small',
    Medium: 'Medium',
    Big: 'Big',
})
const genderEnum = Object.freeze({
    Male: 'Male',
    Female: 'Female',
    Unknown: 'Unknown',
})
const postStatusEnum = Object.freeze({
    Lost: 'Lost',
    Found: 'Found',
    ReUnited: 'ReUnited'
})

const colorEnum = Object.freeze({
    Black: 'Black',
    Brown: 'Brown',
    White: 'White',
    Grey: 'Grey',
    Golden: 'Golden',
    Ginger: 'Ginger',
    Lilac: 'Lilac',
    Red:'Red'
})

//Posts Schema definition

const postSchema = new Schema({

    petName: { type: String},
    petImage:{ type: String},
    petColor: { 
        type: String, 
        required: true ,
        enum : Object.values(colorEnum), 
    }, 

    petSize: { 
        type: String, 
        required: true ,
        enum : Object.values(sizeEnum), 
        default: 'Medium' 
    }, 
    
    isMicrochipped:{
        type: String, 
        enum : ['Yes','No','Unknown'],
        default: 'Unknown' 
    },
    microchipNumber:{ type: String},

    petGender:{
        type: String, 
        required: true,
        enum : Object.values(genderEnum), 
        default: 'Unknown' 
    },
    
    desexed:{
        type: String, 
        enum : ['Yes','No','Unknown'],
        default: 'Unknown' 
    },

    collarTagDescription:{ type: String},

    comments:{ 
        type: String,
        required: true
    },

    status:{ 
        type: String,
        required: true,
        enum : Object.values(postStatusEnum)
    },
    
    //This field needs more discussion and may be required to change 
    locationHistory: [{
        longitude: String,
        latitude: String,
        locatedAtDate: Date
    }]
    ,
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }

}, {
    timestamps: {}
});

Object.assign(postSchema.statics, { postStatusEnum });
Object.assign(postSchema.statics, { genderEnum });
Object.assign(postSchema.statics, { sizeEnum });
Object.assign(postSchema.statics, { colorEnum });

export {sizeEnum, genderEnum, colorEnum, postStatusEnum};

export const Post = mongoose.model('Post', postSchema);
