<template>
  <div id = "profilecreate">
 <div id = "profileheader">
  <h2> Edit Profile</h2>
 </div>
 <div id ="container">
  <div id = "leftcontainer">
     <div id = "profilephotoset">
      <img id = "profilephoto" :src="this.image_URL" alt="../assets/default.png">
      <div id = "buttonsupdate">
          <label for="uploadbutton">Upload</label>
          <input type="file" id="uploadbutton" accept ="image/*" v-on:change="displayProfileImage" ref = "profiles" hidden/>
          <button id = "deletebutton" type="button" v-on:click="deleteProfileImage">Delete </button> 
      </div>
      </div>
  </div>

  <div id = "rightcontainer">
    <form id="myform">

        <div class = "formli">

        <label for="name">Name </label>
        <input type = "text" id = "name" required = "" placeholder = "John Doe" v-model="name"> <br><br>

        <label for="telegram">Telegram Handle</label>
        <input type = "text" id = "telegram" required = "" placeholder = "johntelegram" v-model="telegram"> <br><br>

        <label for="meetup">Meet Up Area</label>
        <input type = "text" id = "meetup" placeholder = "Clementi" v-model="meetup" required> <br><br>

        <label for="qrcode">PayLah! / PayNow QR Code</label>
        <input type = "file" id = "qrcode" accept="image/png, image/jpeg" v-on:change="updateQR" ref = "qr" > <br><br>

        <div id = "buttonsupdate">
            <router-link to="/profilelistings"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "cancelbutton" type="button"> Cancel</button> 
            </router-link>  
          <button id = "savebutton" type="button" v-on:click="saveProfile">Save</button> 
        </div>
        </div>
     </form>
  </div>
</div>
</div>
 
</template>

