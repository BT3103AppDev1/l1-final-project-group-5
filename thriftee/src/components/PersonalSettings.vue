<template>
    <div id = "profilecreate">
   <div id = "profileheader">
    <h1> Create Profile</h1>
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
          <input type = "text" id = "name" required = "" placeholder = "John Doe"> <br><br>

          <label for="meetup">Meet Up Area</label>
          <input type = "text" id = "meetup" required = "" placeholder = "Clementi"> <br><br>

          <label for="qrcode">PayLah! / PayNow QR Code</label>
          <input type = "file" id = "qrcode" accept="image/png, image/jpeg" > <br><br>

          <div id = "buttonsupdate">
            <button id = "cancelbutton" type="button">Cancel</button> 
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
    import { doc, setDoc, updateDoc } from "firebase/firestore";
    const db = getFirestore(firebaseApp);
    
    export default {

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
              alert("profile image displayed")
            } catch(error) {
              alert("No profile image found ", error)
              document.getElementById("profilephoto").src="default.png"
            }
          }, 

          async saveProfile() {
            let name = document.getElementById("name").value 
            let meetUp = document.getElementById("meetup").value
            let qrcode = document.getElementById("qrcode").value
            let image = document.getElementById("uploadbutton").value

            try {
              const docRef = await setDoc(doc(db, "Profiles", "uniqueUserID"), { // need to change to unique userID
                Name: name,
                Meet_Up: meetUp,
                QRCode: qrcode, 
                Profile_Image: image
              })
              alert("Profile saved!")
            } catch(error) {
              alert("Error saving profile: ", error)
            }
          }, 

          async deleteProfileImage() {
            try {
              const docRef = await updateDoc(doc(db, "Profiles", "uniqueUserID"), { // need to change to unique userID
                Profile_Image: "default.png"
              })
              document.getElementById("uploadbutton").value = ""
              document.getElementById("profilephoto").src = "default.png"
              alert("Profile Image Successfully Deleted")
            } catch (error) {
              alert("Error deleting profile image: ", error)
            }
          }

        }
    }
    
</script>


<style scoped>
#profileheader h1 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(80, 68, 68);
    font-size: 3.5vw;
    font-weight:bold;
}
#container{
    display: flex;
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
    margin-top: 5vh;
    margin-right: 13vw;
}

#rightcontainer{
    margin-top: 10vh;
    
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
}

</style>