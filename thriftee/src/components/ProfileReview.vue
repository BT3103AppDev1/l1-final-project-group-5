<template>

    <div id = "container">
        <h1>Profile Review Page</h1>
        <div id = "profiledetails">
            <img src="default.png" alt="Profile Photo">
            <div id = "contentofprofile">
                <h1 id = "profilename"> John Doe </h1>
                
                <div class="rate">
                    <p class="mt-2">Rating: {{ value }}/5</p>
                </div>
            
                <div class="Location">
                    <p class="mt-3">Meet up Location: {{ location }}</p>
                </div>
            </div>
            
        </div>
        
        <div id="linebreak">
            <hr>
        </div>
    
    <div id = "container2">
        <h1>Reviews placeholder </h1>
  
    </div>
    </div>
    
</template>
    
<script>
  export default {
    data() {
      return {
        value: 4,
        location: "Clementi"
      }
    },
}
</script>

    
<style scoped>
    .mt-2{
        font-size: x-large;
    }
    .mt-3{
        font-size: x-large;
    }

    #profiledetails {
        margin-top: 5vh;
        display: flex;
        background-color: rgb(246, 241, 241);
        height: 30vh;
        border-radius: 25px;
        border: 2px solid rgb(155, 150, 150);
        
    }
    
    #linebreak{
        margin-top: 5vh;
    }
    
    hr {
        height: 1px;
        width: 30vw;
        background-color: black;
    }
    
    #contentofprofile {
        display: block;
        margin-left: 5vw;
        padding: 10px 40px 28px 5px;
    }

    img {
        width: 240px;
        height: auto;
        margin-left: 2vw;
    }
    
</style>