<template>
    <div id = "container">
        <!-- <div id = "Reviewheader">
            <h1>Review Page</h1><br><br>
        </div> -->
        <div id = "LeaveReviewheader">
            <h1>Leave a Review</h1>
        </div><br>
        <!-- Star rating system which uses star images to replace radio input -->
        <div class="ratingContainer">
            <div class="rating-wrap">
                <h2> Rating</h2>
                <div class="center">
                    <fieldset class="rating">
                        <input type="radio" id="star5" name="rating" value=5 v-model="ratingValue">
                        <label for="star5" class="full" title="Awesome"></label>
                        <input type="radio" id="star4.5" name="rating" value=4.5 v-model="ratingValue">
                        <label for="star4.5" class="half"></label>
                        <input type="radio" id="star4" name="rating" value=4 v-model="ratingValue">
                        <label for="star4" class="full"></label>
                        <input type="radio" id="star3.5" name="rating" value=3.5 v-model="ratingValue">
                        <label for="star3.5" class="half"></label>
                        <input type="radio" id="star3" name="rating" value=3 v-model="ratingValue">
                        <label for="star3" class="full"></label>
                        <input type="radio" id="star2.5" name="rating" value=2.5 v-model="ratingValue">
                        <label for="star2.5" class="half"></label>
                        <input type="radio" id="star2" name="rating" value=2 v-model="ratingValue">
                        <label for="star2" class="full"></label>
                        <input type="radio" id="star1.5" name="rating" value=1.5 v-model="ratingValue">
                        <label for="star1.5" class="half"></label>
                        <input type="radio" id="star1" name="rating" value=1 v-model="ratingValue">
                        <label for="star1" class="full"></label>
                        <input type="radio" id="star0.5" name="rating" value=0.5 v-model="ratingValue">
                        <label for="star0.5" class="half"></label>
                        
                        <div id ="ratingText">Rating: {{ ratingValue }} out of 5</div>
                    </fieldset>
                </div>

            </div>
        </div><br>

        <div id = "LeaveReviewLable">
            <input type = "text" id = "ReviewInput" placeholder = "Leave a Review" v-model= "description"><br><br>
        </div>

        <div id = "reviewButtons">
            <button id = "cancelbutton" type="button" @click="backToHome">Cancel</button> 
            <button id = "submitbutton" role= "link" type="button" @click="saveReview">Submit</button>
        </div>
    </div>
</template>

