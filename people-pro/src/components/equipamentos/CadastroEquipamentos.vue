<template>
    <div class="container">
        <h1>Cadastro de Equipamentos</h1>
        <form>
            <InputField
                v-model="equipamento.marca"
                label="Marca"
                type="text"
                input-class="form-control"
                input-id="marca-equipamento"
                :vuelidate="v$.equipamento.marca.$errors"
            />

            <InputField
                v-model="equipamento.serial"
                label="Serial"
                type="text"
                input-class="form-control"
                input-id="serial-equipamento"
                :vuelidate="v$.equipamento.serial.$errors"
            />

            <InputField
                v-model="equipamento.descricao"
                label="Descricao"
                type="text"
                input-class="form-control"
                input-id="descricao-equipamento"
            />

            <InputField
                v-model="equipamento.dataDeCompra"
                label="Data de Compra"
                type="date"
                input-class="form-control"
                input-id="data-compra-equipamento"
            />

            <InputField
                v-model="equipamento.ultimaAtualizacao"
                label="Ultima Atualização"
                type="date"
                input-class="form-control"
                input-id="ultima-atualizacao-equipamento"
            />

            <InputField
                v-model="equipamento.caracteristicas.armazenamento.capacidade"
                label="Capacidade de Armazenamento(Gb)"
                type="number"
                input-class="form-control"
                input-id="ultima-atualizacao-equipamento"
                :vuelidate="
                    v$.equipamento.caracteristicas.armazenamento.capacidade
                        .$errors
                "
            />

            <div class="row">
                <SelectGeneric
                    v-model="equipamento.tipoEquipamento"
                    :options="details.tipos"
                    cols="form-group col-auto"
                    input-id="tipo-equipamento"
                    label="Tipos Disponíveis"
                    input-class="form-select"
                    :vuelidate="v$.equipamento.tipoEquipamento.$errors"
                />

                <div class="form-group col-auto">
                    <button
                        class="btn btn-primary mt-4"
                        @click.prevent="showCadastrarTipo = !showCadastrarTipo"
                    >
                        +
                    </button>
                </div>

                <CadastrarTipoDeEquipamento
                    v-if="showCadastrarTipo"
                    :tipos="details.tipos"
                    @adicionar-tipo="adicionarTipo"
                />
            </div>
            <!-- Caracteristicas dos Equipamentos: condicionais dependendo do tipo de equipamento escolhido. -->
            <div
                v-if="
                    equipamento.tipoEquipamento === 'desktop' ||
                        equipamento.tipoEquipamento === 'notebook'
                "
            >
                <RadioInput
                    v-model="equipamento.caracteristicas.armazenamento.tipo"
                    :options="details.armazenamento.tipo"
                    :vuelidate="
                        v$.equipamento.caracteristicas.armazenamento.tipo
                            .$errors
                    "
                    label="Tipo de Armazenamento"
                    div-id="tipo-armazenamento"
                />

                <RadioInput
                    v-model="equipamento.caracteristicas.os"
                    :options="details.os.pc"
                    :vuelidate="v$.equipamento.caracteristicas.os.$errors"
                    label="Sistema Operacional"
                    div-id="equipamento-os"
                />

                <InputField
                    v-model="equipamento.caracteristicas.gpu"
                    label="GPU"
                    type="text"
                    input-class="form-control"
                    input-id="gpu"
                />
            </div>

            <div v-else-if="equipamento.tipoEquipamento === 'celular'">
                <RadioInput
                    v-model="equipamento.caracteristicas.os"
                    :options="details.os.mobile"
                    :vuelidate="v$.equipamento.caracteristicas.os.$errors"
                    label="Sistema Operacional"
                    div-id="equipamento-os"
                />
            </div>

            <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="cadastrarEquipamento"
            >
                Cadastrar
            </button>
        </form>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, requiredIf, helpers } from '@vuelidate/validators';
import CadastrarTipoDeEquipamento from './CadastrarTipoDeEquipamento.vue';
import InputField from '../InputField.vue';
import RadioInput from '../RadioInput.vue';
import SelectGeneric from '../SelectGeneric.vue';

export default {
    components: {
        CadastrarTipoDeEquipamento,
        InputField,
        RadioInput,
        SelectGeneric,
    },
    setup() {
        return { v$: useVuelidate() };
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
                    gpu: '',
                },
            },
            details: {
                tipos: [
                    { label: 'Celular', value: 'celular' },
                    { label: 'Desktop', value: 'desktop' },
                    { label: 'Notebook', value: 'notebook' },
                ],
                os: {
                    pc: ['Windows', 'Linux', 'macOS'],
                    mobile: ['iOS', 'Android'],
                },
                armazenamento: {
                    tipo: ['HD', 'SSD'],
                    capacidade: 0,
                },
                gpu: '',
            },
            equipamentosDisponiveis: [],
            showCadastrarTipo: false,
        };
    },

    methods: {
        cadastrarEquipamento() {
            console.log(this.equipamento);
            this.v$.$validate().then((isValid) => {
                if (!isValid) {
                    console.log(this.v$.$errors);
                } else {
                    console.log('Equipamento Cadastrado:', this.equipamento);
                    this.equipamentosDisponiveis.push(this.equipamento);
                    console.log(this.equipamentosDisponiveis);
                }
            });
        },

        adicionarTipo(tipo) {
            this.showCadastrarTipo = !this.showCadastrarTipo;
            this.details.tipos.push(tipo);
            console.log(this.details.tipos);
        },
    },

    validations() {
        return {
            equipamento: {
                tipoEquipamento: {
                    required: helpers.withMessage(
                        'Selecione um tipo de equipamento',
                        required
                    ),
                },
                marca: {
                    required: helpers.withMessage(
                        'Equipamento precisa ter uma marca',
                        required
                    ),
                },
                serial: {
                    required: helpers.withMessage(
                        'Equipamento precisa ter um número de serial.',
                        required
                    ),
                },
                caracteristicas: {
                    armazenamento: {
                        tipo: {
                            requiredIf: helpers.withMessage(
                                'Selecione um tipo de armazenamento',
                                requiredIf(
                                    this.equipamento.tipoEquipamento !=
                                        'Celular'
                                )
                            ),
                        },
                        capacidade: {
                            minValue: helpers.withMessage(
                                'A capacidade mínima deve ser de 32.',
                                minValue(32)
                            ),
                        },
                    },
                    os: {
                        required: helpers.withMessage(
                            'Selecione um sistema operacional.',
                            required
                        ),
                    },
                },
            },
        };
    },
};
</script>
