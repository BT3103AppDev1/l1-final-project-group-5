<template>
    <div id = "container">
        
       
        <div id = "containerleft">
        <div id = "back">
            <button id = "backbutton" type="button" >←</button> 
        </div>

           <div id="top">
                <h4><em>Bottom</em></h4> 
            </div>
            <h1> Levi's Jeans</h1>
            <h3><em>${{price}}</em></h3>
            <p> Category: Bottoms</p>
            <p> Colour: Blue</p>
            <p> Condition: Like new</p>
            <p> Size: M</p>
            <p> Description: Lightly worn, bought around 3 months ago</p>

            <div id = "buttonsupdate">
                
                <button @click="goToTelegram" id = "chatbutton" type="button"> Chat</button> 
                <button id = "makeofferbutton" type="button">Make Offer</button> 
            </div>
        </div>

        <div id = "containerright">
         <img src="listingdefault.jpeg" alt="listing picture">
     </div>
    </div>
  
</template>
 
<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, getDoc } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();


    export default {
        name: "CustomersListingTemplate",
        data() {
            return {
                value: 4,
                location: "",
                name: "",
                uid: "",
                price: 30.00, 
                telegram: "https://t.me/",
            }
        },
        
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.name = user.displayName;
                this.uid = user.uid;
            })
            
            // this.getTelegram()
        },
        
        methods: {
            async goToTelegram() {
                let userProfile = await getDoc(doc(db, "Profiles", auth.currentUser.uid)) // shld get telegram from unique listing
                let userProfileData = userProfile.data();
                this.telegram = this.telegram + userProfileData.Telegram;
                window.open(this.telegram, '_blank')
            }
        }
    }

        

</script>
 
 
<style scoped>

#backbutton {
    background: transparent;
    border: none;
    font-size: 1.9em;
    font-weight: bolder;
    color: black;
}


#backbutton:hover {
    background: transparent;
    border: none;
    font-size: 1.9em;
    color: grey;
    border-bottom: 0.8px solid #252323;
}

#container{
    display:flex;
    justify-content: center;
    text-align: left;
    line-height: 3vh;
    width: 100vw;
}

#containerleft {
    margin-top: 5vh;
    flex: 0.4;
}

#containerright {
    margin-top: 9vh;
    flex: 0.3;
}

#containerleft p{
    font-weight: normal;
    font-size: 0.95em;
}

#top {
    margin-bottom: 8vh;
    color:rgb(151, 154, 154);
}

#buttonsupdate {
    margin-top: 5vh;
}

#chatbutton {
    background-color: #2ccbe7; 
    border: 2px solid #2ccbe7; 
    border-radius: 5px;
    color: white;
    padding: 10px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-style: italic;
    transition-duration: 0.2s;
}

#chatbutton:hover {
    background-color: #41b0c4; 
    color: rgb(21, 20, 20);
    border: 2px solid #41b0c4; 
}

#makeofferbutton {
    background-color: #b74232; 
    border: 2px solid #b74232; 
    border-radius: 5px;
    color: rgb(249, 249, 249);
    padding: 10px 32px;
    margin-left: 35px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-style: italic;
    transition-duration: 0.2s;
}

#makeofferbutton:hover {
    background-color: #8a2e22; 
    color: rgb(8, 7, 7);
    border: 2px solid #8a2e22; 
}

img {
    width: 70%;
    height: auto;
}


</style>