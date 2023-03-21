<template>
   <div id = "container"> 
    <div id = "leftcontainer">
        <img src="loginpicture.jpeg" alt="login picture">
    </div>

    <div id = "rightcontainer">
        <div id = "contentofwords">
            <h1> Log In </h1> 
            <span style="color: grey"> Welcome Back.</span> <br>
            <span style="color: grey"> Please Enter Your Details</span>
        </div>

        <form id="myform">

          <div class = "formli">

          <label for="email">Email </label>
          <input type = "text" id = "email" required = "" placeholder = "johndoe@gmail.com"> <br><br>

          <label for="password">Password</label>
          <input type = "password" id = "password" required = "" placeholder = "Enter Password"> <br><br>

          <div id = "buttonsupdate">
            <button id = "loginbutton" type="button" v-on:click="saveProfile">Login</button> 
          </div>
          </div>
       </form>
    </div>
   </div>
</template>

<script>
   
</script>


<style scoped>

#myform {
    margin-top: 5vh;
}

#container {
    display:flex;
    width: 100vw;
}

#contentofwords {
    text-align: left;
    line-height: 25px;
}

#leftcontainer{
    margin-top: 5vh;
    /* margin-right: 15vw; */
    flex: 0.6;
   
}

#rightcontainer{
    margin-top: 5vh;
    flex: 0.3;
}

img {
    width: 65%;
    height: auto;
}

.formli{
    display: inline-block;
    text-align: center;
    width: 100%;
}

form {
    text-align: center;
    align-items: center;
    margin: auto;
}

input, select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  height: 40px;
  border-radius: 10px;
}

::placeholder {
   text-align: center; 
   font-size: 17px;
}

#loginbutton {
  background-color: #60cbb8; /* Green */
  border: 2px solid #60cbb8; /* Green */
  border-radius: 5px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  transition-duration: 0.4s;
  width: 100%;
  
}

#loginbutton:hover {
  background-color: #14a88d; /* Green */
  color: white;
  border: 2px solid #14a88d; /* Green */
}



</style>