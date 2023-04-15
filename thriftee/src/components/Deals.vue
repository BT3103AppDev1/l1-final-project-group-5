<template>

<div id = "container">
    <div id="linebreak">
      
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
            <h2 v-if="buying_list.length === 0">No buying deals</h2>

            <!-- test using table, delete from here on if dw -->
            <table v-else class="deal_table">
                <thead>
                    <tr>
                        <th>Listing</th>
                        <th>Seller</th>
                        <th>Offer Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in buying_list" :key="product.uid">
                        <td>
                            <div id="buylistingtitle">
                                <router-link id = "listingbutton" :to="{ name: 'ViewListing', params:{ listingid: product.uid } }">   <u> {{ product.title }} </u> </router-link>
                            </div>
                        </td>
                        <td>
                            <router-link id = "profilebutton" :to="{ name: 'CustomerProfileView', params:{ sellerid: product.sellerID } }">  <u> {{product.sellerName}} </u>  </router-link>
                        </td>
                        <td>${{product.offerPrice}}</td>
                        <td>
                            <div id="buystatusbutton">
                                <button id = "buyingstatusbutton" type="button" v-if="product.status === 'Pending'"> <em>Pending</em></button> 
                                <!-- change above to {{ status }} later instead of pending-->
                                <!-- NOTE: changes from Pending to Review -->
                                <!-- IF offer accepted by seller, button id change fr buyingstatusbutton to reviewstatusbutton -->
                                <div id="buyer-accepted_buttons" v-else-if="product.status === 'Accepted'">
                                    <button id="paystatusbutton"  @click="openQR(product.sellerID)">Pay</button>
                                    <router-link class="link" :to="{ name: 'CreateReviewView', params:{ listingid: product.uid, revieweeid: product.sellerID, isbuyer: true } }"> 
                                        <button @click="navigate" role="link" id = "reviewstatusbutton" type="button">Review</button>  
                                    </router-link>
                                </div>
        
                                
                                <div id = "actioncolumn" v-else-if="product.status === 'Sold Out'">
                                    <p id="soldlisting">Listing Sold</p>
                                    <!-- <button id="trashcan">⌫</button> -->
                                    <button id="trashcan" @click="deleteOfferFromOffers(product.uid, product.sellerID)">🗑️</button>
                                </div>  
                                <div id = "actioncolumn" v-else-if="product.status === 'Rejected'">
                                    <p id="soldlisting">Offer Rejected</p>
                                    <button id="trashcan" @click="deleteOfferFromOffers(product.uid, product.sellerID)">🗑️</button>
                                </div>  
                                <div id = "actioncolumn" v-else-if="product.status === 'Removed'">
                                    <p id="soldlisting">Listing Removed</p>
                                    <button id="trashcan" @click="deleteOfferFromOffers(product.uid, product.sellerID)">🗑️</button>
                                </div>  
                                <div class="qrcode" v-if="showQR">
                                    <img :src="seller_QR_url">
                                    <button @click="closeQR">Close QR Code</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- delete till here -->
        </div>
       
        <div id="sellingdeals">
            <h1> Selling</h1>
            <h2 v-if="selling_list.length === 0">No selling deals</h2>

            <!-- test using table, delete from here on if dw -->
            <table v-else class="deal_table">
                <thead>
                    <tr>
                        <th>Listing</th>
                        <th>Buyer</th>
                        <th>Offer Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="product in selling_list" :key="product.uid">
                        <tr>
                            <td :rowspan="product.offer.length">
                                <div id="selllistingtitle" style="width:10vw">
                                    <router-link id = "listingbutton" :to="{ name: 'ViewListing', params:{ listingid: product.uid } }">  <u> {{ product.title }} </u>  </router-link>
                                </div>
                            </td>
                            <td>   
                                <router-link id = "profilebutton" :to="{ name: 'CustomerProfileView', params:{ sellerid: product.offer[0].buyerID } }">  <u> {{product.offer[0].buyerName}} </u>  </router-link>
                            </td>
                            <td>${{product.offer[0].offerPrice}}</td>
                            <td>
                                <div id="sellbuttons">
                                    <div id="sellstatusbutton" v-if="product.offer[0].status === 'Pending'">
                                        <button id = "acceptbutton" type="button" @click="acceptDeal(product.uid, product.offer[0].buyerID)"> ✓ </button> 
                                        <button id = "rejectbutton" type="button" @click="rejectDeal(product.uid, product.offer[0].buyerID)"> ✗ </button> 
                                        <!-- change above to {{ status }} later instead of Accept-->
                                        <!-- NOTE: changes from Accept to Review -->
                                        <!-- IF offer accepted by seller, button id change fr buyingstatusbutton to reviewstatusbutton -->
                                    </div>
                                    <div v-else-if="product.offer[0].status === 'Accepted'" id="accepted-deals">
                                        <router-link style="text-decoration: none" class="link" :to="{ name: 'CreateReviewView', params:{ listingid: product.uid, revieweeid: product.offer[0].buyerID, isbuyer: false } }"> <button @click="navigate" role="link" id = "reviewstatusbutton" type="button">Review</button>  </router-link>
                                    </div>
                                    <div v-else-if="product.offer[0].status === 'Paid'" id="paid-deals">
                                        <!-- <button>Paid</button> -->
                                        <router-link style="text-decoration: none" class="link" :to="{ name: 'CreateReviewView', params:{ listingid: product.uid, revieweeid: product.offer[0].buyerID, isbuyer: false } }"> <button @click="navigate" role="link" id = "reviewstatusbutton" type="button">Review</button>  </router-link>
                                    </div>
                                </div>   
                            </td>
                        </tr>
                        <tr v-for="item in product.offer.slice(1)" :key="product.uid + item.buyerID">
                            <td>
                                <router-link id = "profilebutton" :to="{ name: 'CustomerProfileView', params:{ sellerid: item.buyerID } }">  <u> {{item.buyerName}} </u>  </router-link>
                            </td>
                            <td>${{item.offerPrice}}</td>
                            <td>
                                <div id="sellbuttons">
                                    <div id="sellstatusbutton" v-if="item.status === 'Pending'">
                                        <button id = "acceptbutton" type="button" @click="acceptDeal(product.uid, item.buyerID)"> ✓ </button> 
                                        <button id = "rejectbutton" type="button"> ✗ </button> 
                                        <!-- change above to {{ status }} later instead of Accept-->
                                        <!-- NOTE: changes from Accept to Review -->
                                        <!-- IF offer accepted by seller, button id change fr buyingstatusbutton to reviewstatusbutton -->
                                    </div>
                                    <div v-else-if="item.status === 'Accepted'" id="accepted-deals">
                                        <router-link style="text-decoration: none" class="link" :to="{ name: 'CreateReviewView', params:{ listingid: product.uid, revieweeid: item.buyerID, isbuyer: false } }"> <button @click="navigate" role="link" id = "reviewstatusbutton" type="button">Review</button>  </router-link>
                                    </div>
                                    <div v-else-if="item.status === 'Paid'" id="paid-deals">
                                        <!-- <button>Paid</button> -->
                                        <router-link style="text-decoration: none" class="link" :to="{ name: 'CreateReviewView', params:{ listingid: product.uid, revieweeid: item.buyerID, isbuyer: false } }"> <button @click="navigate" role="link" id = "reviewstatusbutton" type="button">Review</button>  </router-link>
                                    </div>
                                </div>   
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <!-- delete till here -->
        </div>
    </div>
