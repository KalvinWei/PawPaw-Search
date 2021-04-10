import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Schema definition for Users
const UserSchema = new Schema({
        username: { type: String, unique: true, required: true },       // Each user must have a unique username
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
        myPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],  //posts created by me
        myWatchings:[{ type: Schema.Types.ObjectId, ref: 'Post' }] //posts I am watching(following)
    },
    {
        timestamps: {}
    });
// Allows us to add an extra "virtual property" to the schema. This value won't actually be stored in the DB, but can be used like
// a normal property, e.g. console.log(myUser.fullName); or myUser.fullName = 'Bob Marley';
UserSchema.virtual('fullName')
    .get(function () { return `${this.firstName} ${this.lastName}`; })
    .set(function (value) {
        this.firstName = value.substr(0, value.indexOf(' '));
        this.lastName = value.substr(value.indexOf(' ') + 1);
    });
// Actually create the User schema
const User = mongoose.model('User', UserSchema);
export default User


