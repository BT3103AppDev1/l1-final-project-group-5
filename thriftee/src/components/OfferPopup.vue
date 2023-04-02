<template>
    <div class="offer-popup" v-if="isOpen">
        <div id="content">
            <h2 id="popup_title">Make Offer</h2>
            <form id="offerform" @submit.prevent="sendOffer">
                <label for="offerAmount">Offer Amount</label>
                <input type="number" id="offerAmount" v-model="offerAmount" min="0" step="0.1" required>
                <div id="popup_buttons">
                    <button id="cancelButton" @click="close">Cancel</button>
                    <button id="offerButton" type="submit">Send Offer</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>