</div>

</template>
    
<script>
import firebaseApp from '../firebase.js';
    import { getFirestore, onSnapshot } from "firebase/firestore";
    import { collection, query, where, getDocs, getDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    const db = getFirestore(firebaseApp);
    const auth = getAuth();

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
                showQR: false,
                seller_QR_url: null
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
                onSnapshot(buyingQuery, (snap) => {
                    const updatedBuyingList = [];
                    snap.forEach((doc) => {
                        let dataRef = doc.data()
                        //Removed from deals if buyer has reviewed item
                        if (!dataRef.isBuyerReviewed) {
                            updatedBuyingList.push({ 
                                title: dataRef.ListingName, 
                                uid: dataRef.ListingID, 
                                offerPrice: dataRef.OfferAmount,
                                sellerID: dataRef.SellerID,
                                status: dataRef.Status,
                                sellerName: dataRef.SellerName
                            })
                        }
                    })
                    this.buying_list = updatedBuyingList;
                })
            },

            getSellingList: async function() {
                const sellingQuery = query(collection(db, "Offers"), where("SellerID", "==", auth.currentUser.uid))
                onSnapshot(sellingQuery, (snap) => {
                    const updatedSellingList = [];
                    snap.forEach((doc) => {
                        const dataRef = doc.data();
                        //Selling table only loads if status is not "Sold Out", "Reviewed", "Rejected" AND isSellerReviewed = false
                        if (dataRef.Status !== "Sold Out" && dataRef.Status !== "Reviewed" && dataRef.Status !== "Rejected" && dataRef.Status !== "Removed" && !dataRef.isSellerReviewed) {
                            const existingOfferIndex = updatedSellingList.findIndex((listing) => listing.uid === dataRef.ListingID);

                            const updatedOffer = {
                                buyerID: dataRef.BuyerID,
                                buyerName: dataRef.BuyerName,
                                offerPrice: dataRef.OfferAmount,
                                status: dataRef.Status,
                            };

                            if (existingOfferIndex !== -1) {
                                updatedSellingList[existingOfferIndex].offer.push(updatedOffer);
                            } else {
                                updatedSellingList.push({
                                    title: dataRef.ListingName,
                                    uid: dataRef.ListingID,
                                    offer: [updatedOffer],
                                });
                            }
                        }
                    });

                    this.selling_list = updatedSellingList;
                })
            },

            async acceptDeal(listing_uid, buyer_uid) {
                const queryAccept = query(collection(db, "Offers"), where("ListingID", "==", listing_uid), where("BuyerID", "==", buyer_uid))
                const querySnapshot = await getDocs(queryAccept);
                const docRef = doc(db, "Offers", querySnapshot.docs[0].id)

                await updateDoc(docRef, {
                    Status: "Accepted"
                })

                // update other offers of this listing (when listing is offered to another buyer)
                const queryOthers = query(collection(db, "Offers"), where("ListingID", "==", listing_uid), where("BuyerID", "!=", buyer_uid))
                const queryOthersSnapshot = await getDocs(queryOthers);
                
                queryOthersSnapshot.forEach(function(doc) {
                    console.log(doc.data())
                    updateDoc(doc.ref, {
                        Status: "Sold Out"
                    })
                })
                
                // update Listing itself to be sold/unavailable
                const listingDocRef = doc(db, "Listings", listing_uid)
                try{
                    await updateDoc(listingDocRef, {
                        Listing_Available: false
                    });
                } catch(error) {
                    alert("Error: " + error)
                }

                alert("Offer Accepted!")
            },

            async rejectDeal(listing_uid, buyer_uid) {
                const queryReject = query(collection(db, "Offers"), where("ListingID", "==", listing_uid), where("BuyerID", "==", buyer_uid))
                const querySnapshot = await getDocs(queryReject);
                const docRef = doc(db, "Offers", querySnapshot.docs[0].id)

                await updateDoc(docRef, {
                    Status: "Rejected"
                })

                alert("Offer Rejected!")
            },

            // async confirmPayment(listing_uid, buyer_uid) {
            //     const query_accept = query(collection(db, "Offers"), where("ListingID", "==", listing_uid), where("BuyerID", "==", buyer_uid))
            //     const querySnapshot = await getDocs(query_accept);
            //     const docRef = doc(db, "Offers", querySnapshot.docs[0].id)

            //     await updateDoc(docRef, {
            //         Status: "Paid"
            //     })
            //     location.reload()
            //     alert("Payment confirmed!")
            // },

            async deleteOfferFromOffers(listing_uid, seller_uid) {
                const query_delete = query(collection(db, "Offers"), where("ListingID", "==", listing_uid), where("SellerID", "==", seller_uid), where("BuyerID", "==", this.user_uid));
                const querySnapshot = await getDocs(query_delete);
                const docRef = doc(db, "Offers", querySnapshot.docs[0].id)
                try {
                    if (confirm('Are you sure you want to remove this offer?')) {
                        await deleteDoc(docRef)
                        !alert('Offer successfully removed!')
                    }
                } catch(error) {
                    alert("Unsuccessful removal, error:" + error)
                }
            },

            async openQR(seller_uid) {
                const docRef = doc(db, "Profiles", seller_uid)
                const docSnap = await getDoc(docRef)
                const dataRef = docSnap.data();
                this.seller_QR_url = dataRef.QRCode
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
    background-color: transparent;
    border: none;
    font-weight: 600;
    color: rgba(185, 80, 80, 0.896);
    font-size: 1.1em;
}

