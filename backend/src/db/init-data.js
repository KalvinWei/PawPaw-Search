//Some data samples to initialise DB
import {PetSize,PetColor,PostStatus,PetGender} from "./schemas/PostSchema";

const somePetTypes= [
    {species:'Cat', breed:'Bengal'},
    {species:'Cat', breed:'Birman'},
    {species:'Cat', breed:'Cheetoh'},
    {species:'Dog', breed:'Australian Shepherd'},
    {species:'Dog', breed:'Boxer'},
    {species:'Dog', breed:'Bulldog'},
    {species:'Bird', breed:""},
    {species:'Rabbit', breed:""},
    {species:'Mouse', breed:""},
    {species:'Cattle', breed:""},
    {species:'Pig', breed:""},
    {species:'Goat', breed:""},
    {species:'Hen', breed:""}
]

const firstUser ={
    username: 'pkgal',
    email: 'riffat@hotmail.com',
    password:'123',
    firstName:'Riffat',
    lastName:'Nourin',
    address :{
        number:'78',
        street:'Boundary Road',
        city: 'Auckland',
        postcode: '0600'
    }
}

const firstPost={
    //poster to be added
    petName:'mithu',
    //petImages to be added
    petColor:PetColor.Golden,
    petSize:PetSize.Big,
    isMicrochipped:'No',
    petGender: PetGender.Male,
    collarTagDescription: 'I am mithu',
    comment: 'Lost since last week',
    status: PostStatus.Lost,
    trace: [{
        longitude: '123.133',
        latitude: '123.134',
        timestamp: '2021-02-28'
    }]

}

export {
    firstUser, somePetTypes, firstPost
};