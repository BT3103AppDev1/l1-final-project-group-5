
<template>
    <div id = "container">
        <div id = "Reviewheader">
            <h1>Review Page</h1><br><br>
        </div>
        <div id = "LeaveReviewheader">
            <h1>Leave a Review</h1>
        </div><br>

        <div class="ratingContainer">
            <div class="rating-wrap">
                <h2>Star Rating</h2>
                <div class="center">
                    <fieldset class="rating">
                        <input type="radio" id="star5" name="rating" value="5" v-model="ratingValue">
                        <label for="star5" class="full" title="Awesome"></label>
                        <input type="radio" id="star4.5" name="rating" value="4.5" v-model="ratingValue">
                        <label for="star4.5" class="half"></label>
                        <input type="radio" id="star4" name="rating" value="4" v-model="ratingValue">
                        <label for="star4" class="full"></label>
                        <input type="radio" id="star3.5" name="rating" value="3.5" v-model="ratingValue">
                        <label for="star3.5" class="half"></label>
                        <input type="radio" id="star3" name="rating" value="3" v-model="ratingValue">
                        <label for="star3" class="full"></label>
                        <input type="radio" id="star2.5" name="rating" value="2.5" v-model="ratingValue">
                        <label for="star2.5" class="half"></label>
                        <input type="radio" id="star2" name="rating" value="2" v-model="ratingValue">
                        <label for="star2" class="full"></label>
                        <input type="radio" id="star1.5" name="rating" value="1.5" v-model="ratingValue">
                        <label for="star1.5" class="half"></label>
                        <input type="radio" id="star1" name="rating" value="1" v-model="ratingValue">
                        <label for="star1" class="full"></label>
                        <input type="radio" id="star0.5" name="rating" value="0.5" v-model="ratingValue">
                        <label for="star0.5" class="half"></label>
                        
                        <div id ="ratingText">Rating: {{ ratingValue }} out of 5</div>
                    </fieldset>
                </div>

            </div>
        </div><br>

        <div id = "LeaveReviewLable">
            <input type = "text" id = "ReviewInput" placeholder = "Leave a Review" ><br><br>
        </div>

        <div id = "reviewButtons">
            <button id = "cancelbutton" type="button" v-on:click="backToHome">Cancel</button> 
            <button id = "submitbutton" type="button" v-on:click="saveProfile">Submit</button> 
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ratingValue: 0
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
}

body{
	font-family: Arial, sans-serif;
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
    width: 50%;
    height: 300px;
}

</style>