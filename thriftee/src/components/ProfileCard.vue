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
    import { doc, getDoc } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    // let user = await getDoc(doc(db, "Profiles", "uniqueUserID")) // replace with unique user id
    // let userData = user.data()
    
    export default {
        name: "ProfileCard",
        data() {
            return {
                value: 4,
                location: "",
                name: "",
                uid: ""
            }
        },
        // created() {
        //     onAuthStateChanged(auth, (user) => {
        //         this.name = user.displayName;
        //         this.uid = user.uid;
        //     })
        // },
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.name = user.displayName;
                this.uid = user.uid;
            })
            this.getMeetUp()
            this.getName()
        },
        methods: {
            async getMeetUp() {
                let userProfile = await getDoc(doc(db, "Profiles", auth.currentUser.uid))
                let userProfileData = userProfile.data();
                this.location = userProfileData.Meet_Up;
            },

            async getName() {
                let userProfile = await getDoc(doc(db, "Profiles", auth.currentUser.uid))
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

        // computed: {
        //     getName() {
        //         return userData.Name
        //     }, 

        //     getLocation() {
        //         return userData.Meet_Up
        //     }

        // }
        
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
  background-color: #d8c6df; /* Green */
  border: 2px solid #d8c6df; /* Green */
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

</style>