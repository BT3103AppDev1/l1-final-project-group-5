<template>
    <div id = "profilecreate">
   <div id = "profileheader">
    <h1> Create Profile</h1>
   </div>
   <div id ="container">
    <div id = "leftcontainer">
       <div id = "profilephotoset">
        <img src="default.png" alt="Profile Photo">
        <div id = "buttonsupdate">
            <input type="file" id="uploadbutton" hidden/>
            <label for="uploadbutton">Upload</label>
            <button id = "deletebutton" type="button" >Delete </button> 
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
            <button id = "cancelbutton" type="button" v-on:click="savetofs" >Cancel</button> 
            <button id = "savebutton" type="button" v-on:click="savetofs" >Save</button> 
          </div>
          </div>
       </form>
    </div>
</div>
</div>
   
</template>

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
  border-radius: 4px;
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

<script>
    export default {
        name: "PersonalSettings"
    }
</script>
