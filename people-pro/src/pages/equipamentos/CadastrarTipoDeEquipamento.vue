<template>
    <div class="container">
        <form>
            <div class="row border border-primary">
                <h4>Adicionar tipo de equipamento</h4>
                <RadioInput
                    v-model="tipo"
                    cols="form-group col-auto"
                    label="Tipo de Equipamento"
                    type="text"
                    input-class="form-control"
                    input-id="tipo"
                    :vuelidate="v$.tipo.$errors"
                />

                <div class="form-group col-auto">
                    <button
                        class="btn btn-primary mt-4"
                        @click.prevent="adicionarTipo"
                    >
                        Adicionar
                    </button>
                </div>

                <h4>Caracteristicas</h4>
                <!-- As caracteristicas podem ser opcionais -->
                <div class="form-group col-auto">
                    <button class="btn btn-primary mt-4" @click.prevent>
                        Adicionar Sistema Operacional
                    </button>
                </div>
                <div class="form-group col-auto">
                    <button class="btn btn-primary mt-4" @click.prevent>
                        Adicionar GPU
                    </button>
                </div>
                <div class="form-group col-auto">
                    <button class="btn btn-primary mt-4" @click.prevent>
                        Adicionar Armazenamento
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import RadioInput from '../../components/RadioInput.vue';
const checkType = (param) => (value) =>
    !param.some((item) => item.value === value.toLowerCase());
export default {
    name: 'CadastrarTipoDeEquipamento',
    components: {
        RadioInput,
    },
    props: {
        tipos: Array,
    },
    setup() {
        return { v$: useVuelidate() };
    },
    data() {
        return {
            tipo: '',
            osDisponivel: [],
            armazenamento: [],
            gpu: '',
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
                        label: this.tipo,
                        value: this.tipo.toLocaleLowerCase(),
                    });
                }
            });
        },
    },
    validations() {
        return {
            tipo: {
                isValid: helpers.withMessage(
                    'Tipo já existente.',
                    checkType(this.tipos)
                ),
                required: helpers.withMessage(
                    'Preencha o nome do tipo',
                    required
                ),
            },
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
