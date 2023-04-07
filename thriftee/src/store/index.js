import {createStore} from 'vuex'



import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
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
                    dataRef.ListingID = doc.id;
                    state.listingArray.push(dataRef);
                }
            });
            state.listingLoaded = true;
            //console.log("Store is working");
            //console.log(state.listingArray);
        }
    }
  })
