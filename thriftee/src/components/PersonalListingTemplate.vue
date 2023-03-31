<template>
    <div id = "container">
        
       
        <div id = "containerleft">
        <div id = "back">
            <button id = "backbutton" type="button" >←</button> 
        </div>

           <div id="top">
                <h4><em>Bottom</em></h4> 
            </div>
            <h1> Levi's Jeans</h1>
            <h3><em>$30.00</em></h3>
            <p> Category: Bottoms</p>
            <p> Colour: Blue</p>
            <p> Condition: Like new</p>
            <p> Size: M</p>
            <p> Description: Lightly worn, bought around 3 months ago</p>

            <div id = "buttonsupdate">
                <button id = "editbutton" type="button">Edit Listing</button> 
                <button id = "deletebutton" type="button" v-on:click="saveProfile">Delete Listing</button> 
            </div>
        </div>

        <div id = "containerright">
         <img src="listingdefault.jpeg" alt="listing picture">
     </div>
    </div>
  
 </template>
 
 <script>
    
 </script>
 
 
 <style scoped>

 

#backbutton {
    background: transparent;
    border: none;
    font-size: 1.9em;
    font-weight: bolder;
    color: black;
 }


 #backbutton:hover {
    background: transparent;
    border: none;
    font-size: 1.9em;
    color: grey;
    border-bottom: 0.8px solid #252323;
    
 }

#container{
    display:flex;
    justify-content: center;
    text-align: left;
    line-height: 3vh;
    width: 100vw;
}

#containerleft {
    margin-top: 5vh;
    flex: 0.4;
}

#containerright {
    margin-top: 9vh;
    flex: 0.3;
}

#containerleft p{
    font-weight: normal;
    font-size: 0.95em;
}

#top {
    margin-bottom: 8vh;
    color:rgb(151, 154, 154);
}

#buttonsupdate {
    margin-top: 5vh;
}

#editbutton {
background-color: #5abcaa; /* Green */
border: 2px solid #5abcaa; /* Green */
border-radius: 5px;
color: rgb(249, 249, 249);
padding: 10px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
font-style: italic;
transition-duration: 0.2s;
}

#editbutton:hover {
background-color: #198b77; /* Green */
color: rgb(21, 20, 20);
border: 2px solid #198b77; /* Green */
}

#deletebutton {
background-color: #c33623; /* Green */
border: 2px solid #c33623; /* Green */
border-radius: 5px;
color: rgb(249, 249, 249);
padding: 10px 32px;
margin-left: 35px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
font-style: italic;
transition-duration: 0.2s;
}

#deletebutton:hover {
background-color: #a93627; /* Green */
color: rgb(8, 7, 7);
border: 2px solid #a93627; /* Green */
}

img {
    width: 70%;
    height: auto;
}

 
 </style>