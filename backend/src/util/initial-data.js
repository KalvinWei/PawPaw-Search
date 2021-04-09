

import {sizeEnum, genderEnum, colorEnum, postStatusEnum} from './schema';


const petsWithBreeds= [
    {petCategory:'Cat', petBreeds:['Bengal','Birman','Cheetoh']},
    {petCategory:'Dog', petBreeds:['Australian Shepherd','Boxer','Bulldog']},
    {petCategory:'Bird', petBreeds:[]},
    {petCategory:'Rabbit', petBreeds:[]},
    {petCategory:'Mouse', petBreeds:[]},
    {petCategory:'Cattle', petBreeds:[]},
    {petCategory:'Pig', petBreeds:[]},
    {petCategory:'Goat', petBreeds:[]},
    {petCategory:'Hen', petBreeds:[]},
]

const firstUser ={
    userName: 'pkgal',
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
    petName:'mithu',
    petColor:colorEnum.Golden,
    petSize:sizeEnum.Big,
    isMicrochipped:'No',
    petGender: genderEnum.Male,
    collarTagDescription: 'I am mithu',
    comments: 'Lost since last week',
    status: postStatusEnum.Lost,
    locationHistory: {
        longitude: '123.133',
        latitude: '123.134',
        locatedAtDate: '28-dec-2014'
    }
    
}

export {
    firstUser, petsWithBreeds,firstPost
};