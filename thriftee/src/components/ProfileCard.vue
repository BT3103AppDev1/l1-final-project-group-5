<template>
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
        
        <div id = "buttonsofprofile">
            <div>
            <router-link to="/editprofile"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "editbutton" type="button" >Edit Profile</button> 
            </router-link>  
            </div>
            <div><button id = "signoutbutton" type="button" @click="signout">Sign Out </button> </div>
        </div>
    </div>
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    export default {
        name: "ProfileCard",
        data() {
            return {
                value: 0,
                location: "",
                name: "",
                uid: ""
            }
        },
        
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.name = user.displayName;
                this.uid = user.uid;
                this.getMeetUp()
                this.getName()
                this.getRating()
            })
           
        },
        methods: {
            async getMeetUp() {
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                this.location = userProfileData.Meet_Up;
            },
            async getRating() {
                let user = auth.currentUser;
                let userID = user.uid;
                let count =0;
                const firstQuery = query(collection(db, "Reviews"), where("SellerID", "==", userID))
                const secondQuery = query(collection(db, "Reviews"), where("BuyerID", "==", userID))
                const querySnapshot = await getDocs(firstQuery);
                
                querySnapshot.forEach((doc) => {
                    let review = doc.data()
                    this.value += review.Rating
                    count++
                })
                const querySnapshot2 = await getDocs(secondQuery);
                querySnapshot2.forEach((doc) => {
                    let review = doc.data()
                    this.value += review.Rating
                    count++
                })
                this.value = this.value/5
            },

            async getName() {
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                this.name = userProfileData.Name;
            },

            signout() {
                signOut(auth).then(() => {
                    alert('Successfully signed out!')
                    this.$router.push('/')
                }).catch((error) => {
                    alert(error.message)
                })
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
  background-color: #ccccdb; /* Green */
  border-radius: 5px;
  border: 0.5px solid #ccccdb; 
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.75em;
  transition-duration: 0.2s;
  margin-top: 10vh;
  

}

#editbutton:hover {
  /* background-color: 359138; Green */
  color: white;
  /* border: 0.5px solid #5a525d; Green */
}

#signoutbutton {
  background-color: #b7b7c3; /* Green */
  border: 1px solid #b7b7c3; /* Green */
  border-radius: 5px;
 
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.75em;
  transition-duration: 0.2s;
  
}

#signoutbutton:hover {
 
  color: white;
 
}

img {
    width: auto;
    height: auto;
    margin-left: 2vw;
    border: 50%;
}

</style>