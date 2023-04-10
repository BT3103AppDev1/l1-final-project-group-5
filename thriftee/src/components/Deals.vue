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

            <div class="items" v-for="product in buying_list" :key="product.uid">
                <div class="buyingitems">
                    <div id="buylistingtitle">
                        <router-link id = "listingbutton" :to="{ name: 'ViewListing', params:{ listingid: product.uid } }"> <em> {{ product.title }} </em> </router-link>
                    </div>
                    <div id="buystatusbutton">
                        <button id = "buyingstatusbutton" type="button" v-if="product.status === 'Pending'"> Pending</button> 
                        <!-- change above to {{ status }} later instead of pending-->
                        <!-- NOTE: changes from Pending to Review -->
                        <!-- IF offer accepted by seller, button id change fr buyingstatusbutton to reviewstatusbutton -->
                        <button id="paystatusbutton" v-else-if="product.status === 'Accepted'" @click="openQR">Pay</button>
                        <button id="reviewstatusbutton" v-else-if="product.status === 'Paid'" @click="openQR">Review</button>
                        <router-link class="link" :to="{ name: 'CreateReviewView', params:{ listingid: listing.ListingID, isbuyer:true } }"> <button @click="navigate" role="link" id = "reviewstatusbutton" type="button"> <u> {{ listing.Title }}</u></button>  </router-link>
                        <div class="qrcode" v-if="showQR">
                            <img src="qr.png">
                            <button @click="closeQR">Close Popup</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <h2 v-if="buying_list.length === 0">No buying deals</h2>
        </div>
       
        <div id="sellingdeals">
            <h1> Selling</h1>

            <div class="items" v-for="product in selling_list" :key="product.uid">
                <div class="sellingitems">
                    <div id="selllistingtitle">
                        <router-link id = "listingbutton" :to="{ name: 'ViewListing', params:{ listingid: product.uid } }"> <em> {{ product.title }} </em> </router-link>
                    </div>
                    <div id="sellbuttons">
                        <div id="sellstatusbutton" v-if="product.status === 'Pending'">
                            <button id = "acceptbutton" type="button" @click="acceptDeal(product.uid, product.buyerID)"> Accept </button> 
                            <button id = "rejectbutton" type="button"> Reject </button> 
                            <!-- change above to {{ status }} later instead of Accept-->
                            <!-- NOTE: changes from Accept to Review -->
                            <!-- IF offer accepted by seller, button id change fr buyingstatusbutton to reviewstatusbutton -->
                        </div>
                        <div v-else-if="product.status === 'Accepted'" id="accepted-deals">
                            <button @click="confirmPayment(product.uid, product.buyerID)">✓</button>
                        </div>
                        <div v-else-if="product.status === 'Paid'" id="paid-deals">
                            <button>Paid</button>
                        </div>
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
    import { collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
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
                user_uid: "",
                showQR: false
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
                        sellerID: dataRef.SellerID,
                        status: dataRef.Status
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
                        buyerID: dataRef.BuyerID,
                        status: dataRef.Status
                    })
                })
            },

            async acceptDeal(listing_uid, buyer_uid) {
                const query_accept = query(collection(db, "Offers"), where("ListingID", "==", listing_uid), where("BuyerID", "==", buyer_uid))
                const querySnapshot = await getDocs(query_accept);
                const docRef = doc(db, "Offers", querySnapshot.docs[0].id)

                await updateDoc(docRef, {
                    Status: "Accepted"
                })
                location.reload()
                alert("Offer Accepted!")
            },

            async confirmPayment(listing_uid, buyer_uid) {
                const query_accept = query(collection(db, "Offers"), where("ListingID", "==", listing_uid), where("BuyerID", "==", buyer_uid))
                const querySnapshot = await getDocs(query_accept);
                const docRef = doc(db, "Offers", querySnapshot.docs[0].id)

                await updateDoc(docRef, {
                    Status: "Paid"
                })
                location.reload()
                alert("Payment confirmed!")
            },

            openQR() {
                this.showQR = true
            },

            closeQR() {
                this.showQR = false
            }
        }, 
}
</script>

    
<style scoped>
#paystatusbutton {
    display: flex;
    justify-content: center;
    background-color: rgb(236, 238, 150);
    border-radius: 5px;
    border: 0.8px solid black;
    width: 100%;
    color: black;

}

#paystatusbutton:hover {
    background-color: rgb(221, 224, 11);
    color: white;
}

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
    text-align: left;
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
    background-color: green;
  
}

#acceptbutton {
    display: flex;
    justify-content: center;
    background-color: rgba(165, 197, 175, 0.752);
    border-radius: 5px;
    border: 0.8px solid black;
    width: 100%;
    color: black;

}

#acceptbutton:hover {
    background-color: rgba(43, 121, 67, 0.752);
    color: white;
}

#rejectbutton {
    display: flex;
    justify-content: center;
    background-color: rgba(223, 120, 146, 0.752);
    border-radius: 5px;
    border: 0.8px solid black;
    width: 100%;
    color: black;

}

#rejectbutton:hover {
    background-color: rgba(148, 20, 52, 0.752);
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
    /* border-bottom: 1px solid rgb(98, 95, 95); */
    font-size: 1.15em;
 }


 #listingbutton:hover {
    background: transparent;
    border: none;
    color: rgb(170, 168, 168);
    /* border-bottom: 1px solid rgb(160, 154, 154); */
 }

    
hr {
    height: 1px;
    width: 100%;
    background-color: black;

}

#linebreak {
    margin: auto;
}

.qrcode {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  padding: 20px;
}

</style>