//Posts PostSchema definition
import mongoose from "mongoose";

const Schema = mongoose.Schema

//TODO: Following de facto enums are used to validate PostSchema properties.

const PetSize = Object.freeze({
    Small: 'Small',
    Medium: 'Medium',
    Big: 'Big',
})
const PetGender = Object.freeze({
    Male: 'Male',
    Female: 'Female',
    Unknown: 'Unknown',
})
const PostStatus = Object.freeze({
    Lost: 'Lost',
    Found: 'Found',
    ReUnited: 'Reunited'
})
const PetColor = Object.freeze({
    Black: 'Black',
    Brown: 'Brown',
    White: 'White',
    Grey: 'Grey',
    Golden: 'Golden',
    Ginger: 'Ginger',
    Lilac: 'Lilac',
    Red:'Red',
    Mixed:'Mixed'
})

//TODO: Post schema definition

const PostSchema = new Schema({
    poster: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    petName: { type: String},
    petType: {type: Schema.Types.ObjectId, ref:'PetType', required:true },
    petImages:[{ type: String}], //should have multiple images
    petColor: { 
        type: String, 
        required: true,
        enum : Object.values(PetColor)
    },
    petSize: { 
        type: String, 
        required: true ,
        enum : Object.values(PetSize),
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
        enum : Object.values(PetGender),
        default: 'Unknown' 
    },
    desexed:{
        type: String, 
        enum : ['Yes','No','Unknown'],
        default: 'Unknown' 
    },
    collarTagDescription: String,
    comment:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum : Object.values(PostStatus)
    },
    //This field needs more discussion and may be required to change
    trace: [{
        latitude: String,
        longitude: String,
        timestamp: Date,
        comment:String
    }],
    matches: [{type: Schema.Types.ObjectId, ref:'Post' }]
},
    {
    timestamps: {}
});


// Object.assign(PostSchema.statics, PostStatus, PetSize, PetColor, PetGender);
const Post = mongoose.model('Post', PostSchema);

export default Post
export {PetGender, PetColor, PetSize, PostStatus}
