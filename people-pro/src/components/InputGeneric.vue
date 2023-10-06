<template>
    <div :class="cols" style="padding: 0 2% 2% 0">
        <label :for="inputId">{{ label }}</label>
        <input
            :id="inputId"
            v-model="localValue"
            :type="type"
            :class="[inputClass, { 'is-invalid': isInvalid }]"
            @input="handleInput"
        />

        <div v-for="(error, index) of vuelidate" :key="index">
            <div class="submitError">{{ error.$message }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputGeneric',
    props: {
        label: String,
        type: String,
        inputClass: String,
        inputId: String,
        modelValue: { type: [String, Number], default: '' },
        cols: String,
        vuelidate: Array,
    },
    data() {
        return {
            localValue: '',
        };
    },
    computed:{
        isInvalid(){
            return this.vuelidate ? this.vuelidate.length > 0 : false
        }
    },
    methods: {
        handleInput(evt) {
            this.$emit('update:modelValue', evt.target.value);
        },
    }
};
</script>