#paystatusbutton:hover {
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: none;
    font-weight: 600;
    font-size: 1.1em;
    border-bottom: 2px solid rgba(185, 80, 80, 0.896);
}

#reviewstatusbutton {
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: none;
    color: rgb(32, 155, 101);
    text-decoration: none;
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 0.1vh;
}

#reviewstatusbutton:hover {
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: none;
    text-decoration: none;
    font-size: 1.1em;
    font-weight: 600;
    margin-top: 0.1vh;
    border-bottom: 2px solid rgb(32, 155, 101);
}
.buyingitems {
    display: flex;
    justify-content: center;
    margin-top: 4vh;
    margin-bottom: 4vh;
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
    /* margin-left: 3vw; */
  
}

#buyingstatusbutton {
    display: flex;
    justify-content: center;
    background-color: transparent;
    border: none;
    font-weight: 600;
    color: rgba(76, 73, 73, 0.896);
    font-size: 1.1em;
}

#sellstatusbutton {
    display: flex;
    justify-content: center;
    /* margin-left: 3vw; */
}

#acceptbutton {
    display: flex;
    justify-content: center;
    color: rgba(51, 126, 75, 0.752);
    /* border: 0.8px solid black; */
    border:none;
    font-size: 1.3em;
    width: 100%;
    background-color: transparent;
    margin-right:1vw;

}

