<template>
    <div class="container">
        <h1>Cadastro de Equipamentos</h1>
        <form>
            <InputField label="Marca" type="text" input-class="form-control" input-id="marca-equipamento"
                v-model="equipamento.marca" :vuelidate="v$.equipamento.marca.$errors" />

            <InputField label="Serial" type="text" input-class="form-control" input-id="serial-equipamento"
                v-model="equipamento.serial" :vuelidate="v$.equipamento.serial.$errors" />

            <InputField label="Descricao" type="text" input-class="form-control" input-id="descricao-equipamento"
                v-model="equipamento.descricao" />

            <InputField label="Data de Compra" type="date" input-class="form-control" input-id="data-compra-equipamento"
                v-model="equipamento.dataDeCompra" />

            <InputField label="Ultima Atualização" type="date" input-class="form-control"
                input-id="ultima-atualizacao-equipamento" v-model="equipamento.ultimaAtualizacao" />

            <InputField label="Capacidade de Armazenamento(Gb)" type="number" input-class="form-control"
                input-id="ultima-atualizacao-equipamento" v-model="equipamento.caracteristicas.armazenamento.capacidade"
                :vuelidate="v$.equipamento.caracteristicas.armazenamento.capacidade.$errors" />

            <div class="row">
                <div class="form-group col-auto">
                    <label for="tipo-equipamento">Tipos Disponíveis</label>
                    <select class="form-select" id="tipo-equipamento" v-model="v$.equipamento.tipoEquipamento.$model">
                        <option v-for="tipo in details.tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
                    </select>
                    <div v-for="(error, index) of v$.equipamento.tipoEquipamento.$errors" :key="index">
                        <div :class="['submitError']">{{ error.$message }}</div>
                    </div>
                </div>
                <div class="form-group col-auto">
                    <button class="btn btn-primary mt-4"
                        @click.prevent="this.showCadastrarTipo = !this.showCadastrarTipo">+</button>
                </div>
                <CadastrarTipoDeEquipamento v-if="showCadastrarTipo" :tipos="details.tipos" @novo-tipo="adicionarTipo" />
            </div>
            <!-- Caracteristicas dos Equipamentos: condicionais dependendo do tipo de equipamento escolhido. -->
            <div v-if="equipamento.tipoEquipamento === 'Desktop' || equipamento.tipoEquipamento === 'Notebook'">

                <RadioInput :options="details.armazenamento.tipo" v-model="equipamento.caracteristicas.armazenamento.tipo"
                    :vuelidate="v$.equipamento.caracteristicas.armazenamento.tipo.$errors" label="Tipo de Armazenamento"
                    div-id="tipo-armazenamento" />

                <RadioInput :options="details.os.pc" v-model="equipamento.caracteristicas.os"
                    :vuelidate="v$.equipamento.caracteristicas.os.$errors" label="Sistema Operacional"
                    div-id="equipamento-os" />

            </div>

            <div v-else-if="equipamento.tipoEquipamento === 'Celular'">
                <RadioInput :options="details.os.mobile" v-model="equipamento.caracteristicas.os"
                    :vuelidate="v$.equipamento.caracteristicas.os.$errors" label="Sistema Operacional"
                    div-id="equipamento-os" />
            </div>

            <button type="submit" class="btn btn-primary" @click.prevent="cadastrarEquipamento">Cadastrar</button>
        </form>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, requiredIf, helpers } from '@vuelidate/validators'
import CadastrarTipoDeEquipamento from './CadastrarTipoDeEquipamento.vue'
import InputField from '../InputField.vue'
import RadioInput from '../RadioInput.vue'

export default {
    components: {
        CadastrarTipoDeEquipamento,
        InputField,
        RadioInput
    },
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            equipamento: {
                tipoEquipamento: '',
                marca: '',
                serial: '',
                descricao: '',
                dataDeCompra: '',
                ultimaAtualizacao: '',
                caracteristicas: {
                    ram: '',
                    armazenamento: { tipo: '', capacidade: 0 },
                    os: '',
                    gpu: ''
                },
            },
            details: {
                tipos: ['Celular', 'Desktop', 'Notebook'],
                os: {
                    pc: ["Windows", "Linux", "macOS"],
                    mobile: ["iOS", "Android"]
                },
                armazenamento: {
                    tipo: ['HD', 'SSD'],
                    capacidade: 0
                },
                gpu: ''
            },
            equipamentosDisponiveis: [],
            showCadastrarTipo: false,
        }
    },

    methods: {
        cadastrarEquipamento() {
            console.log(this.equipamento)
            this.v$.$validate()
                .then(isValid => {
                    if (!isValid) {
                        console.log(this.v$.$errors)
                    }
                    else {
                        console.log('Equipamento Cadastrado:', this.equipamento)
                        this.equipamentosDisponiveis.push(this.equipamento);
                        console.log(this.equipamentosDisponiveis)
                    }
                });
        },

        async adicionarTipo(tipo) {
            this.showCadastrarTipo = !this.showCadastrarTipo;
            this.details.tipos.push(tipo)
        }
    },

    validations() {
        return {
            equipamento: {
                tipoEquipamento: {
                    required: helpers.withMessage("Selecione um tipo de equipamento", required)
                },
                marca: { required: helpers.withMessage("Equipamento precisa ter uma marca", required) },
                serial: { required: helpers.withMessage("Equipamento precisa ter um número de serial.", required) },
                caracteristicas: {
                    armazenamento: {
                        tipo: { requiredIf: helpers.withMessage("Selecione um tipo de armazenamento", requiredIf(this.equipamento.tipoEquipamento != 'Celular')) },
                        capacidade: { minValue: helpers.withMessage("A capacidade mínima deve ser de 32.", minValue(32)) }
                    },
                    os: { required: helpers.withMessage("Selecione um sistema operacional.", required) },
                }
            },
        }
    }
}
</script>
