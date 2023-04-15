<template>
    <div id = "container"> 
        <div id = "leftcontainer">
            <img src="signup.jpeg" alt="signup picture">
        </div>

        <div id = "rightcontainer">
            <div id = "contentofwords">
                <h1> Create Account </h1> 
            </div>

            <form id="myform" @submit.prevent="register">

                <div class = "formli">

                    <input type = "text" id = "fullname" v-model="name" placeholder = "Full Name" required> <br><br>
                    
                    <input type = "email" id = "email" v-model="email" placeholder = "Email Address" required> <br><br>

                    <input type = "password" id = "password" v-model="password" required = "" autocomplete="password" placeholder = "Password"> <br><br>

                    <div id = "buttonsupdate">
                        <button id = "createaccountbutton" type="submit">Create Account</button> 
                    </div>
                </div>
            </form>
        
            <div id = "gotologin">
                <span style="color: grey"> Already have an account?</span> <br>
                <button id = "loginbutton" type="button" v-on:click="goToLogIn">Log in</button> 
            </div>
        </div>
    </div>
</template>
 
<script>
    import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, onAuthStateChanged} from "firebase/auth";

    export default {
        name:"SignUp",

        data() {
            return {
                email: "",
                password: "",
                name: ""
            }
        },
        methods: {
            register() {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user
                        updateProfile(user, {
                            displayName: this.name
                        })
                        alert('Successfully registered!')
                        this.$router.push({name: 'EditProfile'})
                    })
                    .catch(error => {
                        alert(error.message);
                    })
            },
            // code below works for email verification but commented out as accounts created beforehead cannot log in as they nvr verify account
            // register() {
            //     const auth = getAuth();
            //     createUserWithEmailAndPassword(auth, this.email, this.password)
            //         .then((userCredential) => {
            //             const user = userCredential.user
            //             updateProfile(user, {
            //                 displayName: this.name
            //             })  
            //             sendEmailVerification(user).then(() => {
            //                 alert("Successfully registered! Please check your email and verify your account.")
            //             })
            //             this.$router.push({name: 'LogInDisplay'})
            //         }).catch(error => {
            //             alert(error.message);
            //         })
            // },

            goToLogIn() {
                this.$router.push({name: 'LogInDisplay'})
            }
        },
    
    }
</script>
 
 
<style scoped>

#loginbutton {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 0.90em;
    color: grey;
}


#loginbutton:hover {
    background: transparent;
    border: none;
    margin-left: 0.3vw;
    font-size: 0.99em;
    color: black;
    border-bottom: 1px solid #252323;
}

input:focus {
       color: black;
       outline: none;
       border-bottom: 1.5px solid rgb(108, 105, 105);
    }


#gotologin {
    display: flex;
}

#myform {
    margin-top: 5vh;
    margin-bottom: 5vh;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#container {
    display:flex;
    width: 100vw;
}

#contentofwords h1{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    line-height: 25px;
}

#leftcontainer{
    margin-top: 5vh;
    /* margin-right: 15vw; */
    flex: 0.55;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

#rightcontainer{
    margin-top: 10vh;
    flex: 0.3;
}

img {
    width: 55%;
    height: auto;
}

.formli{
    display: inline-block;
    text-align: center;
    width: 100%;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
box-sizing: border-box;
height: 40px;
background: transparent;
border: none;
border-bottom: 1px solid #a49e9e;
text-align: left;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

::placeholder {
font-size: 17px;
color: rgb(170, 164, 164);
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#createaccountbutton {
background-color: #BDC6D7; /* Green */
border: 2px solid #BDC6D7; /* Green */
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

#createaccountbutton:hover {
background-color: #9b9999; /* Green */
color: white;
border: 2px solid #9b9999; /* Green */
}

#container {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

</style>