<template>
  <div class="mainContainer">
    <div class="topContainer">
      <h2 class="pageTitle">Products</h2>
    </div>
    <div class="bottomContainer">
      <div class="leftContainer">
        <div class="w3-bar-block" id="filterContainer">
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Price</strong></div>
              <button class="filterRowRight w3-button">+</button>
            </div>
            <div id="sliderContainer">
              <input v-bind:max=maxPrice :value=maxPrice/2
                type="range"
                min="1"
                class="slider"
                id="myRange"
              />
            </div>
          </div>
          <hr />
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Condition</strong></div>
              <!-- <button class="filterRowRight w3-button" id="conditionButton" v-on:click="openClose">+</button>  -->
              <button class="filterRowRight w3-button">+</button>
            </div>
            <form>
              <input type="checkbox" id="Brand New" value="Brand New" />
              <label for="Brand New" class="checkboxOption"> Brand New</label
              ><br />
              <input type="checkbox" id="Like New" value="Like New" />
              <label for="Like New" class="checkboxOption"> Like New</label
              ><br />
              <input type="checkbox" id="Lightly Used" value="Lightly Used" />
              <label for="Lightly Used" class="checkboxOption">
                Lightly Used</label
              ><br />
              <input type="checkbox" id="Well Used" value="Well Used" />
              <label for="Well Used" class="checkboxOption"> Well Used</label
              ><br />
              <input type="checkbox" id="Heavily Used" value="Heavily Used" />
              <label for="Heavily Used" class="checkboxOption">
                Heavily Used</label
              >
            </form>
          </div>
          <hr />
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Size</strong></div>
              <button class="filterRowRight w3-button">+</button>
            </div>
            <form>
              <input type="checkbox" id="Small" value="Small" />
              <label for="Small" class="checkboxOption"> Small</label><br />
              <input type="checkbox" id="Medium" value="Medium" />
              <label for="Medium" class="checkboxOption"> Medium</label><br />
              <input type="checkbox" id="Large" value="Large" />
              <label for="Large" class="checkboxOption"> Large</label>
            </form>
          </div>
          <hr />
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Gender</strong></div>
              <button class="filterRowRight w3-button">+</button>
            </div>
            <form>
              <input type="checkbox" id="Male" value="Male" />
              <label for="Male" class="checkboxOption"> Male</label><br />
              <input type="checkbox" id="Female" value="Female" />
              <label for="Female" class="checkboxOption"> Female</label>
            </form>
          </div>
          <hr />
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Category</strong></div>
              <button class="filterRowRight w3-button">+</button>
            </div>
            <form>
              <input type="checkbox" id="Tops" value="Tops" />
              <label for="Tops" class="checkboxOption"> Tops</label><br />
              <input type="checkbox" id="Bottoms" value="Bottoms" />
              <label for="Bottoms" class="checkboxOption"> Bottoms</label><br />
              <input type="checkbox" id="Outerwear" value="Outerwear" />
              <label for="Outerwear" class="checkboxOption"> Outerwear</label
              ><br />
              <input type="checkbox" id="Shoes" value="Shoes" />
              <label for="Shoes" class="checkboxOption"> Shoes</label>
            </form>
          </div>
          <hr />
        </div>
      </div>
      <div class="rightContainer">
        <div class="displayContainer">
          <div
            class="product-item"
            v-for="listing in listingsData"
            :key="listing.Title"
          >
            <div class="product-image-placeholder">
              <img :src="listing.Image_URL" alt="" style="max-width: 100%;max-height: 100%; object-fit: contain;">
            </div>
            <div class="product-text">
              <div id="productCondition">
                Condition: {{ listing.Condition }}
              </div>
              <div id="productTitle">
                <router-link class="link" :to="{ name: 'ViewListing', params:{ listingid: listing.ListingID } }"> <button @click="navigate" role="link" id = "listingpagebutton" type="button"> <u> {{ listing.Title }}</u></button>  </router-link>
              </div>
              <div id="productPrice">
                ${{ listing.Price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
  data() {
    return {
      //products is just internal test data not from firestore database
      products: [
        { title: "Flannel Shirt", condition: "Like New", price: "$18" },
        { title: "Jeans", condition: "Like New", price: "$15" },
        { title: "Baseball Cap", condition: "Brand New", price: "$8" },
        { title: "Leather Shoes", condition: "Like New", price: "$12" },
        { title: "Accessory", condition: "Like New", price: "$5" },
        { title: "Shorts", condition: "Brand New", price: "$10" },
        { title: "Flannel Shirt", condition: "Like New", price: "$18" },
        { title: "Jeans", condition: "Like New", price: "$15" },
        { title: "Baseball Cap", condition: "Brand New", price: "$8" },
        { title: "Leather Shoes", condition: "Like New", price: "$12" },
        { title: "Accessory", condition: "Like New", price: "$5" },
        { title: "Shorts", condition: "Brand New", price: "$10" }
      ],
      // listings:[],
    };
  },
  methods: {
    // async readData() {
    //   const querySnapshot = await getDocs(collection(db, "Listings"));
    //   querySnapshot.forEach((doc) => {
    //     const dataRef = doc.data();
    //     dataRef.ListingID = doc.id;
    //     this.listings.push(dataRef);
    //   });
    //   console.log("original");
    //   console.log(this.listings);
    // },
    // openClose() {
    //   var x = document.getElementById("conditionForm")
    //   console.log(x.style.display)
    //   if (x.style.display == "none") {
    //     x.style.display = "block";
    //   } else {
    //     x.style.display = "none";
    //   }
    //   const btn = document.getElementById("conditionButton");
    //   console.log(btn.innerText)
    //   if (btn.innerText == "+") {
    //     btn.innerText = "-"
    //   } else {
    //     btn.innerText = "+"
    //   }
    // },
  },
  // created() {
  //   this.readData()
  // },
  computed: {
    listingsData() {
      const availableListings = this.$store.getters.listingsData.filter((listing) => listing.Listing_Available);
      return availableListings;
    },
    maxPrice() {
      var highestPrice = 0;
      const availableListings = this.$store.getters.listingsData.filter((listing) => listing.Listing_Available);
      availableListings.forEach((listing) => {
        if (listing.Price > highestPrice) {
          highestPrice = listing.Price;
        };
      });
      return highestPrice;
    }
  }
};
</script>

<style scoped>
@import url("https://www.w3schools.com/w3css/4/w3.css");

.mainContainer {
  background-color: transparent;
  width: 100vw;
}
.topContainer {
  height: 10vh;
  background-color: #5c5b59;
  font-weight: bold;
  color: white;
}
.pageTitle {
  margin-right: 90%;
  padding: 25px;
}
.bottomContainer {
  display: table;
}
.leftContainer {
  /* background-color: orange; */
  background-color: white;
  width: 25vw;
  display: table-cell;
}
.rightContainer {
  /* background-color: aqua; */
  width: 75vw;
  display: table-cell;
  border-left: 2px solid black;
}
.displayContainer {
  display: grid;
  padding: 20px;
  row-gap: 10px;
  column-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  background-color: #7e7d7d20;
}
.product-item {
  outline-style: solid;
  width: auto;
  height: auto;
  padding: 10px;
}
.product-image-placeholder {
  outline-style: dashed;
  position: relative;
  /* padding: 20%; */
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-text {
  padding: 10px;
}
.filterRow {
  /* background-color: gold; */
  display: table;
}
.filterRowLeft {
  /* background-color: green; */
  display: table-cell;
  width: 20vw;
  font-size: 1em;
}
.filterRowRight {
  /* background-color: blue; */
  display: table-cell;
  font-size: 1em;
}
.slider {
  -webkit-appearance: none;
  width: 90%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4b4e4d;
  cursor: pointer;
}
.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4b4e4d;
  cursor: pointer;
}

#filterContainer {
  width: 25vw;
  /* height: 90vh; */
  background-color: white;
  position: absolute;
}

/* #conditionForm{
  display: none
} */

#listingpagebutton {
  border: none;
  font-weight: bold;
  font-size: 1.1em;
}

#listingpagebutton:hover {
  border: none;
  color:grey;
}
</style>
