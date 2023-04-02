<template>

<div id = "container">
    <div id="linebreak">
        <hr>
    </div>
    
    <div id = "container2">
        <div>
            <router-link to="/profilelistings"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "listingsbutton" type="button"> <em>Listings</em></button> 
            </router-link>  
        </div>

        <div>
            <router-link to="/profilereviews"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "reviewsbutton" type="button"> <em>Reviews</em></button> 
            </router-link>  
        </div>

        <div>
            <router-link to="/deals"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "dealsbutton" type="button"> <em>Deals</em></button> 
            </router-link>  
        </div>
    </div>

   
    <div id = "container3">
        <div id="buyingdeals">
            <h1> Buying</h1>

            <div class="items" v-for="product in buying_list" :key="product.title">
                <div class="buyingitems">
                    <div id="buylistingtitle">
                        <button id = "listingbutton" type="button"> <em> {{ product.title }}</em></button> 
                    </div>
                    <div id="buystatusbutton">
                        <button id = "buyingstatusbutton" type="button"> Pending</button> 
                        <!-- change above to {{ status }} later instead of pending-->
                        <!-- NOTE: changes from Pending to Review -->
                        <!-- IF offer accepted by seller, button id change fr buyingstatusbutton to reviewstatusbutton -->
                    </div>
                </div>
            </div>
            <h2 v-if="buying_list.length === 0">No buying deals</h2>
        </div>
       
        <div id="sellingdeals">
            <h1> Selling</h1>

            <div class="items" v-for="product in selling_list" :key="product.title">
                <div class="sellingitems">
                    <div id="selllistingtitle">
                        <button id = "listingbutton" type="button"> <em> {{ product.title }}</em></button> 
                    </div>
                    <div id="sellstatusbutton">
                        <button id = "sellingstatusbutton" type="button"> Accept </button> 
                        <button type="button"> Reject </button> 
                        <!-- change above to {{ status }} later instead of Accept-->
                        <!-- NOTE: changes from Accept to Review -->
                        <!-- IF offer accepted by seller, button id change fr buyingstatusbutton to reviewstatusbutton -->
                    </div>
                </div>
            </div>
            <h2 v-if="selling_list.length === 0">No selling deals</h2>
        </div>
    </div>
</div>

</template>
    
<script>
import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { collection, query, where, getDocs } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    const user = auth.currentUser;

    export default {
        name: "Deals",

        data() {
            return {
                products: [
                    { title: "Flannel Shirt", condition: "Like New", price: "$18" },
                    { title: "Jeans", condition: "Like New", price: "$15" },
                    { title: "Baseball Cap", condition: "Brand New", price: "$8" },
                    { title: "Leather Shoes", condition: "Like New", price: "$12" },
                    { title: "Accessory", condition: "Like New", price: "$5" },
                    { title: "Shorts", condition: "Brand New", price: "$10" },
                    { title: "Flannel Shirt", condition: "Like New", price: "$18" },
                    { title: "Jeans", condition: "Like New", price: "$15" },
                    { title: "Baseball Cap", condition: "Brand New", price: "$8" },
                    { title: "Leather Shoes", condition: "Like New", price: "$12" },
                    { title: "Accessory", condition: "Like New", price: "$5" },
                    { title: "Shorts", condition: "Brand New", price: "$10" }
                ], 
                buying_list: [], // test
                selling_list: [],
                user_uid: ""
            };
        },

        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.user_uid = user.uid;
                this.getBuyingList()
                this.getSellingList()
            })
        },

        methods: {
            getBuyingList: async function() {
                const buyingQuery = query(collection(db, "Offers"), where("BuyerID", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(buyingQuery);
                querySnapshot.forEach((doc) => {
                    let dataRef = doc.data()
                    this.buying_list.push({ 
                        title: dataRef.ListingName, 
                        uid: dataRef.ListingID, 
                        offerPrice: dataRef.OfferAmount,
                        sellerID: dataRef.SellerID
                    })
                })
            },

            getSellingList: async function() {
                const sellingQuery = query(collection(db, "Offers"), where("SellerID", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(sellingQuery);
                querySnapshot.forEach((doc) => {
                    let dataRef = doc.data()
                    this.selling_list.push({ 
                        title: dataRef.ListingName, 
                        uid: dataRef.ListingID, 
                        offerPrice: dataRef.OfferAmount,
                        buyerID: dataRef.BuyerID
                    })
                })
            },
        }, 
}
</script>

    
<style scoped>
#reviewstatusbutton {
    display: flex;
    justify-content: center;
    background-color: rgb(201, 248, 226);
    border-radius: 5px;
    border: 0.8px solid black;
    width: 100%;
    color: black;

}

#reviewstatusbutton:hover {
    background-color: rgb(179, 225, 203);
    color: white;
}
.buyingitems {
    display: flex;
    justify-content: center;
    margin-top: 3vh;
    margin-bottom: 3vh;
}

.sellingitems {
    display: flex;
    justify-content: center;
    margin-top: 3vh;
    margin-bottom: 3vh;
}

#buylistingtitle {
    width: 100%;
   
}

