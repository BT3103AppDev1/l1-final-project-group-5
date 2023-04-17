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

    <h2 id = "ifnolisting" v-if="readDataLength === 0"> No Current Listings </h2>
    <router-link  v-if="readDataLength === 0" to="/sell"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "startsellingnow" type="button"> <em>＋  Start Listing </em></button> 
            </router-link>  

    <div id = "container3">
        <div class="rightContainer">
            <div class="displayContainer">
                <div
                    class="product-item"
                    v-for="listing in readData"
                    :key="listing.ListingID"
                >
                    <div class="product-image-placeholder">
                        <img :src="listing.Image_URL" alt="" style="width: 16.5vw; height: 31vh; object-fit: cover;">
                    </div>
                    <div class="product-text">
                        <div class="contentofitem">
                        <div id="productCondition">
                            Condition: {{ listing.Condition }}
                        </div>
                        <div id="productTitle">
                            {{ listing.Title }}
                        </div>
                        <div id="productPrice">
                            ${{ listing.Price }}
                        </div>
                    </div>
                        <router-link class="link" :to="{ name: 'EditListing', params:{ listingid: listing.ListingID } }"> 
                            <button @click="navigate" role="link" id = "editbutton" type="button"><u>Edit</u></button>  
                        </router-link>
                        <button id="deletebutton" type="button" @click="deleteButton(listing.ListingID)"><u>Delete</u></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
   
</template>

<script>
    import firebaseApp, { storage } from '../firebase.js';
    import { ref, getDownloadURL } from 'firebase/storage'
    import { getFirestore } from "firebase/firestore";
    import { collection, doc, getDoc, getDocs, updateDoc, query, where} from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();

    
    export default {
        name: "PersonalProfileListings",
        data() {
            return {
                value: 4,
                name: "", 
                uid: "", 
                listings:[],
            }
        },
        mounted() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.name = user.displayName,
                    this.uid = user.uid
                }
            })
            
        }, 
        methods: { 
            // delete personal listing 
            async deleteButton(listingID) {
                const docRef = doc(db, "Listings", listingID);
                try{
                    if (confirm('Are you sure you want to delete this listing?')) {
                        await updateDoc(docRef, {
                            Listing_Available: false
                        });
                        const listingQuery = query(collection(db, "Offers"), where("ListingID", "==", listingID))
                        const querySnapshot = await getDocs(listingQuery)
                        querySnapshot.forEach(function(doc) {
                            updateDoc(doc.ref, {
                                Status: "Removed"
                            })
                        })

                        if (!alert('Listing deleted!')){
                            location.reload()
                        }
                    }
                } catch(error) {
                    alert("Error: " + error)
                }
            },
        },
        computed: {
            readData() {
                const availableListings = this.$store.getters.listingsData.filter((listing) => listing.Listing_Available && listing.SellerID == this.uid);
                return availableListings
            },

            readDataLength() {
                return this.readData.length
            }
        },
    }

</script>


<style scoped>

#container3 {
    width: 60vw;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#container2 {
    display: flex;
    justify-content: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#listingsbutton {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 1.8em;
    color: rgb(164, 158, 158);
    margin-right: 5vw;
 }


 

 #reviewsbutton {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 1.8em;
    color: rgb(8, 8, 8);
 }

 #editbutton {
    margin-right: 1vw;
    font-size: 0.9em;
    margin-top: 1vh;
    background-color: transparent;
    border: none;
    padding-left:1px;
    padding-right:1px;
    padding-bottom:0px;
    font-weight: bolder;
    color:rgb(98, 98, 98);
 }

 #editbutton:hover {
    margin-right: 1vw;
    font-size: 0.9em;
    margin-top: 1vh;
    background-color: transparent;
    border: none;
    padding-left:1px;
    padding-right:1px;
    padding-bottom:0px;
    font-weight: bolder;
    color:rgb(189, 183, 183);
 }

 #deletebutton {
    font-size: 0.85em;
    margin-top: 1vh;
    background-color: transparent;
    border: none;
    padding-left:1px;
    padding-right:1px;
    padding-bottom:0px;
    font-weight: bolder;
    color:rgb(172, 84, 84);
 }

 #deletebutton:hover {
    background-color: transparent;
    border:none;
    padding-left:1px;
    padding-right:1px;
    padding-bottom:0px;
    font-weight: bolder;
    color:rgb(222, 176, 176);
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

hr {
    height: 1px;
    width: 100%;
    background-color: black;
}
.rightContainer {
  width: 75vw;
  display: table-cell;
  
}
.displayContainer {
  display: grid;
  padding: 20px;
  row-gap: 10px;
  column-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  background-color: transparent;
  height: auto;
}
.product-item {
  border: 1px solid black;
  height: auto;
  padding: 10px;
  width: 19vw;
  
}
.product-image-placeholder {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;
  height: 30vh;
}

.product-text {
  padding: 10px;
}

#container3 {
    width: 60vw;
}

#linebreak {
    margin-top: 3vh;
}

#ifnolisting {
    margin-top: 5vw;
    font-weight: bold;
    color: rgb(83, 80, 80);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#startsellingnow {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid grey;
    color: grey;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#startsellingnow:hover {
    color: rgb(215, 209, 209);
    border-bottom: 2px solid rgb(215, 209, 209);
}

img {
  border-radius: 2px;
  border: 1px solid rgb(232, 232, 232);
}



</style>
