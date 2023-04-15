<template>
    <div id = "profiledetails">
        <img id = "profilephoto" :src="this.image_URL" alt="">
        <div id = "contentofprofile">
            <h1 id = "profilename"> {{ name }} </h1>
                
                <div class="rate">
                    <p class="mt-2"><b>RATING:</b> </p>
                    <div v-if="havevalue" id ="overallstartext">
                        <p id="valueofstar"> {{ value }} </p>
                        <p id ="startext"> ★</p>
                    </div>
                    
                    <p v-else id="emptystarvaluestar"><em>{{ value }}</em></p>
                </div>
            
                <div class="Location">
                    <p class="mt-3"><b>LOCATION:</b> {{ location }}</p>
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
        
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.name = user.displayName;
                this.uid = user.uid;
                this.getMeetUp()
                this.getName()
                this.getRating()
                this.getImage()
            })
           
        },
        methods: {
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
            async getMeetUp() {
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                this.location = userProfileData.Meet_Up;
            },
            async getRating() {
                let user = auth.currentUser;
                let userID = user.uid;
                let count = 0;
                const firstQuery = query(collection(db, "Reviews"), where("RevieweeID", "==", userID))
               
                const querySnapshot = await getDocs(firstQuery);
                if(querySnapshot.empty){
                    this.value = "No Reviews Yet"
                    this.havevalue = false
                } else{
                    querySnapshot.forEach((doc) => {
                        this.havevalue = true
                        let review = doc.data()
                        this.value += parseFloat(review.Rating)
                        count++
                    })
                    this.value = Math.round(this.value/count * 10)/10 +" / 5";
                }
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

</style>