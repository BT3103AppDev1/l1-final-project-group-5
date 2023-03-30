<template>
  <div id = "profilecreate">
 <div id = "profileheader">
  <h2> Edit Profile</h2>
 </div>
 <div id ="container">
  <div id = "leftcontainer">
     <div id = "profilephotoset">
      <img id = "profilephoto" src="default.png" alt="Profile Photo">
      <div id = "buttonsupdate">
          <label for="uploadbutton">Upload</label>
          <input type="file" id="uploadbutton" v-on:change="displayProfileImage" hidden/>
          <button id = "deletebutton" type="button" v-on:click="deleteProfileImage">Delete </button> 
      </div>
      </div>
  </div>

  <div id = "rightcontainer">
    <form id="myform">

        <div class = "formli">

        <label for="name">Name </label>
        <input type = "text" id = "name" required = "" placeholder = "John Doe" v-model="name"> <br><br>

        <label for="meetup">Meet Up Area</label>
        <input type = "text" id = "meetup" required = "" placeholder = "Clementi" v-model="meetup"> <br><br>

        <label for="qrcode">PayLah! / PayNow QR Code</label>
        <input type = "file" id = "qrcode" accept="image/png, image/jpeg"> <br><br>

        <div id = "buttonsupdate">
          
            <router-link to="/profilelistings"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "cancelbutton" type="button"> <em>Cancel</em></button> 
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
  import firebaseApp from '../firebase.js';
  import { getFirestore } from "firebase/firestore";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged,updateProfile } from 'firebase/auth';

  const db = getFirestore(firebaseApp);
  const auth = getAuth();

  export default {
      name: "PersonalSettings",
      data() {
        return {
          name: "",
          meetup: "",
          uid: "",
          curruser: ""
        }
      },
      mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.name = user.displayName;
                this.uid = user.uid;
                this.curruser = user;
                this.getMeetUp();
            }
        })
       
      },
      methods: {
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
            alert("No profile image found ", error)
            document.getElementById("profilephoto").src="default.png"
          }
        }, 

        async saveProfile() {
          let qrcode = document.getElementById("qrcode").value
          let image = document.getElementById("uploadbutton").value
          try {
            const docRef = await setDoc(doc(db, "Profiles", this.uid), { // need to change to unique userID
              Name: this.name,
              Meet_Up: this.meetup,
              QRCode: qrcode, 
              Profile_Image: image
            })
            updateProfile(this.curruser, {
              displayName: this.name
            })
            alert("Profile saved!")
            this.$router.push({name: "ProfileListings"})
          } catch(error) {
            alert("Error saving profile: ", error)
            console.log(error)
          }
        }, 
        async getMeetUp() {
                let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                let userProfileData = userProfile.data();
                
                this.meetup = userProfileData.Meet_Up;
        },
        deleteProfileImage() {
            if (document.getElementById("uploadbutton").value == "") {
                alert("Upload Image!")
            } else {
                document.getElementById("uploadbutton").value = ""
                document.getElementById("profilephoto").src = "default.png"
                alert("Profile Image Successfully Deleted")
            }
        }
      }
  }
  
</script>


<style scoped>
#profileheader h2 {
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
  color: rgb(134, 130, 130);
  font-size: 2.8vw;
  
}
#container{
  display: flex;
  width: 100vw;
}
label[for="uploadbutton"] {
  background-color: #60cbb8; /* Green */
border: 2px solid #60cbb8; /* Green */
border-radius: 25px;
color: rgb(0, 0, 0);
padding: 10px 32px;
margin-left: 4vw;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
transition-duration: 0.4s;
}
label[for="uploadbutton"]:hover {
background-color: 359138; /* Green */
color: white;
border: 2px solid #60cbb8; /* Green */
}
input::file-selector-button {
  font-weight: bold;
  color: black;
  background-color: rgb(203, 236, 234); /* Green */
  padding: 0.5em;
  border: 1.5px solid #1c0808; /* Green */
  border-radius: 5px;
  margin-right: 1vw;
  margin-left: 30%;
  margin-bottom: 1vh;
}
input::file-selector-button:hover {
  color: white;
  background-color: black; /* Green */
}
#leftcontainer{
  width: 50%;
}
#rightcontainer{
margin-top: 8vh;
  width: 40%;
}
#deletebutton {
background-color: #ed4141; /* Green */
border: 2px solid #ed4141; /* Green */
border-radius: 25px;
color: rgb(0, 0, 0);
padding: 10px 32px;
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
border: 2px solid #ed4141; /* Green */
}
#savebutton {
background-color: #60cbb8; /* Green */
border: 2px solid #60cbb8; /* Green */
border-radius: 25px;
color: rgb(0, 0, 0);
padding: 10px 32px;
margin-left: 35px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
transition-duration: 0.4s;
}
#savebutton:hover {
background-color: 359138; /* Green */
color: white;
border: 2px solid #60cbb8; /* Green */
}
#cancelbutton {
background-color: white; 
border: 2px solid #c64f31; /* Green */
border-radius: 25px;
color: black;
padding: 10px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
transition-duration: 0.4s;
}
#cancelbutton:hover {
background-color: #c64f31; /* Green */
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
  /* box-shadow: 3px 3px purple; */
  border-radius: 5px;
}
.save {
  text-align: center;
}
img {
  width: 450px;
  height: auto;
  border: 50%;
}
</style>