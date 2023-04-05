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
                            Condition: {{ listing.Condition }}
                        </div>
                        <div id="productTitle">
                            {{ listing.Title }}
                        </div>
                        <div id="productPrice">
                            ${{ listing.Price }}
                        </div>
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
    import { collection, getDocs } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

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
                        this.listings.push(doc.data());
                });
            },
        },
        created() {
            this.readData();
        },
    }

</script>


<style scoped>

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

hr {
    height: 1px;
    width: 100%;
    background-color: black;
}
.rightContainer {
  /* background-color: aqua; */
  width: 75vw;
  display: table-cell;
  border-left: 2px solid black;
}
.displayContainer {
  display: grid;
  padding: 20px;
  row-gap: 10px;
  column-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  background-color: #7e7d7d20;
}
.product-item {
  outline-style: solid;
  width: 17.5vw;
  height: 35vh;
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

</style>
