<template>
    <div :class="cols" style="padding: 0 2% 2% 0">
        <label :for="inputId">{{ label }}</label>
        <input
            :id="inputId"
            v-model="localValue"
            :type="type"
            :class="[inputClass, { 'is-invalid': !isValid }]"
            :required="required"
            @input="emitValue"
        />
        <div v-if="!isValid" class="invalid-feedback">
            O campo {{ label }} é inválido.
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        label: String,
        type: String,
        inputClass: String,
        inputId: String,
        model: [String, Number],
        validator: Function,
        required: Boolean,
        isInvalid: Boolean,
        cols: String,
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
    mounted() {
        this.localValue = this.model;
    },
    methods: {
        emitValue() {
            this.$emit('input', this.localValue);
        },
    },
};
</script>