#acceptbutton:hover {
    border-bottom: 2px solid rgba(51, 126, 75, 0.752);
   
}

#rejectbutton {
    display: flex;
    justify-content: center;
   
    width: 100%;
    color: rgba(189, 68, 68, 0.752);
    /* border: 0.8px solid black; */
    border:none;
    font-size: 1.3em;
    width: 100%;
    background-color: transparent;

}

#rejectbutton:hover {
    border-bottom: 2px solid rgba(189, 68, 68, 0.752);
}

#items {
    margin-top: 5vh;
    font-size: 1.2em;
}

#container3 {
    display: flex;
    justify-content: center;
    /* margin-top: 5vh; */
    border-top: 2px solid black;
    width: 60vw;
}

#buyingdeals {
    margin-right: 5vw;
    border-right: 2px solid black;
    padding-right: 5vw;
}

#buyingdeals h1 {
    /* font-weight:bold; */
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: rgb(52, 50, 50);
    /* border: 2px solid rgb(114, 113, 113); */
    border-radius: 5px;
    margin-top: 3vh;
    font-size: 1.5em;
    background-color: transparent;
    margin-bottom: 5vh;
    padding-left: 10vh;
    padding-right: 10vh;
    font-weight: bold;
    border: 2px solid rgb(114, 113, 113);
}

#sellingdeals h1 {
    /* font-weight:bold; */
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: rgb(52, 50, 50);
    border: 2px solid rgb(114, 113, 113);
    border-radius: 5px;
    margin-top: 3vh;
    font-size: 1.5em;
    background-color: transparent;
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
    color: rgb(164, 158, 158);
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

 #profilebutton:hover {
    background: transparent;
    border: none;
    color: rgb(170, 168, 168);
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

a { text-decoration: none; }

#linebreak {
    margin-top: 3vh;
}

#tickbutton {
    /* background-color: transparent; */
    font-size: 1.1em;
    /* border: none; */
}


.deal_table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    
}

.deal_table thead tr {
    background-color: #424547d8;
    color: #ffffff;
    text-align: left;
}

.deal_table td, .deal_table th {
  padding: 12px 15px;
  border: 1px rgb(219, 224, 224) solid;
  
}

.deal_table tbody tr {
    border-bottom: 1px solid #dddddd;
    border-radius: 50px;
}

.deal_table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}


.deal_table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}

#buyer-accepted_buttons {
    display: flex;
}

#actioncolumn {
    display: flex;
}

#soldlisting {
    color: red;
    font-weight: 600;
}

#trashcan {
    background-color: transparent;
    border: none;
    /* color: black; */
    margin-top:0.2vh;
    font-size: 1.3em;
    /* font-weight: bolder; */
}

#trashcan:hover {
    /* background-color: transparent; */
    /* border: none; */
    /* color: rgb(163, 160, 160); */
    margin-top:0.5vh;
    /* font-size: 1.3em;  */
    /* font-weight: bolder; */
}

#container {
    
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>