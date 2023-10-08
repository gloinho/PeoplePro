<template>
    <div class="container">
        <form>
            <div class="row border border-primary">
                <InputGeneric
                    v-model="novoTipo"
                    cols="form-group col-10"
                    label="Tipo de Equipamento"
                    type="text"
                    input-class="form-control"
                    input-id="tipo"
                    :vuelidate="v$.novoTipo.$errors"
                />

                <div class="form-group col-1">
                    <button
                        class="btn btn-primary mt-4"
                        @click.prevent="adicionarTipo"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import InputGeneric from '../../components/InputGeneric.vue';
import tipoEquipamentoValidator from './validators/tipo-equipamento.validator';

export default {
    name: 'CadastrarTipoDeEquipamento',
    components: {
        InputGeneric,
    },
    props: {
        tipos: Array,
    },

    setup() {
        return { v$: useVuelidate() };
    },

    data() {
        return {
            novoTipo: '',
        };
    },

    beforeUnmount() {
        const element = document.getElementById('tipo');
        element.value = '';
    },

    methods: {
        adicionarTipo() {
            this.v$.$validate().then((isValid) => {
                if (isValid) {
                    this.$emit('adicionarTipo', {
                        label: this.novoTipo,
                        value: this.novoTipo.toLowerCase(),
                    });
                }
            });
        },
    },
    validations() {
        return {
            novoTipo: tipoEquipamentoValidator(this.tipos),
        };
    },
};
</script>
<style scoped>
.border {
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 20px;
}
</style>
