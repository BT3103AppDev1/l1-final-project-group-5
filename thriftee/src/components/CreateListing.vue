<template>
    <div id = "listingcreate">
        <div id = "listingheader">
            <h1> Create Listing</h1>
        </div>

        <div id ="container">
            <div id = "leftcontainer">
                <div id = "listingphotoset">
                    <img id = "listingphoto" src="defaultListing.png" alt="Listing Photo">
                    <div id = "buttonsupdate">
                        <label for="uploadbutton">Upload</label>
                        <input type="file" id="uploadbutton" v-on:change="updateListingImage" hidden/>
                        <button id = "deletebutton" type="button" v-on:click="deleteListingImage">Delete </button> 
                    </div>
                </div>
            </div>

            <div id = "rightcontainer">
                <form id="myform">

                    <div class = "formli">

                        <label for="listingtitle">Listing Title </label>
                        <input type = "text" id = "listingtitle" v-model = "listingtitle" placeholder = "Enter Listing Title" required> <br><br>
                        
                        <label for="listingprice">Price </label>
                        <div>
                            <span id="dollarsign">$</span>
                            <input v-model="price" type = "number" id = "listingprice" placeholder = "In SGD" min="0" step="0.01" required> <br><br>                      
                        </div>

                        <label for="condition">Condition</label>
                        <select id="condition" v-model="condition" name="condition" required>
                            <option value="" selected hidden disabled>Select condition of item</option>
                            <option>Brand New</option>
                            <option>Like New</option>
                            <option>Lightly Used</option>
                            <option>Well Used</option>
                            <option>Heavily Used</option>
                        </select><br><br>

                        <label for="category">Category</label>
                        <select id="category" v-model="category" name="category" required>
                            <option value="" selected disabled hidden>Select category of item</option>
                            <option>Top</option>
                            <option>Bottom</option>
                            <option>Outerwear</option>
                            <option>Shoe</option>
                        </select><br><br>

                        <label for="colour">Colour of Item</label><br>
                        <input type = "color" id="colour" v-model="colour" list="presets" required> <br><br>
                        <datalist id="presets">
                            <option value="#000000">Black</option>
                            <option value="#FF0000">Red</option>
                            <option value="#808080">Gray</option>
                            <option value="#FFFF00">Yellow</option>
                            <option value="#00FF00">Green</option>
                            <option value="#000080">Blue</option>
                            <option value="#800080">Purple</option>
                        </datalist>
                    
                        <label for="size">Size</label>
                        <select id="size" v-model="size" name="size" required>
                            <option id="test" value="" selected hidden disabled>Select size of item</option>
                            <option>XXS</option>
                            <option>XS</option>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </select><br><br>
                        
                        <div id = "buttonsupdate">
                            <button id = "cancelbutton" type="button">Cancel</button> 
                            <button id = "savebutton" type="button" v-on:click ="saveListing">Save</button> 
                        </div>
                    </div>
                </form>
                <h1>${{price}} | {{condition}} | {{category}} | {{size}} </h1>
            </div>
        </div>
    </div>
 
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { getFirestore } from "firebase/firestore";
    import { doc, setDoc, updateDoc } from "firebase/firestore";
    const db = getFirestore(firebaseApp);
    let userID = Math.random().toString(); //placeholder for userid
    export default {
        data() {
            return {
                listingtitle: "",
                price: "",
                condition: "",
                category: "",
                colour: "",
                size: ""
            }
        },
        methods: {
            updateListingImage: async function() {
                console.log("updating listing image")
                var fReader = new FileReader();
                try {
                    var image = document.getElementById("uploadbutton");
                    fReader.readAsDataURL(image.files[0]);
                    console.log(image.files[0])
                    fReader.onloadend = function(event) {
                        var img = document.getElementById("listingphoto");
                        img.src = event.target.result;
                    }
                    console.log(image.value)
                    alert("Listing image displayed")
                } catch(error) {
                    alert("No listing image found ", error)
                    document.getElementById("listingphoto").src="defaultListing.png"
                }
            },
            saveListing: async function() {
                let image = document.getElementById("uploadbutton").value
                try {
                const docRef = await setDoc(doc(db, "Listings", userID), { // need to change to unique userID
                    Title: this.listingtitle,
                    Price: this.price,
                    Condition: this.condition,
                    Category: this.category,
                    Colour: this.colour,
                    Size: this.size,
                    Listing_Image: image
                })
                alert("Listing creating!")
                } catch(error) {
                alert("Error creating listing: ", error)
                }
            }, 
            deleteListingImage: function() {
                if (document.getElementById("uploadbutton").value == "") {
                    alert("Upload Image!")
                } else {
                    document.getElementById("uploadbutton").value = ""
                    document.getElementById("listingphoto").src = "defaultListing.png"
                    alert("Listing Image Successfully Deleted")
                }
              
            }
          
        }
    }
    
