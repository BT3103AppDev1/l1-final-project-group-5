<template>

  <div id = "container">
      <div id="linebreak">
          <hr>
      </div>
  
  <div id = "container2">
      <div>
          <router-link to="/profilelistings"
              custom
              v-slot="{ navigate }" >
              <button @click="navigate" role="link" id = "listingsbutton" type="button"> <em>Listings</em></button> 
          </router-link>  
      </div>

      <div>
          <router-link to="/profilereviews"
              custom
              v-slot="{ navigate }" >
              <button @click="navigate" role="link" id = "reviewsbutton" type="button"> <em>Reviews</em></button> 
          </router-link>  
      </div>

      <div>
          <router-link to="/deals"
              custom
              v-slot="{ navigate }" >
              <button @click="navigate" role="link" id = "dealsbutton" type="button"> <em>Deals</em></button> 
          </router-link>  
      </div>
  </div>
  <div id="entirereview">
  <div class='carousel-controls'>
  <div class='carousel-view'>
    
    <transition-group name = "list" class='carousel' tag="div" :max="1">
      <img src ="src\assets\previous.png" class="btn" id=btn @click="previous">
      <div v-for="slide in slides" class='slide' :key="slide.id">
        
      <h2 class = buyer> <b>{{ slide.buyer }}</b></h2>
      <h3 class = description ><i>"{{ slide.title }}" </i> </h3>
      </div>
      <img src ="src\assets\next.png" class="btn" id=btn  @click="next">
    </transition-group>
    
    </div>
  </div>
  </div>
</div>

</template>
  
<script>
import firebaseApp from '../firebase.js';
  import { getDoc,getCountFromServer, collection, addDoc, getFirestore, query, where, getDocs, doc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  
  export default {
      name: "PersonalProfileReviews",
      data() {
          return {
              value: 3,
              name: "", 
              uid: "", 
              slides:[],
          };
      },
      mounted() {
          onAuthStateChanged(auth, (user) => {
              this.name = user.displayName;
              this.uid = user.uid;
              this.updateReviews()
          })
      },
      methods: {
        next () {
        const first = this.slides.shift()
        this.slides = this.slides.concat(first)
        },
        previous () {
          const last = this.slides.pop()
          this.slides = [last].concat(this.slides)
        }, 
        
        async updateReviews() {
          let user = auth.currentUser;
          let userID = user.uid;
          const firstQuery = query(collection(db, "Reviews"), where("SellerID", "==", userID))
          const secondQuery = query(collection(db, "Reviews"), where("BuyerID", "==", userID))
          const querySnapshot = await getDocs(firstQuery);
          
          querySnapshot.forEach((doc) => {
              let review = doc.data()
              this.slides.push({   
                title: review.Description,
                buyer: review.BuyerID
              });
              
          })
          const querySnapshot2 = await getDocs(secondQuery);
          querySnapshot2.forEach((doc) => {
              let review = doc.data()
              this.slides.push({        
                title: review.Description,
                buyer: review.SellerID
              });
              
          })
          
      }, 
  }
}
</script>

  
<style scoped>

.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow:visible;
  width: 20vw;
  min-height: 10em;
  margin-left: 20vw;
}
.buyer{
  padding:20px;
  text-align: left;
  font-size: x-large;
  background-color: black;
  color:white;
  font-family: "Lucida Console", "Courier New", monospace;
}
.description{
  display: flex;
  align-items: center;
  flex: left;
  font-size:x-large;
  font-family: "Lucida Console", "Courier New", monospace;
}

.slide {
  max-width: 400px;
  flex: 0 0 23em;
  height: 15em;
  margin-top: 3vw;
  display: inline-block;
  border: solid;
  margin: 10px;
  border-width: 0.3em;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
 
  background-color: beige;
}

.slide:nth-last-of-type(odd) {
  display:none;
}
.slide:nth-last-of-type(even) {
  display:none;
}
.slide:first-of-type {
  opacity: 100;
  display:block
}  
.slide:nth-last-of-type(2) {
  opacity: 100;
  display:block
}  
.slide:last-of-type {
  opacity: 100;
  display:block
}  
.slide:second-of-type {
  opacity: 100;
  display:block
}  
.slide:first-of-type {
  opacity: 100;
  display:block
}  
#btn {
  max-width: 10%;
  margin-left: 0px;
  
}
#container2 {
  display: flex;
  justify-content: center;
}
#listingsbutton {
  background: transparent;
  border: none;
  margin-left: 0.3vw;
  font-size: 1.8em;
  color: rgb(8, 8, 8);
  margin-right: 5vw;
}
#listingsbutton:hover {
  font-size: 1.8em;
  color: rgb(117, 113, 113);
  text-decoration: underline;
}
#reviewsbutton {
  background: transparent;
  border: none;
  margin-left: 0.3vw;
  font-size: 1.8em;
  color: rgb(8, 8, 8);
}
#reviewsbutton:hover {
  font-size: 1.8em;
  color: rgb(117, 113, 113);
  text-decoration: underline;
}
#dealsbutton {
  background: transparent;
  border: none;
  margin-left: 5vw;
  font-size: 1.8em;
  color: rgb(8, 8, 8);
}
#dealsbutton:hover {
  font-size: 1.8em;
  color: rgb(117, 113, 113);
  text-decoration: underline;
}
hr {
  height: 1px;
  width: 100%;
  background-color: black;
}
#linebreak {
  margin: auto;
}
#nextbutton {
width: 15%;
margin-top: 10vw;

}
#previousbutton {
width: 15%;
margin-top: 10vw;
margin-left: 10vw;
}
#entirereview {
display: flex;
width:60vw;
}
</style>