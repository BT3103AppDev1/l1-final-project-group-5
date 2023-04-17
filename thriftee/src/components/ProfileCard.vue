<template>
    <div id = "profiledetails">
        <img id = "profilephoto" :src="this.image_URL" alt="">
        <div id = "contentofprofile">
            <h1 id = "profilename"> {{ name }} </h1>
                
            <div id ="overallhere">
                <div class="rate">
                    <p class="mt-2"><b>RATING:</b> </p>
                    <div v-if="havevalue" id ="overallstartext">
                        <p id="valueofstar"> {{ value }} / 5</p>
                        <p id ="startext"> ★</p>
                    </div>
                    
                    <p v-else id="emptystarvaluestar"><em>No Reviews Yet</em></p>
                </div>
            
                <div class="Location">
                    <p class="mt-3"><b>LOCATION:</b> {{ location }}</p>
                </div>
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
    import { doc, getDoc, query, collection, where, getDocs, onSnapshot } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
    import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    export default {
        name: "ProfileCard",
        data() {
            return {
                value: 0,
                location: "",
                name: "",
                uid: "",
                havevalue: false,
                image_URL: ""
            }
        },
        // When mounting, get user Meetup location, name, average review rating, and profile image url.
        mounted() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.name = user.displayName;
                    this.uid = user.uid;
                }
                this.getMeetUp()
                this.getName()
                this.getRating()
                this.getImage()
            })
           
        },
        methods: {
            // Retrieve the user's profile image URL from the Profile database in firestore, which will then be displayed in the profile card
            async getImage(){
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                if(userProfileData.Image_URL == "" || userProfileData.Image_URL == null){
                    const storage = getStorage();
                    getDownloadURL(ref(storage, 'Profiles/default.png'))
                    .then((url) => {
                        this.image_URL = url
                    })
                }
                else {
                    this.image_URL = userProfileData.Image_URL;
                }
            },
             // Retrieve the user's preferred meetup location from the Profile database in firestore
            async getMeetUp() {
                const docRef = doc(db, "Profiles", this.uid)
                onSnapshot(docRef, (doc) => {
                    const dataRef = doc.data()
                    this.location = dataRef.Meet_Up;
                })
            },

            // Retrieve all the user's reviews and ratings from the Review Database in firestore using the user's UID and display the average rating on Profile Card
            async getRating() {
                
                const firstQuery = query(collection(db, "Reviews"), where("RevieweeID", "==", this.uid))        
                onSnapshot(firstQuery, (snap) => {
                    let count = 0;
                    let value_count = 0
                    snap.forEach((doc) => {
                        this.havevalue = true
                        const review = doc.data()
                        value_count += review.Rating
                        count++
                    })
                    this.value = Math.round(value_count/count * 10) / 10;
                    
                })
            },
            // Retrieve the user's name from the Profile database in firestore
            async getName() {
                const docRef = doc(db, "Profiles", this.uid)
                onSnapshot(docRef, (doc) => {
                    const dataRef = doc.data();
                    this.name = dataRef.Name;
                })
            },
            // Allows user to sign out from Thriftee and redirect them to the login page
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
    border: 1px solid rgb(195, 187, 187);
    height: 35vh;
    border-radius: 25px;
    font-size: 1.25em;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  
}


#profiledetails h1{
    font-size: 1.8em;
    /* font-weight: bold; */
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#contentofprofile {
    margin-left: 5vw;
    font-weight: 540;
    margin-top: 1vh;
}


#buttonsofprofile {
    display:block;
    margin-left: 4vw;
   
}

button{
  margin-bottom:2vh;
  display:block;
}

#editbutton {
  background-color: #84848a; /* Green */
  border-radius: 5px;
  border: 0.5px solid #ccccdb; 
  color: rgb(255, 255, 255);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.75em;
  transition-duration: 0.2s;
  margin-top: 80%;
  font-weight: 450;

}

#editbutton:hover {
  /* background-color: 359138; Green */
  color: rgb(172, 166, 166);
  /* border: 0.5px solid #5a525d; Green */
}

#signoutbutton {
 background-color: #868689; /* Green */
  border-radius: 5px;
  border: 0.5px solid #ccccdb; 
  color: rgb(255, 255, 255);
  font-weight: 450;

  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.75em;
  transition-duration: 0.2s;
  
}

#signoutbutton:hover {
 color: rgb(172, 166, 166);
  
 
}

img {
    width: 15.5vw;
    height: 29vh;
    margin-left: 2vw;
    border-radius: 50%;
    object-fit: cover;
    margin:2%;
    border: 1px solid rgb(196, 189, 189);
    margin-left:5%;
}


.rate {
    display: flex;
}

#emptystarvaluestar {
    margin-left: 0.5vw;
    color: grey;
    /* font-weight: 450; */
}

#valueofstar {
    margin-left: 0.5vw;
}

#startext {
  color: orange;
  margin-left: 0.4vw;
}

#overallstartext {
    display: flex;
}

#profilename {
    margin-top: 2vh;
}

#overallhere {
    text-align: left;
}

</style>