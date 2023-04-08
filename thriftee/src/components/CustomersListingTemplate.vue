<template>
    <div id = "customers-listing-template">
        
       
        <div id = "containerleft">
        <div id = "back">
            <button id = "backbutton" type="button" @click="goBack">←</button> 
        </div>

           <div id="top">
                <h4><em>{{listing_category}}</em></h4> 
            </div>
            <h1> {{listing_name}}</h1>
            <div id="viewprofile">
                <h3><em>${{listing_price}}</em></h3>
                <div id = "listedby">
                    <p>listed by</p>
                </div>
                <router-link v-if="seller_uid" class="link" :to="{ name: 'CustomerProfileView', params:{ sellerid: seller_uid } }"> <button @click="navigate" role="link" id = "sellerpagebutton" type="button"> <u> {{seller_name}}</u></button>  </router-link>
                <!-- <router-link to="/sellerprofile">
                    custom
                    v-slot="{ navigate }" >
                    <button @click="navigate" role="link" id = "signupbutton" type="button"> <u> {{seller_name}}</u></button> 
                </router-link>   -->
           
              
              
            </div>
                <p> Category: {{listing_category}}</p>
                <p id="colourfield"> Colour: 
                    <span id ="colourcircle" :style="{'background-color':listing_colour}"></span>
                </p>
                <p> Condition: {{listing_condition}}</p>
                <p> Size: {{listing_size}}</p>
                <!-- <p> Description: Lightly worn, bought around 3 months ago</p>  -->
            <div id = "buttonsupdate">
                
                <button @click="goToTelegram" id = "chatbutton" type="button"> Chat</button> 
                <button id = "makeofferbutton" type="button" @click="openOfferPopup">Make Offer</button> 
                <offer-popup :isOpen="isPopupOpen" :defaultAmount="listing_price" @send-offer="submitOffer" @close="closeOfferPopup" v-if="listing_price"/>
            </div>
        </div>

        <div id = "containerright">
         <img src="listingdefault.jpeg" alt="listing picture">
     </div>
    </div>
  
</template>
 
<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc, collection, addDoc } from "firebase/firestore";
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
                value: 4, //what is this for?
                buyer_name: "",
                buyer_uid: "",
                // listing_uid: "tpwwZUVVF9fhlc0Iw2Xt", //placeholder for listing uid
                listing_uid: this.listingUID,
                listing_category: null,
                listing_price: null, 
                listing_name: null,
                listing_condition: null,
                listing_colour: null,
                listing_size: null,
                telegram: "https://t.me/",
                isPopupOpen: false,
                offerAmount: 0,
                seller_uid: null, //placeholder for seller uid
                location: null,
                seller_name: null
            }
        },
        
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.buyer_name = user.displayName;
                this.buyer_uid = user.uid;
            })
            this.getListingDetails()
        },
        
        methods: {
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
                let userProfile = await getDoc(doc(db, "Profiles", this.seller_uid))
                let userProfileData = userProfile.data();
                this.seller_name = userProfileData.Name;
            },

            async getName() {
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                this.name = userProfileData.Name;
            },

            async goToTelegram() {
                let userProfile = await getDoc(doc(db, "Profiles", this.seller_uid)) // shld get telegram from unique listing
                let userProfileData = userProfile.data();
                this.telegram = this.telegram + userProfileData.Telegram;
                window.open(this.telegram, '_blank')
            },

            openOfferPopup() {
                this.isPopupOpen = true
            },

            closeOfferPopup() {
                this.isPopupOpen = false
            },

            submitOffer(offerAmount) {
                this.offerAmount = offerAmount;
                console.log(offerAmount)
                this.updateOfferDB()
            },

            async updateOfferDB() {
                try {
                    await addDoc(collection(db, "Offers"), { 
                        SellerID: this.seller_uid,
                        BuyerID: this.buyer_uid,
                        ListingID: this.listing_uid,
                        ListingName: this.listing_name,
                        OfferAmount: this.offerAmount,
                        Status: "Pending"
                    })
                    alert("Offer sent!")
                } catch(error) {
                    alert("Error saving offer: ", error)
                    console.log(error)
                }
            },

            goBack() {
                window.history.back()
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
}

#chatbutton:hover {
    background-color: #41b0c4; 
    color: rgb(21, 20, 20);
    border: 2px solid #41b0c4; 
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
}

#makeofferbutton:hover {
    background-color: #8a2e22; 
    color: rgb(8, 7, 7);
    border: 2px solid #8a2e22; 
}

img {
    width: 70%;
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
    margin-top: 2.1vh;
}

#sellerpagebutton:hover {
    font-size: 0.99em;
    color: black;
    
}

#listedby {
    margin-left: 5vw;
    margin-bottom: 1vh;
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

</style>