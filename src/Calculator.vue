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
            <tr>
                <td>
                    <input type="button" class="signs" value="/" @click="func('/')" />
                </td>
            </tr>
        </table>
        <transition name="fade">
            <div v-if="showMessage" class="fireworks-container">
                <div class="firework" v-for="(firework, index) in fireworks" :key="index">
                    <div class="sparkle" :class="`sparkle-${index}`" :style="{ backgroundColor: colors[index] }"></div>
                </div>
                <p class="exit-message">{{ message }}</p>
            </div>
        </transition>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Calculator',
    data() {
        return {
            flag: true,
            showMessage: false,
            message: 'Thank you for using this calculator application!',
            fireworks: [],
            colors: []
        }
    },
    methods: {
        func(str) {
            try {
                const t = document.getElementById("t")
                if (!t) {
                    console.error('Input element not found!')
                    return
                }

                if (this.flag) {
                    t.value = ''
                    this.flag = false
                }

                const oldValue = t.value
                console.log('Old value:', oldValue)

                const newValue = oldValue + str
                console.log('New value:', newValue)

                t.value = newValue
                console.log('Input value updated:', t.value)
            } catch (e) {
                console.error('Error in func method:', e)
            }
        },

        backspace() {
            const t = document.getElementById("t")
            t.value = t.value.substr(0, t.value.length - 1)
        },

        AC() {
            const t = document.getElementById("t")
            t.value = "0"
            this.flag = true
        },

        equals() {
            const t = document.getElementById("t")
            try {
                console.log('Expression to evaluate:', t.value)
                const result = eval(t.value)
                console.log('Evaluation result:', result)
                if (typeof result === 'number' && !isNaN(result)) {
                    t.value = result
                } else {
                    t.value = "Error"
                }
            } catch (e) {
                console.error('Evaluation error:', e)
                t.value = "Error"
            }
        },

        exit() {
            this.showMessage = true
            this.fireworks = Array.from({ length: 50 }, (_, i) => i)
            this.colors = Array.from({ length: 50 }, () => this.getRandomColor())
            setTimeout(() => {
                this.closePage()
            }, 4000)
        },

        getRandomColor() {
            const letters = '0123456789ABCDEF'
            let color = '#'
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)]
            }
            return color
        },

        closePage() {
            if (window.opener && window.opener !== window) {
                window.close()
            } else {
                if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1) {
                    window.close()
                } else {
                    window.opener = null
                    window.open('', '_self')
                    window.close()
                }
            }
        }
    }
})
</script>

<style scoped>
@import "./Calculator.css";
</style>
