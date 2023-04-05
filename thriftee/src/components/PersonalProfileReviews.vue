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
      
        
      <transition-group class='carousel' tag="div">
        <img src ="src\assets\previous.png" class="btn" id=btn @click="previous">
        <div v-for="slide in slides" class='slide' :key="slide.id">
          
        <h2 class = buyer> {{ slide.buyer }}</h2>
        <h3 class = description > "{{ slide.title }}" </h3>
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
    let user = await getDoc(doc(db, "Profiles", 'ECKfuQXt4BWOmpdyVTyIIwmoPsx2')) // replace with unique user id
    let userData = user.data()
    const coll = collection(db, "Reviews");
    const q = query(coll, where("SellerID","==", "Lebron"));
    const snapshot = await getDocs(q);
    
    let slides = [];
    
    var i = 0;
    snapshot.forEach((doc) => {
        console.log(i++)
        let review = doc.data();
        slides.push({
                     title: review.Description,
                    buyer: review.BuyerID} );
      })
    export default {
        name: "PersonalProfileReviews",
        data() {
            return {
                value: 4,
                name: "", 
                uid: "", 
                slides
            }
        },
        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.name = user.displayName;
                this.uid = user.uid;
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
      } 
    }, 

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
    width: 24em;
    min-height: 20em;
    margin-left: 350px;
  }
  .buyer{
    padding:20px;
    text-align: left;
  }
  .description{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 21px;
  }

  
  .slide {
    flex: 0 0 25em;
    height: 20em;
    margin: 1em;
    display: flex;
    padding-left: 0px;
    
    /* justify-content: center; */
    /* align-items: center; */
    border: solid;
    border-width: 0.1em;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    background-color: antiquewhite;
  }
  
  .slide:first-of-type {
    opacity: 0;
  }
  .slide:last-of-type {
    opacity: 0;
  }

  #btn {
    max-width: 20%;
    
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
  margin-left: 5vw;
}

#previousbutton {
  width: 15%;
  margin-top: 10vw;
  margin-right: 5vw;
}

#entirereview {
  display: flex;
  width:60vw;
}


</style>