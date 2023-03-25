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

        <form id="myform" @submit.prevent="login"> 

          <div class = "formli">

          <label for="email">Email </label>
          <input type = "email" id = "email" v-model="email" placeholder = "johndoe@gmail.com" required> <br><br>

          <label for="password">Password</label>
          <input type = "password" id = "password" v-model="password" placeholder = "Enter Password" required> <br><br>

          
          <div id = "buttonsupdate">
            <button id = "loginbutton" type="submit">Login</button> 
          </div>
          </div>
       </form><br>
       <div id = "gotosignup">
            <span style="color: grey"> Don't have an account yet?</span> <br>
            <button id = "signupbutton" type="button" v-on:click="goToSignUp">Sign Up</button> 
        </div>
    </div>
   </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name:"LogIn",

    data() {
        return {
            email: "",
            password: ""
        }
    },

    methods: {
        login() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                    alert('Successfully logged in');
                    this.$router.push({name: 'Home'});
                })
                .catch(error => {
                    alert(error.message);
                });
        },

        goToSignUp() {
            this.$router.push({name: 'SignUpDisplay'})
        }

    }
}   
</script>


<style scoped>
#signupbutton {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 0.99em;
    color: grey;
}

#signupbutton:hover {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 0.99em;
    color: black;
    border-bottom: 1px solid #252323;
}

#gotosignup {
    display: flex;
}

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
    margin-top: 13vh;
    /* margin-right: 15vw; */
    flex: 0.6;
   
}

#rightcontainer{
    margin-top: 10vh;
    flex: 0.3;
}

img {
    width: 70%;
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

input:focus {
    color: rgb(9, 8, 8);
    outline: 3px rgba(43, 41, 41, 0.933);  
}

</style>