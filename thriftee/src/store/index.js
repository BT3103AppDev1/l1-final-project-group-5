import {createStore} from 'vuex'



import firebaseApp, { storage } from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from 'firebase/storage'

const db = getFirestore(firebaseApp);
//This is to create a state to contain all Listing info to be able to access anywhere

export default createStore({
    state:{
        listingArray: [],
        listingLoaded: null,
    },
    getters:{
        listingsData(state) {
            return state.listingArray;
        }
    },
    mutations: {},
    actions:{
        async getListings({ state }) {
            const querySnapshot = await getDocs(collection(db, "Listings"));
            querySnapshot.forEach((doc) => {
                if (!state.listingArray.some(listing => listing.ListingID === doc.id)) {
                    const dataRef = doc.data();
                    getDownloadURL(ref(storage, "Listings/" + doc.id)).then(function(result){
                        dataRef.ImageUrl = result
                    }).catch(() =>{
                        dataRef.ImageUrl = "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw" //placeholder
                    })
                    dataRef.ListingID = doc.id;
                    state.listingArray.push(dataRef);
                }
            });
            state.listingLoaded = true;
            //console.log("Store is working");
            console.log(state.listingArray);
        }
    }
  })
