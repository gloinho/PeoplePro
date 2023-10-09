<template>
    <div :class="cols" style="padding: 0 2% 2% 0">
        <label :for="inputId">{{ label }}</label>
        <input
            :id="inputId"
            v-model="localValue"
            v-maska="bindedObject"
            :type="type"
            :class="[inputClass, { 'is-invalid': isInvalid }]"
            :data-maska="mask"
            @input="handleInput"
        />

        <div v-for="(error, index) of vuelidate" :key="index">
            <div class="submitError">{{ error.$message }}</div>
        </div>
    </div>
</template>

<script>
import { vMaska as maska } from 'maska';
export default {
    name: 'InputGeneric',
    directives: {
        maska,
    },
    props: {
        label: String,
        type: String,
        inputClass: String,
        inputId: String,
        modelValue: { type: [String, Number], default: '' },
        cols: String,
        mask: String,
        vuelidate: Array,
    },
    data() {
        return {
            localValue: '',
            bindedObject: {
                masked: '',
                unmasked: '',
                completed: false,
            },
        };
    },
    computed:{
        isInvalid(){
            return this.vuelidate ? this.vuelidate.length > 0 : false
        }
    },
    methods: {
        handleInput() {
            this.$emit('update:modelValue', this.bindedObject.unmasked);
        },
    }
};
</script>
