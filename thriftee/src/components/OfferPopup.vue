<template>
    <div class="offer-popup" v-if="isOpen">
        <div id="content">
            <h2 id="popup_title">You are offering</h2>
            <form id="offerform" @submit.prevent="sendOffer">
                <label for="offerAmount" style="color:black; margin-right:1vh">$</label>
                <input type="number" id="offerAmount" v-model="offerAmount" min="0" step="0.01" required>
                <div id="popup_buttons">
                    <button id="cancelButton" @click="close">Cancel</button>
                    <button id="offerButton" type="submit">Submit </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: "OfferPopup",
    
    props: {
        isOpen: {
            type: Boolean,
            default: true
        },

        defaultAmount: {
            type: Number,
            default: 0
        }


    },

    data() {
        return {
            offerAmount: this.defaultAmount
        }
    },

    methods: {
        sendOffer() {
            this.$emit('send-offer', this.offerAmount)
            this.close()
        },

        close() {
            this.$emit("close")
        }
    }


}

</script>

<style scoped>
.offer-popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(135, 128, 128, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}


#content{
    background-color: rgba(243, 242, 242, 0.954);
    padding: 30px 50px;
    border-radius: 10px;
    color: white;
    border: 3px solid rgb(201, 199, 199);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#popup_buttons{
    margin-top: 2vh;
    text-align: center;
    display: flex;
    justify-content: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#popup_title{
    text-align: center;
    color: rgb(48, 48, 48);
    font-size: 1.8em;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    
}

#cancelButton{
    margin-right: 1vw;
    border: none;
    border-radius: 8px;
    font-size: 0.9em;
    background-color: rgba(185, 189, 189, 0.872);
    font-weight: normal;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#cancelButton:hover{
    background-color: rgb(147, 149, 149);
    color:white;
}

#offerButton{
    background-color: #46c3bfd6;
    color: black;
    border:none;
    border-radius: 8px;
    font-size: 0.9em;
    font-weight: normal;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#offerButton:hover{
    background-color: #32a5a1d6;
    color:white;
}

input, select {
box-sizing: border-box;
height: 40px;
background: transparent;
border: none;
border-bottom: 1px solid #a49e9e;
text-align: left;
}

::placeholder {
font-size: 1em;
color: rgb(73, 71, 71);
}
</style>