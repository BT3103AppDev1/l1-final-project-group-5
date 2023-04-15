<template>
  <div id="container">
    <div id="linebreak"></div>

    <div id="container2">
      <div>
        <router-link
          v-if="seller_uid"
          class="link"
          :to="{
            name: 'CustomerProfileView',
            params: { sellerid: seller_uid },
          }"
        >
          <button
            @click="navigate"
            role="link"
            id="listingsbutton"
            type="button"
          >
            <em>Listings</em>
          </button>
        </router-link>
      </div>

      <div>
        <router-link
          v-if="seller_uid"
          class="link"
          :to="{ name: 'CustomerReviewView', params: { sellerid: seller_uid } }"
        >
          <button
            @click="navigate"
            role="link"
            id="reviewsbutton"
            type="button"
          >
            <em>Reviews</em>
          </button>
        </router-link>
      </div>
    </div>
    <div id="entirereview">
  <div class='carousel-controls'>
  <div class='carousel-view'>
    
    <transition-group name = "list" class='carousel' tag="div" :max="1">
      <img v-if="havestar" src ="../assets/previous.png" class="btn" id=btn @click="previousSlide">
      <div v-for="(slide,index) in slides" class='slide' :key="index">
      
        <h2 class = buyer style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"> <b>{{ slide.buyer }}</b></h2>
        <div v-if="havestar" id="star-rating">
          <p> {{ slide.ratingstar }} / 5 </p>
          <p> </p>
          <p id="startext">★</p>
        </div>
        <div v-else id="nostar">
          <p> </p>
        </div>
        <h3 class = description style = "font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;"><i>"{{ slide.title }}" </i> </h3>
      </div>
      <img v-if="havestar" src ="../assets/next.png" class="btn" id=btn  @click="nextSlide">
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
      name: "ViewSellerReview",
      props: {
          sellerUID: {
              type: String,
              default: ""
          }
      
      },
      data() {
          return {
              value: 3,
              name: "", 
              uid: "", 
              slides:[],
              seller_uid: this.sellerUID,
              havestar: false
          }
      },
      mounted() {
          onAuthStateChanged(auth, (user) => {
              if (user) {
                this.name = user.displayName;
                this.uid = user.uid;
              }
              this.updateReviews()
          })
          
      },
      methods: {
        nextSlide () {
          const first = this.slides.shift()
          this.slides = this.slides.concat(first)
        },
        previousSlide () {
            const last = this.slides.pop()
            this.slides = [last].concat(this.slides)
        }, 
        
        async updateReviews() {
          console.log(this.seller_uid)
          const firstQuery = query(collection(db, "Reviews"), where("RevieweeID", "==", this.seller_uid))
          
          const querySnapshot = await getDocs(firstQuery);
          
          if(querySnapshot.empty){
            this.havestar = false
            this.slides.push({   
                title: "No reviews yet",
                buyer: ""
              });
          } else{
          querySnapshot.forEach((doc) => {
              this.havestar = true
              let review = doc.data()
              this.slides.push({   
                title: review.Description,
                buyer: review.ReviewerName,
                ratingstar: review.Rating
              });
              
          })
        }
    }, 
  }
}
</script>
  
    
<style scoped>
#star-rating {
  display: flex;
  justify-content: center;
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#nostar {
  margin-bottom: 10vh;
}

#startext {
  color: orange;
  margin-left: 0.8vw;
}
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  width: 20vw;
  min-height: 10em;
  margin-left: 20vw;
}
.buyer{
  padding-top:10px;
  margin-left:0.8vw;
  text-align: left;
  font-size: x-large;
  /* background-color: black; */
  color:rgb(74, 71, 71);
  /* font-family: "Lucida Console", "Courier New", monospace; */
}
.description{
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size:x-large;
}

.slide {
  width: 100%;
  flex: 0 0 23em;
  height: 32vh;
  margin-top: 3vw;
  display: inline-block;
  border: 1px solid rgb(242, 242, 242);
  margin-top: 7vh;
  border-width: 0.3em;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  background-color: rgba(251, 250, 250, 0.852);
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
  color: rgb(164, 158, 158);
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
  width: 60vw;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#linebreak {
  margin-top: 3vh;
}

#container {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