#selllistingtitle {
    width: 100%;
   
}

#buystatusbutton {
    display: flex;
    justify-content: center;
    margin-left: 3vw;
  
}

#buyingstatusbutton {
    display: flex;
    justify-content: center;
    background-color: rgba(236, 208, 225, 0.802);
    border-radius: 5px;
    border: 0.8px solid black;
    width: 100%;
    color: black;

}

#buyingstatusbutton:hover {
    background-color: rgb(236, 208, 225);
    color: white;
}

#sellstatusbutton {
    display: flex;
    justify-content: center;
    margin-left: 3vw;
  
}

#sellingstatusbutton {
    display: flex;
    justify-content: center;
    background-color: rgba(223, 120, 146, 0.752);
    border-radius: 5px;
    border: 0.8px solid black;
    width: 100%;
    color: black;

}

#sellingstatusbutton:hover {
    background-color: rgba(230, 174, 188, 0.858);
    color: white;
}

#items {
    margin-top: 5vh;
    font-size: 1.2em;
}

#container3 {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
}

#buyingdeals {
    margin-right: 5vw;
    border-right: 2px solid black;
    padding-right: 5vw;
}

#buyingdeals h1 {
    /* font-weight:bold; */
    font-family: Monaco;
    color: white;
    border: 2px solid rgb(114, 113, 113);
    border-radius: 5px;
    font-size: 1.5em;
    background-color: rgb(116, 115, 115);
    margin-bottom: 5vh;
    padding-left: 10vh;
    padding-right: 10vh;
}

#sellingdeals h1 {
    /* font-weight:bold; */
    font-family: Monaco;
    color: white;
    border: 2px solid rgb(114, 113, 113);
    border-radius: 5px;
    font-size: 1.5em;
    background-color: rgb(116, 115, 115);
    margin-bottom: 5vh;
    padding-left: 10vh;
    padding-right: 10vh;
}

#container2 {
    display: flex;
    justify-content: center;
}

#listingsbutton {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 1.8em;
    color: rgb(8, 8, 8);
    margin-right: 5vw;
 }


 #listingsbutton:hover {
    font-size: 1.8em;
    color: rgb(117, 113, 113);
    text-decoration: underline;
 }

 #reviewsbutton {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 1.8em;
    color: rgb(8, 8, 8);
 }


 #reviewsbutton:hover {
    font-size: 1.8em;
    color: rgb(117, 113, 113);
    text-decoration: underline;
 }

 #dealsbutton {
    background: transparent;
    border: none;
    margin-left: 5vw;
    font-size: 1.8em;
    color: rgb(8, 8, 8);
 }


 #dealsbutton:hover {
    font-size: 1.8em;
    color: rgb(117, 113, 113);
    text-decoration: underline;
 }

 #listingbutton {
    background: transparent;
    border: none;
    color: rgb(8, 8, 8);
    border-bottom: 1px solid rgb(98, 95, 95);
    font-size: 1.15em;
 }


 #listingbutton:hover {
    background: transparent;
    border: none;
    color: rgb(170, 168, 168);
    border-bottom: 1px solid rgb(160, 154, 154);
 }

    
hr {
    height: 1px;
    width: 100%;
    background-color: black;

}

#linebreak {
    margin: auto;
}

</style>