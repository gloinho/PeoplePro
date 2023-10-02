<template>
    <div :class="cols" style="padding: 0 2% 2% 0">
        <label :for="inputId">{{ label }}</label>
        <input
            :id="inputId"
            v-model="localValue"
            :type="type"
            :class="[inputClass, { 'is-invalid': !isValid }]"
            :required="required"
            @input="handleInput"
        />
        <div v-if="!isValid" class="invalid-feedback">
            O campo {{ label }} é inválido.
        </div>

        <div v-for="(error, index) of vuelidate" :key="index">
            <div :class="['submitError']">{{ error.$message }}</div>
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
        validator: Function,
        required: Boolean,
        isInvalid: Boolean,
        cols: String,
        vuelidate: Object,
    },
    data() {
        return {
            localValue: '',
        };
    },
    computed: {
        isValid() {
            return this.validator ? this.validator(this.localValue) : true;
        },
    },
    methods: {
        handleInput(evt) {
            this.$emit('update:modelValue', evt.target.value);
        },
    },
};
</script>