</script>


<style scoped>
#listingheader h1 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: rgb(80, 68, 68);
    font-size: 3.5vw;
    font-weight:bold;
}
#container{
    display: flex;
    width: 100vw;
}
label[for="uploadbutton"] {
    background-color: #60cbb8; /* Green */
  border: 2px solid #60cbb8; /* Green */
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  margin-left: 4vw;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
label[for="uploadbutton"]:hover {
  background-color: 359138; /* Green */
  color: white;
  border: 2px solid #60cbb8; /* Green */
}
input::file-selector-button {
    font-weight: bold;
    color: black;
    background-color: rgb(203, 236, 234); /* Green */
    padding: 0.5em;
    border: 1.5px solid #1c0808; /* Green */
    border-radius: 5px;
    margin-right: 1vw;
    margin-left: 30%;
    margin-bottom: 1vh;
}
input::file-selector-button:hover {
    color: white;
    background-color: black; /* Green */
}
#leftcontainer{
    margin-top: 13vh;
    /* margin-right: 15vw; */
    width: 50%;
}
#rightcontainer{
    margin-top: 2vh;
    /* margin-left: 5vw; */
    width: 40%;
}
#deletebutton {
  background-color: #ed4141; /* Green */
  border: 2px solid #ed4141; /* Green */
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  margin-left: 3vw;
  margin-right: 4vw;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
#deletebutton:hover {
  color: white;
  border: 2px solid #ed4141; /* Green */
}
#savebutton {
  background-color: #60cbb8; /* Green */
  border: 2px solid #60cbb8; /* Green */
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 10px 32px;
  margin-left: 35px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
#savebutton:hover {
  background-color: 359138; /* Green */
  color: white;
  border: 2px solid #60cbb8; /* Green */
}
#cancelbutton {
  background-color: white; 
  border: 2px solid #c64f31; /* Green */
  border-radius: 25px;
  color: black;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
#cancelbutton:hover {
  background-color: #c64f31; /* Green */
  color: white;
}
h2 {
    background-color: rbg(129,184,99);
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
input[type=text], input[type=number], input[type=color] {
  width: 100%;
  padding: 12px 20px;
  margin: 1px 0;
  display: block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  height: 40px;
  border-radius: 10px;
  font-size: 16px;
}
input[type=file]{
  width: 100%;
  margin-top: 3vh;
}
select {
    width: 100%;
    padding: 12px 20px;
    margin: 1px 0;
    display: block;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    height: 40px;
    font-size: 12px;
    text-align: center;
}
::placeholder {
   text-align: center; 
   font-size: 17px;
}
input:hover, select:hover {
    /* box-shadow: 3px 3px purple; */
    border-radius: 5px;
}
.save {
    text-align: center;
}
img {
    width: 450px;
    height: auto;
}
#listingphoto {
    width: 350px;
    padding-bottom: 10px;
}
#dollarsign {
    display: flex;
    position: absolute;
    margin-top: 11px;
    margin-left: 8px;
    font-size: 15px;
}
</style>