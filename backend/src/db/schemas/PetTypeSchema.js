import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Schema definition for pet types and breeds
//TODO: This schema is a dependency for PostSchema
const PetTypeSchema = new Schema({
    species:{ type: String, required: true },
    breed: String //One record has only one specific breed. Breeds are stored in different documents under this schema.

});
const PetType = mongoose.model('PetType', PetTypeSchema);
export default PetType