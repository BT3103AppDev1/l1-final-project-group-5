<template>

    <div id = "container">
        <div id = "profiledetails">
        <img id = "profilephoto" src="default.png" alt="Profile Photo">
        <div id = "contentofprofile">
            <h1 id = "profilename"> {{ getName }} </h1>
                
                <div class="rate">
                    <p class="mt-2">Rating: {{ value }}/5</p>
                </div>
            
                <div class="Location">
                    <p class="mt-3">Meet up Location: {{ location }}</p>
                </div>
        </div>
            
        </div>
        
        <div id="linebreak">
            <hr>
        </div>
    
    <div id = "container2">
        <h1>Reviews placeholder </h1>
  
    </div>
    </div>
    
</template>
    
<script>
import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc } from "firebase/firestore";
    const db = getFirestore(firebaseApp);
    
    let user = await getDoc(doc(db, "Profiles", "uniqueUserID")) // replace with unique user id
    let userData = user.data()
  export default {
    data() {
      return {
        value: 4,
        location: userData.Meet_Up,
        name:userData.Name
      }
    },
    methods: {
            
        }, 

    computed: {
        getName() {
            return userData.Name
        }, 

        getLocation() {
            return userData.Meet_Up
        }

    }
}
</script>

    
<style scoped>
    .mt-2{
        font-size: x-large;
    }
    .mt-3{
        font-size: x-large;
    }

    #profiledetails {
        margin-top: 5vh;
        display: flex;
        background-color: rgb(246, 241, 241);
        height: 30vh;
        border-radius: 25px;
        border: 2px solid rgb(155, 150, 150);
        
    }
    
    hr {
        height: 1px;
        width: 30vw;
        background-color: black;
    }
    
    #contentofprofile {
    margin-left: 5vw;
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


img {
    width: auto;
    height: auto;
    margin-left: 2vw;
}
    
</style>