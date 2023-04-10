<template>
     <div id = "back">
            <button id = "backbutton" type="button" @click="goBack">←</button> 
    </div>
    <div id = "profiledetails">
        <img id = "profilephoto" src="default.png" alt="Profile Photo">
        <div id = "contentofprofile">
            <h1 id = "profilename"> {{ name }} </h1>
                
                <div class="rate">
                    <p class="mt-2">Rating: {{ value }}/5</p>
                </div>
            
                <div class="Location">
                    <p class="mt-3">Meet up Location: {{ location }}</p>
                </div>
        </div>
        
        
    </div>
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    export default {
        name: "OthersProfileCard",
        props: {
            sellerUID: {
                type: String,
                default: ""
            }
        
        },
        data() {
            return {
                value: 4,
                location: "",
                name: "",
                uid: "",
                seller_uid: this.sellerUID,
            }
        },
        
        mounted() {
            this.getProfileDetails()
           
        },
        methods: {
            async getProfileDetails() {
                const docRef = doc(db, "Profiles", this.seller_uid)
                const docSnap = await getDoc(docRef)
                const dataSnap = docSnap.data()
                this.location = dataSnap.Meet_Up
                this.name = dataSnap.Name

            },
            goBack() {
                window.history.back()
            }
        }, 
        
    }

</script>

<style scoped>
#profiledetails {
    margin-top: 5vh;
    display: flex;
    background-color: rgb(246, 241, 241);
    height: 30vh;
    border-radius: 25px;
    border: 1px solid rgb(195, 187, 187);
    font-size: 1.4em;
}

#profiledetails h1{
    font-size: 1.8em;
    /* font-weight: bold; */
}

#contentofprofile {
    margin-left: 5vw;
}

#buttonsofprofile {
    display:block;
    margin-left: 3vw;
    margin-right: 3vw;
}

button{
  margin-bottom:2vh;
  display:block;
}

#editbutton {
  background-color: #c6d7df; /* Green */
  border-radius: 5px;
  border: 0.5px solid black;
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.2s;
  margin-top: 10vh;
}

#editbutton:hover {
  /* background-color: 359138; Green */
  color: white;
  border: 0.5px solid #5a525d; /* Green */
}

#signoutbutton {
  background-color: #9c9ca8; /* Green */
  border: 2px solid #9c9ca8; /* Green */
  border-radius: 5px;
  border: 0.5px solid black;
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.2s;
}

#signoutbutton:hover {
  background-color: 359138; /* Green */
  color: white;
  border: 0.5px solid #434246; /* Green */
}

img {
    width: auto;
    height: auto;
    margin-left: 2vw;
    border: 50%;
}

#backbutton {
    font-size: 2em;
    border: none;
    background-color: transparent;
}

#backbutton:hover {
    font-size: 1.5em;
    border: none;
    background-color: transparent;
    color: grey;
    border-bottom: 1px solid grey;
}

</style>