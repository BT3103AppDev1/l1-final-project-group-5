<template>
    <div id = "customers-listing-template">
        
       
        <div id = "containerleft">
        <div id = "back">
            <button id = "backbutton" type="button" @click="goBack">←</button> 
        </div>

           <div id="top">
                <h4 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"><em>{{listing_category}}</em></h4> 
            </div>
            <h1 style ="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;  line-height:40px ;"> {{listing_name}}</h1>
            <div id="viewprofile">
                <h3 style = "font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"><em>${{listing_price}}</em></h3>
                <div id = "listedby">
                    <router-link v-if="seller_uid && seller_uid !== buyer_uid" class="link" :to="{ name: 'CustomerProfileView', params:{ sellerid: seller_uid } }"> <button @click="navigate" role="link" id = "sellerpagebutton" type="button">listed by <u> {{seller_name}}</u></button>  </router-link>
                    <router-link v-else class="link" :to="{ name: 'ProfileListings'}"> <button @click="navigate" role="link" id = "sellerpagebutton" type="button">listed by you</button>  </router-link>

                </div>
              
              
            </div>
                <p> Category: {{listing_category}}</p>
                <p id="colourfield"> Colour: 
                    <span id ="colourcircle" :style="{'background-color':listing_colour}"></span>
                </p>
                <p> Condition: {{listing_condition}}</p>
                <p> Size: {{listing_size}}</p>
            <div id = "buttonsupdate">
                
                <button @click="goToTelegram" id = "chatbutton" type="button" v-if="seller_uid !== buyer_uid"> Chat</button> 
                <button @click="editlisting" id = "editlistingbutton" type="button" v-else > Edit Listing</button> 
                <button id = "makeofferbutton" type="button" @click="openOfferPopup" v-if="seller_uid !== buyer_uid">Make Offer</button> 
                <offer-popup :isOpen="isPopupOpen" :defaultAmount="listing_price" @send-offer="submitOffer" @close="closeOfferPopup" v-if="listing_price"/>
            </div>
        </div>

        <div id = "containerright">
         <img :src="image_url" alt="listing picture">
     </div>
    </div>
  
</template>
 
<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc, collection, addDoc } from "firebase/firestore";
    import { query, where, getDocs, updateDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import OfferPopup from './OfferPopup.vue';

    const db = getFirestore(firebaseApp);
    const auth = getAuth();


    export default {
        name: "CustomersListingTemplate",

        components: {
            OfferPopup
        },

        props: {
            listingUID: {
                type: String,
                default: ""
            }
        },

        data() {
            return {
                buyer_name: "",
                buyer_uid: "",
                listing_uid: this.listingUID,
                listing_category: null,
                listing_price: null, 
                listing_name: null,
                listing_condition: null,
                listing_colour: null,
                listing_size: null,
                image_url: null,
                telegram: "https://t.me/",
                isPopupOpen: false,
                offerAmount: 0,
                seller_uid: null, //placeholder for seller uid
                location: null,
                seller_name: null,
            }
        },
        
        mounted() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.buyer_name = user.displayName;
                    this.buyer_uid = user.uid;
                }
            })
            this.getListingDetails()
        },
        
        methods: {
              // To update the listing details on each page for each specific listing clicked
            async getListingDetails() {
                const docRef = doc(db, "Listings", this.listing_uid);
                const docSnap = await getDoc(docRef);
                const dataSnap =  docSnap.data();
                this.listing_category = dataSnap.Category;
                this.listing_price = dataSnap.Price;
                this.listing_name = dataSnap.Title;
                this.listing_condition = dataSnap.Condition;
                this.listing_colour = dataSnap.Colour;
                this.listing_size = dataSnap.Size;
                this.seller_uid = dataSnap.SellerID;
                this.image_url = dataSnap.Image_URL;
                let userProfile = await getDoc(doc(db, "Profiles", this.seller_uid))
                let userProfileData = userProfile.data();
                this.seller_name = userProfileData.Name;
            },

              // To allow the "Chat" button to be linked to the listing's seller's telegram
            async goToTelegram() {
                let userProfile = await getDoc(doc(db, "Profiles", this.seller_uid)) // get seller's telegram handle
                let userProfileData = userProfile.data();
                this.telegram = this.telegram + userProfileData.Telegram;
                window.open(this.telegram, '_blank')
            },

              // To allow users to make an offer when the "Make Offer" button is clicked
            openOfferPopup() {
                this.isPopupOpen = true
            },

              // To close the Make Offer pop up
            closeOfferPopup() {
                this.isPopupOpen = false
            },

              // To svae the new offer entry into the Offers collection in firebase
            submitOffer(offerAmount) {
                this.offerAmount = offerAmount;
                console.log(offerAmount)
                this.updateOfferDB()
            },

              // To update offer made, if a previous offer has been made by the user
            async updateOfferDB() {
                // if offer for particular listing by buyer exists, overwrite the previous offer
                const queryOfferExists = query(collection(db, "Offers"), where("ListingID", "==", this.listing_uid), where("SellerID", "==", this.seller_uid), where("BuyerID", "==", this.buyer_uid));
                const querySnapshot = await getDocs(queryOfferExists);
                if (!querySnapshot.empty) {
                    try {
                        const docRef = doc(db, "Offers", querySnapshot.docs[0].id)
                        const docSnap = await getDoc(docRef);
                        const dataRef = docSnap.data();
                        if (dataRef.Status !== "Pending") {
                            alert("Transaction in progress! Unable to make new offer")
                        } else {
                            await updateDoc(docRef, {
                                Status: "Pending",
                                OfferAmount: this.offerAmount
                            })
                            alert("New Offer sent!")
                        }
                    } catch (error) {
                        alert("Error saving offer: ", error)
                        console.log(error)
                    }
                } else {
                    try {
                        await addDoc(collection(db, "Offers"), { 
                            SellerID: this.seller_uid,
                            SellerName: this.seller_name,
                            BuyerID: this.buyer_uid,
                            BuyerName: this.buyer_name,
                            ListingID: this.listing_uid,
                            ListingName: this.listing_name,
                            OfferAmount: this.offerAmount,
                            Status: "Pending",
                            isBuyerReviewed: false,
                            isSellerReviewed: false
                        })
                        alert("Offer sent!")
                    } catch(error) {
                        alert("Error saving offer: ", error)
                        console.log(error)
                    }
                }
            },

              // To go back to the Explore page (general display page showing all the listings)
            goBack() {
                window.history.back()
            },

              // If listing clicked by user is their own listing, this "Edit" button should be displayed instead of the "Chat" and "Make offer" button
            editlisting() {
                this.$router.push({name: "EditListing", params: {listingid: this.listing_uid}})
            }
        }
    }

        

