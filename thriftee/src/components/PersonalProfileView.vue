<template>

<div id = "container">
    <div id = "profiledetails">
        <img src="default.png" alt="Profile Photo">
        <div id = "contentofprofile">
            <h1 id = "profilename"> John Doe </h1>
            <input data-role="rating"><!-- star ratings placeholder -->
            <h2 id = "meetuplocation"> Meet up location: </h2>
        </div>
        
        <div id = "buttonsofprofile">
            <div>
            <router-link to="/editprofile"
                custom
                v-slot="{ navigate }" >
                <button @click="navigate" role="link" id = "editbutton" type="button" >Edit Profile</button> 
            </router-link>  
            </div>
            <div><button id = "signoutbutton" type="button" >Sign Out </button> </div>
        </div>
    </div>
    
    <div id="linebreak">
        <hr>
    </div>

<div id = "container2">
    <h1>LISTINGS placeholder </h1>
</div>
</div>


   
</template>

<script>
    
</script>


<style scoped>
#profiledetails {
    margin-top: 5vh;
    display: flex;
    background-color: rgb(246, 241, 241);
    height: 30vh;
    border-radius: 25px;
    border: 2px solid rgb(155, 150, 150);
    
}

#linebreak{
    margin-top: 5vh;
}

hr {
    height: 1px;
    width: 30vw;
    background-color: black;
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
  border: 1px solid black;
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
  background-color: 359138; /* Green */
  color: white;
  border: 1px solid #a660cb; /* Green */
}

#signoutbutton {
  background-color: #9c9ca8; /* Green */
  border: 2px solid #9c9ca8; /* Green */
  border-radius: 5px;
  border: 1px solid black;
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
  border: 1px solid #3c08b4; /* Green */
}

img {
    width: 240px;
    height: auto;
    margin-left: 2vw;
}

</style>