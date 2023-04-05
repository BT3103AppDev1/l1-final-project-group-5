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
        <h1>reviews</h1>
    </div>
    </div>

</template>
    
<script>
import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    export default {
        name: "PersonalProfileReviews",
        data() {
            return {
                value: 4,
                name: "", 
                uid: "", 
            }
        },
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.name = user.displayName;
                this.uid = user.uid;
            })
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

#linebreak {
    margin: auto;
}

</style>