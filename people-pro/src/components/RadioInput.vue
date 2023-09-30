<template>
    <label :for="divId">{{ label }}</label>
    <div v-for="option in options" :key="option" class="form-group form-check" :id="divId">
        <label :for="option"> {{ option }} </label>
        <input class="form-check-input" type="radio" v-model="selectedOption" :value="option" :id="option"
            @change="selectOption(option)">
    </div>
    <div v-for="(error, index) of vuelidate" :key="index">
        <div :class="['submitError']">{{ error.$message }}</div>
    </div>
</template>

<script>
export default {
    name: 'RadioInput',
    props: {
        options: {
            type: Array,
            required: true
        },
        modelValue: {
            type: String,
        },
        vuelidate: Object,
        label: String,
        divId: String
    },
    data() {
        return {
            selectedOption: this.modelValue,
        };
    },
    methods: {
        selectOption(option) {
            this.selectedOption = option;
            this.$emit('update:modelValue', this.selectedOption)
        }
    }
}
</script>