<script>
    import firebaseApp from '../firebase.js';
    import { collection, addDoc, getFirestore } from "firebase/firestore";
    import { doc,getDoc,query, where, getDocs, updateDoc } from "firebase/firestore";
    import {getAuth, onAuthStateChanged} from "firebase/auth";
    
    const db = getFirestore(firebaseApp);
    const auth = getAuth();
    
    export default {
        props: {
            listingUID: {
                type: String,
                default: ""
            },

            revieweeUID: {
                type: String,
                default: ""
            },
            isBuyer: {
                type: Boolean,
                default: null
            }
        },
        
        data() {
            return {
                ratingValue: 0,
                description:"",
                listing_uid: this.listingUID,
                reviewee_uid: this.revieweeUID,
                reviewee_name: null,
                reviewer_uid: null,
                reviewer_name: null,
                buyer_uid: null,
                seller_uid: null,
                is_buyer: this.isBuyer
            }
        },

        mounted() {
            onAuthStateChanged(auth, (user) => {
                this.reviewer_uid = user.uid;
                this.reviewer_name = user.displayName;
            })
            this.getRevieweeDetails()
        },
    
        methods:{
            // Function to retrieve the reviewee details using the reviewee's uid
            async getRevieweeDetails() {
                let docRef = await getDoc(doc(db, "Profiles", this.reviewee_uid))
                let dataRef = docRef.data()
                this.reviewee_name = dataRef.Name
            },
            //Input the review details into the Review database in firestore
            async saveReview(){
                var ref = collection(db, "Reviews");
                if (this.description.length == 0){
                    alert("Please provide a review")
                    location.reload()
                }
                try {
                    const docRef = await addDoc(
                        ref, {
                            ListingID: this.listing_uid, //input listing ID here
                            ReviewerID: this.reviewer_uid, 
                            RevieweeID: this.reviewee_uid, //to replace with seller name
                            Rating: parseFloat(this.ratingValue),
                            Description:this.description,
                            ReviewerName: this.reviewer_name,
                            RevieweeName: this.reviewee_name
                        }
                    )
                
                    this.updateReviewStatus()
                    alert("Review added successfully")
                    this.$router.push({name: 'Deals'})
                } catch(error) {
                    alert("Unsuccessful operation, error:" + error)
                };
            },
            // function to update the status of offers in the Offers database in firestore
            async updateReviewStatus() {
                if (this.is_buyer) {
                    const queryRef = query(collection(db, "Offers"), where("ListingID", "==", this.listing_uid), where("BuyerID", "==", this.reviewer_uid), where("SellerID", "==", this.reviewee_uid))
                    const querySnapshot = await getDocs(queryRef);
                    
                    querySnapshot.forEach(function(doc) {
                        let dataRef = doc.data();
                        if (dataRef.isSellerReviewed) {
                            updateDoc(doc.ref, {
                                isBuyerReviewed: true,
                                Status: "Reviewed"
                            })
                        } else {
                            updateDoc(doc.ref, {
                                isBuyerReviewed: true
                            })
                        }
                    })

                } else {
                    const queryRef = query(collection(db, "Offers"), where("ListingID", "==", this.listing_uid), where("SellerID", "==", this.reviewer_uid), where("BuyerID", "==", this.reviewee_uid))
                    const querySnapshot = await getDocs(queryRef);
                    console.log(querySnapshot.docs)
                    
                    querySnapshot.forEach(function(doc) {
                        let dataRef = doc.data();
                        console.log(dataRef)
                        if (dataRef.isBuyerReviewed) {
                            updateDoc(doc.ref, {
                                isSellerReviewed: true,
                                Status: "Reviewed"
                            })
                        } else {
                            updateDoc(doc.ref, {
                                isSellerReviewed: true
                            })
                        }
                    })
                }
            },
            backToHome() {
                this.$router.push({name: "Deals"})
            }
        }
    }
</script>

<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css);

*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html,body{
	width: 100%;
	height: 100%;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

body{
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.ratingContainer{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.rating-wrap{
	max-width: 480px;
	margin: auto;
	padding: 15px;
	box-shadow: 0 0 3px 0 rgba(0,0,0,.2);
	text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.rating-wrap h2{
	
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.center{
	width: 162px; 
	margin: auto;
}


#rating-value{	
	width: 110px;
	margin: 40px auto 0;
	padding: 10px 5px;
	text-align: center;
	box-shadow: inset 0 0 2px 1px rgba(46,204,113,.2);
}

/*styling star rating*/
.rating{
	border: none;
	float: left;
}

.rating > input{
	display: none;
}

.rating > label:before{
	content: '\f005';
	font-family: FontAwesome;
	margin: 5px;
	font-size: 1.5rem;
	display: inline-block;
	cursor: pointer;
}

.rating > .half:before{
	content: '\f089';
	position: absolute;
	cursor: pointer;
}


.rating > label{
	color: #ddd;
	float: right;
	cursor: pointer;
}

.rating > input:checked ~ label,
.rating:not(:checked) > label:hover, 
.rating:not(:checked) > label:hover ~ label{
	color: #2ce679;
}

.rating > input:checked + label:hover,
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label,
.rating > input:checked ~ label:hover ~ label{
	color: #2ddc76;
}
#submitbutton {
  background-color: #60cbb8; /* Green */
  border: 2px solid #60cbb8; /* Green */
  border-radius: 25px;
  color: white;
  padding: 10px 32px;
  margin-left: 35px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#submitbutton:hover {
  background-color: 359138; /* Green */
  color: black;
  border: 2px solid #60cbb8; /* Green */
}

#cancelbutton {
  background-color: white; 
  border: 1px solid red; /* Green */
  border-radius: 25px;
  color: red;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#cancelbutton:hover {
  background-color:red; /* Green */
  color: black;
}

input[type=text], input[type=number] {
  padding: 12px 20px;
  margin: 1px 0;
  display:inline-flexbox;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 16px;
  width: 30%;
  height: 10%;
  text-align: left;
}

input[type=file]{
  width: 100%;
  margin-top: 3vh;
}

#ReviewInput {
    width: 40vw;
    height: 200px;
}

#LeaveReviewheader h1 {
    margin-top: 8vh;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#container {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>