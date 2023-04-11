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
                        <router-link to="/sell"
                            custom
                            v-slot="{ navigate }" >
                            <button @click="navigate" role="link" id = "editbutton" type="button">Edit</button>
                        </router-link>  
                        <button id="deletebutton" type="button" @click="deleteButton(listing.id)">Delete</button>
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
    import { collection, doc, getDocs, deleteDoc, query, where } from "firebase/firestore";
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
                const listingOffersQuery = query(collection(db, "Offers"), where("ListingID", "==", listingID))
                const querySnapshot = await getDocs(listingOffersQuery)
                querySnapshot.forEach(function(doc) {
                    console.log(doc.ref)
                    // doc.ref.delete()
                    deleteDoc(doc.ref)
                }) 
                console.log("delete listing offers from Offers collection")
                location.reload() 
                alert("Listing deleted!")
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
    font-size: 0.85em;
    margin-top: 1vh;
    background-color: rgb(188, 191, 192);
    border: 0.1px solid rgb(144, 142, 142);
    border-radius: 5px;
 }

 #editbutton:hover {
    margin-right: 1vw;
    font-size: 0.85em;
    margin-top: 1vh;
    background-color: rgba(81, 94, 97, 0.688);
    border: 0.1px solid rgb(105, 104, 104);
    border-radius: 5px;
 }

 #deletebutton {
    font-size: 0.85em;
    margin-top: 1vh;
    background-color: rgba(231, 137, 137, 0.76);
    border: 0.1px solid rgb(144, 142, 142);
    border-radius: 5px;
 }

 #deletebutton:hover {
    font-size: 0.85em;
    margin-top: 1vh;
    background-color: rgba(164, 71, 71, 0.903);
    border: 0.1px solid rgb(105, 104, 104);
    border-radius: 5px;
  
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

</style>
