//Some data samples to initialise DB
import {PetSize,PetColor,PostStatus,PetGender} from "./schemas/PostSchema";

const somePetTypes= [
    {species:'Cat', breed:'Bengal'},
    {species:'Cat', breed:'Birman'},
    {species:'Cat', breed:'Cheetoh'},
    {species:'Cat', breed:'lihua'},
    {species:'Dog', breed:'Australian Shepherd'},
    {species:'Dog', breed:'Boxer'},
    {species:'Dog', breed:'Bulldog'},
    {species:'Dog', breed:'Poodle'},
    {species:'Dog', breed:'Akita'},
    {species:'Dog', breed:'Husky'},
    {species:'Dog', breed:'Golden Retriever'},
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
        latitude: '-36.91958836319859,',
        longitude: '174.71945677414823',
        timestamp: '2021-02-28'
    }]
}

const secondPost= {
    //poster to be added
    petName: 'DouDou',
    //petImages to be added
    petColor: PetColor.Black,
    petSize: PetSize.Small,
    isMicrochipped: 'Yes',
    petGender: PetGender.Male,
    collarTagDescription: 'cute and strong dog',
    comment: 'Lost since last week',
    status: PostStatus.Lost,
    trace: [{
        latitude: '-36.8871',
        longitude: '174.7475',
        timestamp: '2021-02-28'
    }]
}
export {
    firstUser, somePetTypes, firstPost,secondPost
};