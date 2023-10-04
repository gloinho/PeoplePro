<template>
    <div :class="cols" style="padding: 0 2% 2% 0">
        <label :for="inputId">{{ label }}</label>
        <input
            :id="inputId"
            v-model="localValue"
            v-maska="bindedObject"
            :type="type"
            :class="[inputClass, { 'is-invalid': !isValid }]"
            :required="required"
            :data-maska="mask"
            @input="handleInput"
        />
        <div v-if="!isValid" class="invalid-feedback">
            O campo {{ label }} é inválido.
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
        validator: Function,
        required: Boolean,
        isInvalid: Boolean,
        cols: String,
        mask: String,
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
    computed: {
        isValid() {
            return this.validator ? this.validator(this.localValue) : true;
        },
    },
    methods: {
        handleInput() {
            // Valor mascarado é enviado para o pai
            // this.$emit('update:modelValue', evt.target.value);

            // Valor sem máscara é enviado para o pai
            this.$emit('update:modelValue', this.bindedObject.unmasked);
        },
    },
};
</script>
