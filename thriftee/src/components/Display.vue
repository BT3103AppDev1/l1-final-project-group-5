<template>
  <div class="mainContainer">
    <div class="topContainer">
      <h2 class="pageTitle">Products</h2>
    </div>
    <div class="bottomContainer">
      <div class="leftContainer">
        <form class="w3-bar-block" id="filterContainer">
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Price</strong></div>
            </div>
            <div id="sliderContainer">
              <input v-bind:max=maxPrice v-model="priceCap"
                type="range"
                min="1"
                class="slider"
                id="myRange"
              />
            </div>
            <div>Price Limit: {{ priceCap }}</div>
          </div>
          <hr />
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Condition</strong></div>
            </div>
            <div>
              <input type="checkbox" id="Brand New" value="Brand New" v-model="conditionReq"/>
              <label for="Brand New" class="checkboxOption"> Brand New</label
              ><br />
              <input type="checkbox" id="Like New" value="Like New" v-model="conditionReq"/>
              <label for="Like New" class="checkboxOption"> Like New</label
              ><br />
              <input type="checkbox" id="Lightly Used" value="Lightly Used" v-model="conditionReq"/>
              <label for="Lightly Used" class="checkboxOption">
                Lightly Used</label
              ><br />
              <input type="checkbox" id="Well Used" value="Well Used" v-model="conditionReq"/>
              <label for="Well Used" class="checkboxOption"> Well Used</label
              ><br />
              <input type="checkbox" id="Heavily Used" value="Heavily Used" v-model="conditionReq"/>
              <label for="Heavily Used" class="checkboxOption">
                Heavily Used</label
              >
            </div>
          </div>
          <hr />
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Size</strong></div>
            </div>
            <div>
              <input type="checkbox" id="XXS" value="XXS" v-model="sizeReq"/>
              <label for="XXS" class="checkboxOption"> XXS</label><br />
              <input type="checkbox" id="XS" value="XS" v-model="sizeReq"/>
              <label for="XS" class="checkboxOption"> XS</label><br />
              <input type="checkbox" id="S" value="S" v-model="sizeReq"/>
              <label for="S" class="checkboxOption"> S</label><br />
              <input type="checkbox" id="M" value="M" v-model="sizeReq"/>
              <label for="M" class="checkboxOption"> M</label><br />
              <input type="checkbox" id="L" value="L" v-model="sizeReq"/>
              <label for="L" class="checkboxOption"> L</label><br />
              <input type="checkbox" id="XL" value="XL" v-model="sizeReq"/>
              <label for="XL" class="checkboxOption"> XL</label><br />
              <input type="checkbox" id="XXL" value="XXL" v-model="sizeReq"/>
              <label for="XXL" class="checkboxOption"> XXL</label><br />
              <input type="checkbox" id="EU 34" value="EU 34" v-model="sizeReq"/>
              <label for="EU 34" class="checkboxOption"> EU 34</label><br />
              <input type="checkbox" id="EU 36" value="EU 36" v-model="sizeReq"/>
              <label for="EU 36" class="checkboxOption"> EU 36</label><br />
              <input type="checkbox" id="EU 38" value="EU 38" v-model="sizeReq"/>
              <label for="EU 38" class="checkboxOption"> EU 38</label><br />
              <input type="checkbox" id="EU 40" value="EU 40" v-model="sizeReq"/>
              <label for="EU 40" class="checkboxOption"> EU 40</label><br />
              <input type="checkbox" id="EU 42" value="EU 42" v-model="sizeReq"/>
              <label for="EU 42" class="checkboxOption"> EU 42</label><br />
              <input type="checkbox" id="EU 44" value="EU 44" v-model="sizeReq"/>
              <label for="EU 44" class="checkboxOption"> EU 44</label><br />
              <input type="checkbox" id="EU 46" value="EU 46" v-model="sizeReq"/>
              <label for="EU 46" class="checkboxOption"> EU 46</label><br />
              <input type="checkbox" id="EU 48" value="EU 48" v-model="sizeReq"/>
              <label for="EU 48" class="checkboxOption"> EU 48</label><br />
              <input type="checkbox" id="EU 50" value="EU 50" v-model="sizeReq"/>
              <label for="EU 50" class="checkboxOption"> EU 50</label>
            </div>
          </div>
          <hr />
          <div class="w3-bar-item">
            <div class="filterRow">
              <div class="filterRowLeft"><strong>Category</strong></div>
            </div>
            <div>
              <input type="checkbox" id="Tops" value="Top" v-model="categoryReq"/>
              <label for="Top" class="checkboxOption"> Tops</label><br />
              <input type="checkbox" id="Bottoms" value="Bottom" v-model="categoryReq"/>
              <label for="Bottom" class="checkboxOption"> Bottoms</label><br />
              <input type="checkbox" id="Outerwear" value="Outerwear" v-model="categoryReq"/>
              <label for="Outerwear" class="checkboxOption"> Outerwear</label
              ><br />
              <input type="checkbox" id="Shoes" value="Shoe" v-model="categoryReq"/>
              <label for="Shoe" class="checkboxOption"> Shoes</label>
            </div>
          </div>
          <hr />
        </form>
      </div>
      <div class="rightContainer">
        <div class="displayContainer" v-if="listingsData.length != 0">
          <div
            class="product-item"
            v-for="listing in listingsData"
            :key="listing.Title"
          >
            <div class="product-image-placeholder">
              <img :src="listing.Image_URL" alt="" style="width: 22vw; height: 35vh; object-fit: cover;">
             
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
        <div v-else id="noListingsFound"> No Listings Found </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default {
  data() {
    return {
      priceCap: "", //store the current selected price 
      sizeReq: [], //store the current selected size options
      conditionReq: [], //store the current selected condition options
      categoryReq: [] //store the current selected category options
    };
  },
  computed: {
    //pull all the listings that are available from state given the current selections/conditions and assign it to a variable
    listingsData() {
      let availableListings = this.$store.getters.listingsData.filter((listing) => listing.Listing_Available)
      if (this.sizeReq.length > 0) {
        availableListings = availableListings.filter((listing) => this.sizeReq.includes(listing.Size))
      }
      if (this.conditionReq.length > 0) {
        availableListings = availableListings.filter((listing) => this.conditionReq.includes(listing.Condition))
      }
      if (this.categoryReq.length > 0) {
        availableListings = availableListings.filter((listing) => this.categoryReq.includes(listing.Category))
      }
      if (this.priceCap.length != "") {
        availableListings = availableListings.filter((listing) => listing.Price <= this.priceCap)
      }
      return availableListings
    },
    //find max price amongst all current listing in firestore to set upper limit of price slider
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
  background-color:transparent;
  width: 100vw;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
}
.displayContainer {
  display: grid;
  padding: 20px;
  row-gap: 10px;
  column-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  background-color: transparent;
}
.product-item {
  width: auto;
  height: auto;
  padding: 5px;
  border: 1px solid black;
}
.product-image-placeholder {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;
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
  /* width: 20vw; */
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
  border-right: 2px solid black;
}

#noListingsFound {
  font-size: 3em;
}

#listingpagebutton {
  border: none;
  font-weight: bold;
  font-size: 1.1em;
}

#listingpagebutton:hover {
  border: none;
  color:grey;
}

img {
  border-radius: 4px;
  border: 1px solid rgb(232, 232, 232);
}

button{
  background-color: transparent;
}

#noListingsFound {
  font-size: 2em;
  margin-top:30%;
  font-weight: 500;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
