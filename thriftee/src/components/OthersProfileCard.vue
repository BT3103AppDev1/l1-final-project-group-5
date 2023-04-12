<template>
    <div id = "profiledetails">
        <img id = "profilephoto" src="default.png" alt="Profile Photo">
        <div id = "contentofprofile">
            <h1 id = "profilename"> {{ name }} </h1>
                
                <div class="rate">
                    <p class="mt-2">Rating: </p>
                    <div v-if="havevalue" id ="overallstartext">
                        <p id="valueofstar"> {{ value }} </p>
                        <p id ="startext"> ★</p>
                    </div>
                    
                    <p v-else id="emptystarvaluestar">{{ value }}</p>
                </div>
            
                <div class="Location">
                    <p class="mt-3">Meet up Location: {{ location }}</p>
                </div>
        </div>
        
       
    </div>
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import {query,collection,where,getDocs, doc, getDoc } from "firebase/firestore";
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    export default {
        name: "OthersProfileCard",
        props: {
            sellerUID: {
                type: String,
                default: ""
            }
        
        },
        data() {
            return {
                value: 0,
                location: "",
                name: "",
                uid: "",
                seller_uid: this.sellerUID,
            }
        },
        
        mounted() {
            this.getProfileDetails()
            this.getRating()
           
        },
        methods: {
            async getProfileDetails() {
                const docRef = doc(db, "Profiles", this.seller_uid)
                const docSnap = await getDoc(docRef)
                const dataSnap = docSnap.data()
                this.location = dataSnap.Meet_Up
                this.name = dataSnap.Name

            },
            goBack() {
                window.history.back()
            },
            async getRating() {
                let count = 0;
                const firstQuery = query(collection(db, "Reviews"), where("RevieweeID", "==", this.seller_uid))
               
                const querySnapshot = await getDocs(firstQuery);
                if(querySnapshot.empty){
                    this.value = "No Reviews Yet"
                } else{
                    querySnapshot.forEach((doc) => {
                        let review = doc.data()
                        this.value += parseFloat(review.Rating)
                        count++
                    })
                    this.value = Math.round(this.value/count * 10) / 10 +"/5";
                }
            },
        }, 
        
    }

</script>

<style scoped>
#profiledetails {
    margin-top: 5vh;
    display: flex;
    background-color: rgb(246, 241, 241);
    height: 30vh;
    border-radius: 25px;
    border: 1px solid rgb(195, 187, 187);
    font-size: 1.4em;
}

#profiledetails h1{
    font-size: 1.8em;
    /* font-weight: bold; */
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
  background-color: #ccccdb; /* Green */
  border-radius: 5px;
  border: 0.5px solid #ccccdb; 
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.75em;
  transition-duration: 0.2s;
  margin-top: 10vh;
  

}

#editbutton:hover {
  /* background-color: 359138; Green */
  color: white;
  /* border: 0.5px solid #5a525d; Green */
}

#signoutbutton {
  background-color: #b7b7c3; /* Green */
  border: 1px solid #b7b7c3; /* Green */
  border-radius: 5px;
 
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.75em;
  transition-duration: 0.2s;
  
}

#signoutbutton:hover {
 
  color: white;
 
}

img {
    width: auto;
    height: auto;
    margin-left: 2vw;
    border: 50%;
}

.rate {
    display: flex;
}

#emptystarvaluestar {
    margin-left: 0.5vw;
    color: grey;
}

#valueofstar {
    margin-left: 0.5vw;
}

#startext {
  color: orange;
  margin-left: 0.4vw;
}

#overallstartext {
    display: flex;
}
</style>