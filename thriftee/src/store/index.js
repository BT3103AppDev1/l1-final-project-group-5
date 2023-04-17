import {createStore} from 'vuex'



import firebaseApp from '../firebase.js';
import { getFirestore, onSnapshot } from "firebase/firestore";
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
            const collectionRef = collection(db, "Listings");
            onSnapshot(collectionRef, (snap) => {
                snap.forEach((doc) => {
                    const dataRef = doc.data();
                    dataRef.ListingID = doc.id;
                    const index = state.listingArray.findIndex(listing => listing.ListingID === doc.id);
                    if (index === -1) {
                        state.listingArray.push(dataRef);
                    } else {
                        state.listingArray[index] = dataRef;
                    }
                });
            });
            state.listingLoaded = true;
        }
    }
  })