<script>
  import firebaseApp , {storage} from '../firebase.js';
  import { getFirestore } from "firebase/firestore";
  import { doc, setDoc, getDoc, addDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged,updateProfile } from 'firebase/auth';
  import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
  
  const db = getFirestore(firebaseApp);
  const auth = getAuth();

  export default {
      name: "PersonalSettings",
      data() {
        return {
          name: "",
          meetup: "",
          uid: "",
          curruser: "",
          telegram: "",
          listingImage:null,
          image_URL: ""
        }
      },
      created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.name = user.displayName;
                this.uid = user.uid;
                this.curruser = user;
                this.getMeetUp();
                this.getTelegram();
                this.displayProfileImage()
                this.getImage();
            }
        })
      },
      methods: {
        // retrieve user's profile image 
        async getImage(){
            let userProfile = await getDoc(doc(db, "Profiles", this.uid))
            let userProfileData = userProfile.data();
            if(userProfileData == null || userProfileData.Image_URL == ""){
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
        // display profile image after uploading 
        async displayProfileImage() {
          var fReader = new FileReader();
          try {
            var image = document.getElementById("uploadbutton");
            fReader.readAsDataURL(image.files[0]);
            fReader.onloadend = function(event) {
              var img = document.getElementById("profilephoto");
              img.src = event.target.result;
            }
            alert("Profile image displayed")
          } catch(error) {
            this.image_URL="../assets/default.png"
          }
        }, 
        // save profile 
        async saveProfile() {
          let userProfile = await getDoc(doc(db, "Profiles", this.uid))
          let userProfileData = userProfile.data();
          let image = document.getElementById("uploadbutton").value
          const docRef = doc(collection(db, "Profiles"));
          console.log()
          console.log()
          let url = ""
          let qrcode =""
          if(userProfileData == null && this.$refs.profiles.files[0] == null){
            const storage = getStorage();
                    getDownloadURL(ref(storage, 'Profiles/default.png'))
                    .then((url) => {
                        url = url
                    })
          } else if(this.$refs.profiles.files[0] == null || this.$refs.profiles.files[0] == "") {
            url = userProfileData.Image_URL
          } else{
            url = await this.uploadToCloud(docRef.id)
          }
          if(userProfileData == null){
            qrcode = ""
          } else if(this.$refs.qr.files[0] == null || this.$refs.qr.files[0] == "") {
            qrcode = userProfileData.QRCode
          } else{
            qrcode = await this.uploadQRToCloud(docRef.id)
          }
          try {
            await setDoc(doc(db, "Profiles", this.uid), { 
                Name: this.name,
                Meet_Up: this.meetup,
                QRCode: qrcode, 
                Profile_Image: image,
                Telegram: this.telegram,
                Image_URL:url
            })
            updateProfile(this.curruser, {
              displayName: this.name
            })

            const queryOfferBuyer = query(collection(db, "Offers"), where("BuyerID", "==", this.uid))
            const queryOfferBuyerSnapshot = await getDocs(queryOfferBuyer)
            queryOfferBuyerSnapshot.forEach((doc) => {
              updateDoc(doc.ref, {
                BuyerName: this.name
              })
            })

            const queryOfferSeller = query(collection(db, "Offers"), where("SellerID", "==", this.uid))
            const queryOfferSellerSnapshot = await getDocs(queryOfferSeller)
            queryOfferSellerSnapshot.forEach((doc) => {
              updateDoc(doc.ref, {
                SellerName: this.name
              })
            })

            const queryReviewee = query(collection(db, "Reviews"), where("RevieweeID", "==", this.uid))
            const queryRevieweeSnapshot = await getDocs(queryReviewee)
            queryRevieweeSnapshot.forEach((doc) => {
              updateDoc(doc.ref, {
                RevieweeName: this.name
              })
            })

            const queryReviewer = query(collection(db, "Reviews"), where("ReviewerID", "==", this.uid))
            const queryReviewerSnapshot = await getDocs(queryReviewer)
            queryReviewerSnapshot.forEach((doc) => {
              updateDoc(doc.ref, {
                ReviewerName: this.name
              })
            })

            alert("Profile saved!")
            this.$router.push({name: "ProfileListings"})

          } catch(error) {
            alert("Error saving profile: ", error)
            console.log(error)
          }
        }, 
        // retrieve user's meet up location
        async getMeetUp() {
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                this.meetup = userProfileData.Meet_Up;
        },
        // retrieve user's telegram handle 
        async getTelegram() {
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                this.telegram = userProfileData.Telegram;
        },
        // delete profile iamge
        async deleteProfileImage() {
          let userProfile = await getDoc(doc(db, "Profiles", this.uid))
          let userProfileData = userProfile.data();
          let image = document.getElementById("uploadbutton").value
          
          await setDoc(doc(db, "Profiles", this.uid), { 
              Name: this.name,
              Meet_Up: this.meetup,
              QRCode: userProfileData.QRCode, 
              Profile_Image: image,
              Telegram: this.telegram,
              Image_URL:""
            })
            alert("Profile Image deleted")
            location.reload();
        },
        uploadToCloud: async function(user_uid) {
            const storageRef = ref(storage, 'Profiles/' + user_uid)
            await uploadBytes(storageRef, this.$refs.profiles.files[0])
            let url = ""
            if(this.$refs.profiles.files[0] == null){
              url = ""
            } else{
              url = await getDownloadURL(storageRef)
            }
            return url
        } ,
        uploadQRToCloud: async function(user_uid) {
            const storageRef = ref(storage, 'QR/' + user_uid)
            await uploadBytes(storageRef, this.$refs.qr.files[0])
            let url = ""
            if(this.$refs.qr.files[0] == null){
              url = ""
            } else{
              url = await getDownloadURL(storageRef)
            }
            return url
        }     
      }
  }
  
</script>


<style scoped>
#profileheader h2 {
  color: rgb(77, 74, 74);
  font-size: 2.8vw;
  margin-top: 3vh;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  
}
#container{
  display: flex;
  width: 100vw;
}
label[for="uploadbutton"] {
  background-color: rgb(248, 248, 248);
  border: 1px solid rgb(148, 149, 144); 
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 9px 28px;
  margin-left: 4vw;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
label[for="uploadbutton"]:hover {
  background-color: 359138; 
  color: white;
 
}
input::file-selector-button {
  font-weight: bold;
  color: black;
  background-color: rgb(203, 236, 234); 
  padding: 0.5em;
  border: 1.5px solid #1c0808; 
  border-radius: 5px;
  margin-right: 1vw;
  margin-left: 30%;
  font-size: 15px;
  margin-bottom: 1vh;
}
input::file-selector-button:hover {
  color: white;
  background-color: black; 
}
#leftcontainer{
  width: 50%;
}
#rightcontainer{
margin-top: 8vh;
  width: 40%;
}
#deletebutton {
  background-color: #be4a4ac3; 
  border: 1px solid #b02c2cbe; 
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 9px 28px;
  margin-left: 3vw;
  margin-right: 4vw;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
#deletebutton:hover {
  color: white;
  
}
#savebutton {
  background-color: #3ddfc1c5; 
  border: 1px solid #5ec3b0;
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 9px 28px;
  margin-left: 35px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
#savebutton:hover {
  background-color: 359138; 
  color: white;
 
}
#cancelbutton {
  background-color: rgb(246, 243, 243); 
  border: 1px solid rgb(175, 166, 166); 
  border-radius: 25px;
  color: black;
  padding: 9px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
#cancelbutton:hover {
  color: white;
}
h2 {
  background-color: rbg(129,184,99);
}
.formli{
  display: inline-block;
  text-align: center;
}
form {
  text-align: center;
  align-items: center;
  margin: auto;
}
input[type=text], select {
width: 100%;
padding: 12px 20px;
margin: 8px 0;
display: block;
border: 1px solid #ccc;
box-sizing: border-box;
height: 40px;
border-radius: 10px;
}
input[type=file], select {
width: 100%;
margin-top: 3vh;

}
::placeholder {
 text-align: center; 
 font-size: 17px;
}
input:hover {
  border-radius: 5px;
}
.save {
  text-align: center;
}
img {
  width: 50%;
  height: auto;
  border: 50%;
  margin-bottom: 2vh;
}

#profilecreate {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

#profilephotoset {
  margin-top: 13vh;
}
</style>