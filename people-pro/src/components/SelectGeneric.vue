<template>
    <div :class="cols" style="padding: 0 2% 2% 0">
        <label :for="inputId">{{ label }}</label>
        <select
            :id="inputId"
            :class="[inputClass]"
            :value="modelValue"
            @input="handleInput"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        options: Array,
        inputId: String,
        label: String,
        inputClass: String,
        modelValue: String,
        cols: String,
    },
    methods: {
        handleInput(evt) {
            this.$emit('update:modelValue', evt.target.value);
        },
    },
};
</script>
