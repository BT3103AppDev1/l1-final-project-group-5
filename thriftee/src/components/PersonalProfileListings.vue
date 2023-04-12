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

    <h2 id = "ifnolisting" v-if="listings.length === 0"> No Current Listings </h2>
    <router-link  v-if="listings.length === 0" to="/sell"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "startsellingnow" type="button"> <em>＋  Start Listing </em></button> 
            </router-link>  

    <div id = "container3">
        <div class="rightContainer">
            <div class="displayContainer">
                <div
                    class="product-item"
                    v-for="listing in listings"
                    :key="listing.title"
                >
                    <div class="product-image-placeholder">
                        <p>Image Placeholder</p>
                    </div>
                    <div class="product-text">
                        <div id="productCondition">
                            Condition: {{ listing.data().Condition }}
                        </div>
                        <div id="productTitle">
                            {{ listing.data().Title }}
                        </div>
                        <div id="productPrice">
                            ${{ listing.data().Price }}
                        </div>
                        <router-link class="link" :to="{ name: 'EditListing', params:{ listingid: listing.id } }"> 
                            <button @click="navigate" role="link" id = "editbutton" type="button"><u>Edit</u></button>  
                        </router-link>
                        <button id="deletebutton" type="button" @click="deleteButton(listing.id)"><u>Delete</u></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
   
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
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
                this.name = user.displayName,
                this.uid = user.uid
            })
            
        }, 
        methods: {
            async readData() {
                const querySnapshot = await getDocs(collection(db, "Listings"));
                querySnapshot.forEach((doc) => {
                    if (doc.data().SellerID == this.uid)
                        this.listings.push(doc);
                });
            },
            async deleteButton(listingID) {
                // await deleteDoc(doc(db, "Listings", listingID)) // delete from Listings collection
                // console.log("delete listing from Listings collection")
                // const listingOffersQuery = query(collection(db, "Offers"), where("ListingID", "==", listingID))
                // const querySnapshot = await getDocs(listingOffersQuery)
                // const docRef = doc(db, "Offers", querySnapshot.docs[0].id)
                const querySnapshot = await getDoc(doc(db, "Listings", listingID))
                // await updateDoc(querySnapshot, {
                //     Status: "Deleted"
                // })
                location.reload() 
                alert("Listing deleted! (delete function has not been implemented -- waiting for status database confirmation)")
            },
        },
        created() {
            this.readData();
        },
    }

</script>


<style scoped>

#container3 {
    width: 60vw;
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
    color: rgb(164, 158, 158);
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

 #editbutton {
    margin-right: 1vw;
    font-size: 0.9em;
    margin-top: 1vh;
    background-color: transparent;
    border: none;
    /* border-bottom: 2px solid rgb(98, 98, 98); */
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
    /* border-bottom: 2px solid rgb(98, 98, 98); */
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
    /* border-bottom: 2px solid rgb(172, 84, 84); */
    padding-left:1px;
    padding-right:1px;
    padding-bottom:0px;
    font-weight: bolder;
    color:rgb(172, 84, 84);
 }

 #deletebutton:hover {
    background-color: transparent;
    border:none;
    /* border-bottom: 2px solid rgb(222, 176, 176); */
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
  /* background-color: aqua; */
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
  outline-style: solid;
  width: 17.5vw;
  height: auto;
  padding: 10px;
}
.product-image-placeholder {
  outline-style: dashed;
  position: relative;
  padding: 20%;
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
}

#startsellingnow {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid grey;
    color: grey;
}

#startsellingnow:hover {
    color: rgb(215, 209, 209);
    border-bottom: 2px solid rgb(215, 209, 209);
}

</style>