</script>
 
 
<style scoped>

#backbutton {
    background: transparent;
    border: none;
    font-size: 1.9em;
    font-weight: bolder;
    color: black;
}


#backbutton:hover {
    background: transparent;
    border: none;
    font-size: 1.9em;
    color: grey;
    border-bottom: 0.8px solid #252323;
}

#customers-listing-template{
    display:flex;
    justify-content: center;
    text-align: left;
    line-height: 3vh;
    width: 100vw;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#containerleft {
    margin-top: 5vh;
    flex: 0.4;
}

#containerright {
    margin-top: 9vh;
    flex: 0.3;
}

#containerleft p{
    font-weight: normal;
    font-size: 0.95em;
}

#top {
    margin-bottom: 8vh;
    color:rgb(151, 154, 154);
}

#buttonsupdate {
    margin-top: 5vh;
}

#chatbutton {
    background-color: #2ccbe7; 
    border: 2px solid #2ccbe7; 
    border-radius: 5px;
    color: white;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-style: italic;
    transition-duration: 0.2s;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#chatbutton:hover {
    background-color: #41b0c4; 
    color: rgb(21, 20, 20);
    border: 2px solid #41b0c4; 
}

#editlistingbutton {
    background-color: rgb(162, 160, 160); 
    border:none; 
    border-radius: 5px;
    color: white;
    padding: 10px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 0.9em;
    font-style: italic;
    transition-duration: 0.2s;
    
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#editlistingbutton:hover {
    color: rgb(104, 98, 98);
}

#makeofferbutton {
    background-color: #b74232; 
    border: 2px solid #b74232; 
    border-radius: 5px;
    color: rgb(249, 249, 249);
    padding: 10px 32px;
    margin-left: 35px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-style: italic;
    transition-duration: 0.2s;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#makeofferbutton:hover {
    background-color: #8a2e22; 
    color: rgb(8, 7, 7);
    border: 2px solid #8a2e22; 
}

img {
    width: 100%;
    height: auto;
   
}

#viewprofile {
    display: flex;
}

#sellerpagebutton {
    background: transparent;
    border: none;
    font-size: 0.90em;
    color: #626867;
    margin-top: 1.8vh;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#sellerpagebutton:hover {
    font-size: 0.99em;
    color: black;
    
}

#listedby {
    display: flex;
    margin-left: 4vw;
    margin-bottom: 1vh;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#colourfield {
    display:flex; 
    align-items:center
}

#colourcircle {
    display:inline-block; 
    border-radius: 50%;
    width:20px; 
    height:20px; 
    margin-left:5px;
    border: 1px solid black
}

#containerright{
    margin-top: 15vh;
}

#containerleft {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

</style>