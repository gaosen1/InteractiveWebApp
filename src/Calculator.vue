
<template>
    <div>
        <table cellpadding="0" cellspacing="0" border="2px" align="center" v-if="!showMessage">
            <tr>
                <td colspan="4">
                    <button @click="exit" class="exit-button">Exit</button>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <input type="text" value="0" id="t" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="number" value="7" @click="func('7')" />
                </td>
                <td>
                    <input type="button" class="number" value="8" @click="func('8')" />
                </td>
                <td>
                    <input type="button" class="number" value="9" @click="func('9')" />
                </td>
                <td>
                    <input type="button" class="signs" value="%" @click="func('%')" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="number" value="4" @click="func('4')" />
                </td>
                <td>
                    <input type="button" class="number" value="5" @click="func('5')" />
                </td>
                <td>
                    <input type="button" class="number" value="6" @click="func('6')" />
                </td>
                <td>
                    <input type="button" class="signs" value="*" @click="func('*')" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="number" value="1" @click="func('1')" />
                </td>
                <td>
                    <input type="button" class="number" value="2" @click="func('2')" />
                </td>
                <td>
                    <input type="button" class="number" value="3" @click="func('3')" />
                </td>
                <td>
                    <input type="button" class="signs" value="-" @click="func('-')" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="number" value="0" @click="func('0')" />
                </td>
                <td>
                    <input type="button" class="symbol" value="." @click="func('.')" />
                </td>
                <td>
                    <input type="button" class="number" value="00" @click="func('00')" />
                </td>
                <td>
                    <input type="button" class="signs" value="+" @click="func('+')" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="button" class="brackets" value="(" @click="func('(')" />

                    <input type="button" class="brackets" value=")" @click="func(')')" />
                </td>
                <td>
                    <input type="button" class="symbol" value="Del" style="float: top" @click="backspace()" />
                </td>
                <td>
                    <input type="button" class="symbol" value="Clear" @click="AC()" />
                </td>
                <td rowspan="2">
                    <input type="button" value="=" class="equal" @click="equals()" />
                </td>
            </tr>
        </table>
         <!--Transition animation for showing and hiding the fireworks container-->
        <transition name="fade">
            <!-- Display the fireworks container when showMessage is true -->
            <div v-if="showMessage" class="fireworks-container">
                <!-- Loop through each firework and display it with a unique sparkle style -->
                <div class="firework" v-for="(firework, index) in fireworks" :key="index">
                    <!-- Display a sparkle with a background color based on the colors array -->
                    <div class="sparkle" :class="`sparkle-${index}`" :style="{ backgroundColor: colors[index] }"></div>
                </div>
                <!-- Display the exit message -->
                <p class="exit-message">{{ message }}</p>
            </div>
        </transition>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    let flag = ref(true);

    const showMessage = ref(false);
    const message = 'Thank you for using this calculator application!';
    const fireworks = ref([]);
    const colors = ref([]);

    // Appends a character to the text box.
    const func = (str) => {
        const t = document.getElementById("t");
        if (flag.value) { // If the flag is true, clear the text box first.
            t.value = '';
            flag.value = false; // Reset the flag.
        }
        t.value = t.value + str; // Append the character to the text box.
    };

    // Removes the last character from the text box.
    const backspace = () => {
        const t = document.getElementById("t");
        t.value = t.value.substr(0, t.value.length - 1); // Remove the last character.
    };

    // Clears the text box and sets the flag.
    const AC = () => {
        const t = document.getElementById("t");
        t.value = "0"; // Set the text box value to "0".
        flag.value = true; // Set the flag to true.
    };

    // Evaluates the expression in the text box and displays the result.
    const equals = () => {
        const t = document.getElementById("t");
        t.value = eval(t.value); // Evaluate the expression using eval.
    };

    // Exits the application and shows a fireworks effect.
    const exit = () => {
        showMessage.value = true; // Show the message.
        fireworks.value = Array.from({ length: 50 }, (_, i) => i); // Initialize the fireworks array.
        colors.value = Array.from({ length: 50 }, () => getRandomColor()); // Generate an array of random colors.
        setTimeout(() => { // Delay the page closing.
            closePage();
        }, 4000); // Close after 4 seconds.
    };

    // Generates a random color.
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]; // Generate a random color.
        }
        return color;
    }

    // Closes the current window.
    const closePage = () => {
        if (window.opener && window.opener !== window) { // If there is an opener and it's not the same as the current window.
            window.close(); // Close the current window.
        } else {
            if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1) { // If it's Firefox or Chrome.
                window.close(); // Close the window directly.
            } else {
                window.opener = null; // Clear the opener property.
                window.open('', '_self'); // Open a blank page.
                window.close(); // Close the current window.
            }
        }
    }
</script>

<style scoped>
    @import "./Calculator.css";
</style>
