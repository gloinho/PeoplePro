<template>
    <div class="container">
        <h1>Cadastro de Equipamentos</h1>
        <form>
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
            <InputField label="Marca" type="text" input-class="form-control" input-id="marca-equipamento"
                :v-model="equipamento.marca" />

            <div class="form-group">
                <label for="serial-equipamento">Serial</label>
                <input class="form-control" type="text" id="serial-equipamento" v-model="equipamento.serial" />
                <div v-for="(error, index) of v$.equipamento.serial.$errors" :key="index">
                    <div :class="['submitError']">{{ error.$message }}</div>
                </div>
            </div>

            <div class="form-group">
                <label for="descricao-equipamento">Descricao</label>
                <input class="form-control" type="text" id="descricao-equipamento" v-model="equipamento.descricao" />
            </div>

            <div class="form-group">
                <label for="data-compra-equipamento">Data de Compra</label>
                <input class="form-control" type="date" id="data-compra-equipamento" v-model="equipamento.dataDeCompra" />
            </div>

            <div class="form-group">
                <label for="ultima-atualizacao-equipamento">Ultima Atualização</label>
                <input class="form-control" type="date" id="ultima-atualizacao-equipamento"
                    v-model="equipamento.ultimaAtualizacao" />
            </div>

            <div class="form-group">
                <label for="capacidade">Capacidade de Armazenamento(Gb)</label>
                <input class="form-control" type="number" v-model="equipamento.caracteristicas.armazenamento.capacidade">
                <div v-for="(error, index) of v$.equipamento.caracteristicas.armazenamento.capacidade.$errors" :key="index">
                    <div :class="['submitError']">{{ error.$message }}</div>
                </div>
            </div>

            <!-- Caracteristicas dos Equipamentos: condicionais dependendo do tipo de equipamento escolhido. -->
            <div v-if="equipamento.tipoEquipamento === 'Desktop' || equipamento.tipoEquipamento === 'Notebook'">

                <label for="armazenamento">Tipo de Armazenamento</label>
                <div v-for="arm in details.armazenamento.tipo" :key="arm" class="form-check" id="armazenamento">
                    <label :for="arm">{{ arm }}</label>
                    <input class="form-check-input" type="radio" :value="arm" :id="arm"
                        v-model="equipamento.caracteristicas.armazenamento.tipo">
                </div>
                <div v-for="(error, index) of v$.equipamento.caracteristicas.armazenamento.tipo.$errors" :key="index">
                    <div :class="['submitError']">{{ error.$message }}</div>
                </div>

                <label for="equipamento-os">Sistema Operacional</label>
                <div v-for="os in details.os.pc" :key="os" class="form-check" id="equipamento-os">
                    <label :for="os">{{ os }}</label>
                    <input class="form-check-input" type="radio" :value="os" :id="os"
                        v-model="equipamento.caracteristicas.os">
                </div>
                <div v-for="(error, index) of v$.equipamento.caracteristicas.os.$errors" :key="index">
                    <div :class="['submitError']">{{ error.$message }}</div>
                </div>
            </div>

            <div v-else-if="equipamento.tipoEquipamento === 'Celular'">
                <label for="equipamento-os">Sistema Operacional</label>
                <div v-for="os in details.os.mobile" :key="os" class="form-check" id="equipamento-os">
                    <label :for="os">{{ os }}</label>
                    <input class="form-check-input" type="radio" :value="os" :id="os"
                        v-model="equipamento.caracteristicas.os">
                </div>
                <div v-for="(error, index) of v$.equipamento.caracteristicas.os.$errors" :key="index">
                    <div :class="['submitError']">{{ error.$message }}</div>
                </div>
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

export default {
    components: {
        CadastrarTipoDeEquipamento,
        InputField
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
            console.log(this.equipamento.marca)

            // if (this.$v.equipamento.$pending || this.$v.equipamento.$error) return;
            // this.v$.$validate()
            //     .then(isValid => {
            //         if (!isValid) {
            //             console.log(this.v$.$errors)
            //         }
            //         else {
            //             console.log('Equipamento Cadastrado:', this.equipamento)
            //             this.equipamentosDisponiveis.push(this.equipamento);
            //             console.log(this.equipamentosDisponiveis)
            //         }
            //     });
        },
        async adicionarTipo(tipo) {
            this.showCadastrarTipo = !this.showCadastrarTipo;
            this.details.tipos.push(tipo)
        },
        handleInput(v) {
            console.log(v)
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
