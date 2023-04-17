<template>
    <div id = "listingcreate">
        <div id = "listingheader">
            <h2> New Listing</h2>
        </div>

        <div id ="container">
            <div id = "leftcontainer">
                <div id = "listingphotoset">
                    <img id = "listingphoto" src="../assets/defaultListing.png" alt="Listing Photo">
                    <div id = "buttonsupdate">
                        <label for="uploadbutton">Upload</label>
                        <input type="file" id="uploadbutton" accept="image/*" v-on:change="updateListingImage" ref="listings" hidden/>
                        <button id = "deletebutton" type="button" v-on:click="deleteListingImage">Delete </button> 
                    </div>
                </div>
            </div>

            <div id = "rightcontainer">
                <form id="myform" @submit.prevent="saveListing">

                    <div class = "formli">

                        <label for="listingtitle">Listing Title </label>
                        <input type = "text" id = "listingtitle" v-model = "listingtitle" placeholder = "Enter Listing Title" required> <br><br>
                        
                        <label for="listingprice">Price </label>
                        <div>
                            <span style = "margin-left: 5vw;" id="dollarsign">$</span>
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
                            <option value="#FFFFFF">White</option>
                            <option value="#800080">Purple</option>
                        </datalist>
                    
                        <label for="size">Size</label>
                        <select id="size" v-model="size" name="size" v-if="category !== 'Shoe'" required>
                            <option id="test" value="" selected hidden disabled>Select size of item</option>
                            <option>XXS</option>
                            <option>XS</option>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </select>
                        <select id="size" v-model="size" name="size" v-else required>
                            <option id="test" value="" selected hidden disabled>Select size of item</option>
                            <option v-for="i in 9" :key="32 + (i * 2)">EU {{ 32 + (i * 2) }}</option>
                        </select>
                        <br><br>
                        
                        <div id = "buttonsupdate">
                            <button id = "cancelbutton" type="button">Cancel</button> 
                            <button id = "savebutton" type="submit">Save</button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
 
</template>

<script>
    import firebaseApp, { storage } from '../firebase.js';
    import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
    import { getFirestore, setDoc } from "firebase/firestore";
    import { doc, getDoc, collection } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from 'firebase/auth';

    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    export default {
        name: "CreateListing",

        data() {
            return {
                listingtitle: "",
                price: "",
                condition: "",
                category: "",
                colour: "#ffffff",
                size: "",
                uid: "",
                telegram: "",
                listingImage: null
            }
        },
        
        mounted() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.uid = user.uid;
                } 
            })
        },

        methods: {
              // To update the listing image in firebase
            updateListingImage: async function() {
                console.log("updating listing image")
                var fReader = new FileReader();
                try {
                    var image = document.getElementById("uploadbutton");
                    fReader.readAsDataURL(image.files[0]);
                    fReader.onloadend = function(event) {
                        var img = document.getElementById("listingphoto");
                        img.src = event.target.result;
                    }
                    alert("Listing image displayed")
                } catch(error) {
                    alert("No listing image found ", error)
                    document.getElementById("listingphoto").src="../assets/defaultListing.png"
                }
            },

              // To save the new listing entry to the Listings collection in firebase
            saveListing: async function() {
                let image = document.getElementById("uploadbutton").value
                if (image == "") {
                    alert("Upload Image!")
                } else {
                    try {
                        let userProfile = await getDoc(doc(db, "Profiles", this.uid))
                        let userProfileData = userProfile.data()
                        this.telegram = userProfileData.Telegram
                        console.log("im here")
                        const docRef = doc(collection(db, "Listings"));
                        console.log(docRef.id)
                        const url = await this.uploadToCloud(docRef.id)
                        
                        await setDoc(docRef, { 
                            SellerID: this.uid,
                            Title: this.listingtitle,
                            Price: this.price,
                            Condition: this.condition,
                            Category: this.category,
                            Colour: this.colour,
                            Size: this.size,
                            Listing_Image: image,
                            Telegram: this.telegram,
                            Listing_Available: true,
                            Image_URL: url
                        }, {merge: true})
                        console.log("LOL", url)
                        alert("Listing creating!")
                        this.$router.push({name: "ProfileListings"})
                        

                        
                        
                    } catch(error) {
                        alert("Error creating listing: ", error)
                    }
                }
            }, 
            
              // To delete the listing image from firebase
            deleteListingImage: function() {
                if (document.getElementById("uploadbutton").value == "") {
                    alert("Upload Image!")
                } else {
                    document.getElementById("uploadbutton").value = ""
                    document.getElementById("listingphoto").src = "../assets/defaultListing.png"
                    alert("Listing Image Successfully Removed")
                }
              
            },

              // To upload the listing image 
            uploadToCloud: async function(listing_uid) {
                const storageRef = ref(storage, 'Listings/' + listing_uid )
                await uploadBytes(storageRef, this.$refs.listings.files[0])
                console.log("uploaded")
                const url = await getDownloadURL(storageRef)
                console.log("inside")
                
            
                return url
            }   

          
        }
    }
    
</script>


<style scoped>
#listingheader h2 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: rgb(88, 85, 85);
  font-size: 2.5vw;
  font-weight:bold;
}
#container{
    display: flex;
    width: 100vw;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
label[for="uploadbutton"] {
    background-color: rgb(248, 248, 248);; /* Green */
    border: 1px solid rgb(148, 149, 144); /* Green */
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 9px 28px;
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
    margin-top: 5vh;
    /* margin-right: 15vw; */
    width: 50%;
}
#rightcontainer{
    margin-top: 2vh;
    /* margin-left: 5vw; */
    width: 40%;
}
#deletebutton {
  background-color: #be4a4ac3; /* Green */
  border: 1px solid #b02c2cbe; /* Green */
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 9px 28px;
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
  
}
#savebutton {
  background-color: #3ddfc1c5; /* Green */
  border: 1px solid #5ec3b0;; /* Green */
  border-radius: 25px;
  color: rgb(0, 0, 0);
  padding: 9px 28px;
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
 
}
#cancelbutton {
  background-color: rgb(246, 243, 243); 
  border: 1px solid rgb(175, 166, 166); /* Green */
  border-radius: 25px;
  color: black;
  padding: 9px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
}
#cancelbutton:hover {
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

select {
    width: 70%;
  display: block;
  border: none;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  height: 40px;
  margin-left: 6vw;
  font-size: 16px;
  margin-top: 1vh;
}
input[type=text], input[type=number], input[type=color] {
  width: 70%;
  padding: 10px 0px;
  display: block;
  border: none;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  height: 40px;
  margin-left: 6vw;
  font-size: 16px;
  background-color: transparent;
}
input[type=file]{
  width: 100%;
  margin-top: 3vh;
}

::placeholder {
   text-align: center; 
   font-size: 17px;
}

.save {
    text-align: center;
}
img {
    width: auto;
    height: auto;
    margin-top:5vh;
}
#listingphoto {
    width: 30vw;
   margin-bottom: 2vh;
}
#dollarsign {
    display: flex;
    position: absolute;
    margin-top: 11px;
    margin-left: 8px;
    font-size: 15px;
}

#listingheader h2 {
    margin-top: 2vh;
    font-weight: 500;
}


</style>