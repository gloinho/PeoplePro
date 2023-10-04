<template>
    <div class="container">
        <h1>Cadastro de Equipamentos</h1>
        <form>
            <InputGeneric
                v-model="equipamento.marca"
                label="Marca"
                type="text"
                input-class="form-control people-pro-form-input"
                input-id="marca-equipamento"
                :vuelidate="v$.equipamento.marca.$errors"
            />

            <InputGeneric
                v-model="equipamento.serial"
                label="Serial"
                type="text"
                input-class="form-control people-pro-form-input"
                input-id="serial-equipamento"
                :vuelidate="v$.equipamento.serial.$errors"
            />

            <InputGeneric
                v-model="equipamento.descricao"
                label="Descricao"
                type="text"
                input-class="form-control people-pro-form-input"
                input-id="descricao-equipamento"
            />

            <InputGeneric
                v-model="equipamento.dataDeCompra"
                label="Data de Compra"
                type="date"
                input-class="form-control people-pro-form-input"
                input-id="data-compra-equipamento"
            />

            <InputGeneric
                v-model="equipamento.ultimaAtualizacao"
                label="Ultima Atualização"
                type="date"
                input-class="form-control people-pro-form-input"
                input-id="ultima-atualizacao-equipamento"
            />

            <InputGeneric
                v-model="equipamento.caracteristicas.armazenamento.capacidade"
                label="Capacidade de Armazenamento(Gb)"
                type="number"
                input-class="form-control people-pro-form-input"
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
                    @change="clearValues"
                />

                <div class="form-group col-auto">
                    <button
                        class="btn btn-primary mt-4"
                        @click.prevent="showCadastrarTipo = !showCadastrarTipo"
                    >
                        Adicionar Tipo
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
                    equipamento.tipoEquipamento &&
                        ['desktop', 'notebook'].includes(
                            equipamento.tipoEquipamento
                        )
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

                <InputGeneric
                    v-model="equipamento.caracteristicas.gpu"
                    label="GPU"
                    type="text"
                    input-class="form-control"
                    input-id="gpu"
                />
            </div>

            <div
                v-else-if="
                    equipamento.tipoEquipamento &&
                        equipamento.tipoEquipamento === 'mobile'
                "
            >
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
import InputGeneric from '../../components/InputGeneric.vue';
import RadioInput from '../../components/RadioInput.vue';
import SelectGeneric from '../../components/SelectGeneric.vue';
import equipamento from '../../models/equipamento';

export default {
    components: {
        CadastrarTipoDeEquipamento,
        InputGeneric,
        RadioInput,
        SelectGeneric,
    },
    setup: () => ({ v$: useVuelidate() }),

    data() {
        return {
            equipamento,
            details: {
                tipos: [
                    { label: 'Mobile', value: 'mobile' },
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
            this.v$.$validate().then((isValid) => {
                if (isValid) {
                    this.equipamentosDisponiveis.push(this.equipamento);
                    console.log(this.equipamentosDisponiveis);
                    console.log(this.v$.$errors);
                }
            });
        },
        clearValues() {
            this.v$.equipamento.caracteristicas.armazenamento.tipo.$reset();
            this.v$.equipamento.caracteristicas.os.$reset();
            this.equipamento.caracteristicas.armazenamento.tipo = '';
            this.equipamento.caracteristicas.os = '';
            this.equipamento.caracteristicas.gpu = '';
        },
        adicionarTipo(tipo) {
            this.showCadastrarTipo = !this.showCadastrarTipo;
            this.details.tipos.push(tipo);
            this.equipamento.tipoEquipamento = tipo.value;
            this.clearValues();
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
                                    ['desktop', 'notebook'].includes(
                                        this.equipamento.tipoEquipamento
                                    )
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
                        requiredIf: helpers.withMessage(
                            'Selecione um sistema operacional.',
                            requiredIf(
                                ['desktop', 'notebook', 'mobile'].includes(
                                    this.equipamento.tipoEquipamento
                                )
                            )
                        ),
                    },
                },
            },
        };
    },
};
</script>
