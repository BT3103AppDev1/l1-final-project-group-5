<template>
   <div id = "container"> 
    <div id = "leftcontainer">
        <img src="loginpicture.jpeg" alt="login picture">
    </div>

    <div id = "rightcontainer">
        
        <div id = "contentofwords">
            <div id="backnav">
                <button id="back" class="previous round" @click="goToLogIn">&#8249;</button>
            </div>
            <h1> Reset Password </h1> 
        </div>

        <form id="myform" @submit.prevent="resetPassword"> 

          <div class = "formli">

          <label for="email">Email </label>
          <input type = "email" id = "email" v-model="email" placeholder = "johndoe@gmail.com" required> <br><br>

          <div id = "buttonsupdate">
            <button id = "forgetpwbutton" type="submit">Send Password Reset Link</button> 
          </div>
          </div>
       </form><br>
    </div>
   </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";

export default {
    name:"ForgetPassword",

    data() {
        return {
            email: "",
        }
    },

    methods: {
        resetPassword() {
            const auth = getAuth();
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    alert('Check your email for the reset link');
                    this.$router.push({name: 'LogInDisplay'});
                })
                .catch(error => {
                    alert(error.message);
                });
        },

        goToLogIn() {
            this.$router.push({name: 'LogInDisplay'});
        }
    }
}   
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
    margin-bottom: 10vh;
    display: flex;
    align-items: center;
}

#leftcontainer{
    margin-top: 13vh;
    /* margin-right: 15vw; */
    flex: 0.6;
   
}

#rightcontainer{
    margin-top: 20vh;
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

#forgetpwbutton {
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

#forgetpwbutton:hover {
  background-color: #14a88d; /* Green */
  color: white;
  border: 2px solid #14a88d; /* Green */
}

input:focus {
    color: rgb(9, 8, 8);
    outline: 3px rgba(43, 41, 41, 0.933);  
}

#back {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  margin-right: 2vh;
  border: none;
}

#back:hover {
  background-color: #ddd;
  color: black;
}

.previous {
  background-color: #f1f1f1;
  color: black;
}

.round {
  border-radius: 50%;
}

</style>