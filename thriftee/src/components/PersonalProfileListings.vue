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
    </div>

    <div id = "container3">
        <h1>listings</h1>
    </div>
</div>
   
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc } from "firebase/firestore";
    import { getAuth, signOut } from "firebase/auth";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();

    let user = await getDoc(doc(db, "Profiles", "uniqueUserID")) // replace with unique user id
    let userData = user.data()
    
    export default {
        name: "PersonalProfileListings",
        data() {
            return {
                value: 4,
                location: userData.Meet_Up,
                name: ""
            }
        },
        mounted() {
            this.name = auth.currentUser.displayName
        },
        methods: {
            signout() {
                signOut(auth).then(() => {
                    alert('Successfully signed out!')
                    this.$router.push('/')
                }).catch((error) => {
                    alert(error.message)
                })
            }
        }, 

        computed: {
            getName() {
                return userData.Name
            }, 

            getLocation() {
                return userData.Meet_Up
            }

        }
        
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
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 1.6em;
    color: rgb(117, 113, 113);
    border-bottom: 2px solid rgb(160, 154, 154);
 }

 #reviewsbutton {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 1.8em;
    color: rgb(8, 8, 8);
 }


 #reviewsbutton:hover {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 1.6em;
    color: rgb(117, 113, 113);
    border-bottom: 2px solid rgb(160, 154, 154);
 }

hr {
    height: 1px;
    width: 100%;
    background-color: black;
}

</style>
