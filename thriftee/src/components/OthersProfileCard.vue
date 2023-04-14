<template>
    <div id = "profiledetails">
        <img id = "profilephoto" :src="this.image_URL" alt="Profile Photo">
        <div id = "contentofprofile">
            <h1 id = "profilename"> {{ name }} </h1>
                
                <div class="rate">
                    <p class="mt-2"><b>RATING: </b> </p>
                    <div v-if="havevalue" id ="overallstartext">
                        <p id="valueofstar"> {{ value }} </p>
                        <p id ="startext"> ★</p>
                    </div>
                    <p v-else id="emptystarvaluestar"><em>{{ value }}</em></p>
                </div>
                <div class="Location">
                    <p class="mt-3" style = "margin-bottom: 5vh;"><b>LOCATION: </b>  {{ location }}</p>
                </div>
            
        </div>
        
        
        <button v-if="havevalue" @click="goToTelegram" id = "chatbutton2" type="button"> Message</button> 
        <button v-else @click="goToTelegram" id = "chatbutton" type="button"> Message</button> 
    </div>
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import {query,collection,where,getDocs, doc, getDoc } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
    import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

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
                value: 0,
                location: "",
                name: "",
                uid: "",
                seller_uid: this.sellerUID,
                havevalue: false,
                telegram: "https://t.me/",
                image_URL:""
            }
        },
        
        mounted() {
            this.getProfileDetails()
            this.getRating()
            this.getImage()
           
        },
        methods: {
            async getImage(){
                let userProfile = await getDoc(doc(db, "Profiles", this.sellerUID))
                let userProfileData = userProfile.data();
                if(userProfileData.Image_URL == null){
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
            async getProfileDetails() {
                const docRef = doc(db, "Profiles", this.seller_uid)
                const docSnap = await getDoc(docRef)
                const dataSnap = docSnap.data()
                this.location = dataSnap.Meet_Up
                this.name = dataSnap.Name
                this.telegram_handle = dataSnap.Telegram

            },

            async goToTelegram() {
                let userProfile = await getDoc(doc(db, "Profiles", this.seller_uid)) // shld get telegram from unique listing
                let userProfileData = userProfile.data();
                this.telegram = this.telegram + userProfileData.Telegram;
                window.open(this.telegram, '_blank')
            },

            goBack() {
                window.history.back()
            },
            async getRating() {
                let count = 0;
                const firstQuery = query(collection(db, "Reviews"), where("RevieweeID", "==", this.seller_uid))
               
                const querySnapshot = await getDocs(firstQuery);
                if(querySnapshot.empty){
                    this.havevalue = false
                    this.value = "No Reviews Yet"
                } else{
                    querySnapshot.forEach((doc) => {
                        this.havevalue = true
                        let review = doc.data()
                        this.value += parseFloat(review.Rating)
                        count++
                    })
                    this.value = Math.round(this.value/count * 10) / 10 +" / 5";
                }
            },
        }, 
        
    }

</script>

<style scoped>
#profiledetails {
    margin-top: 5vh;
    display: flex;
    background-color: rgb(246, 241, 241);
    height: 35vh;
    border-radius: 25px;
    border: 1px solid rgb(195, 187, 187);
    font-size: 1.4em;
    font-family: 'Montserrat', sans-serif;

}

#profiledetails h1{
    font-size: 1.8em;
    /* font-weight: bold; */
}

#contentofprofile {
    margin-left: 5vw;
    font-weight: 540;
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

.rate {
    display: flex;
}

#emptystarvaluestar {
    margin-left: 0.5vw;
    color: grey;
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


#space{
    margin-bottom: 3vh;
}

#chatbutton {
    background-color: #ffffffe0; 
    border: 0.5px solid #c0bdbd; 
    border-radius: 5px;
    color: rgb(13, 10, 10);
    padding: 10px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 0.8em;
    font-style: italic;
    transition-duration: 0.2s;
    height: 6.5vh;
    margin-top: 15.5vh;
    margin-left: 3vw;
    margin-right: 4vw;
    font-weight: 550;
    
}

#chatbutton:hover {
    color: #cdc9c9e0; 
    background-color: white;
}

#chatbutton2 {
    background-color: #ffffffe0; 
    border: 0.5px solid #c0bdbd; 
    border-radius: 5px;
    color: rgb(13, 10, 10);
    padding: 10px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 0.8em;
    font-style: italic;
    transition-duration: 0.2s;
    height: 6.5vh;
    margin-top: 16vh;
    margin-left: 6vw;
    margin-right: 4vw;
    font-weight: 550;
    
}

#chatbutton2:hover {
    color: #cdc9c9e0; 
    background-color: white;
}
</style>