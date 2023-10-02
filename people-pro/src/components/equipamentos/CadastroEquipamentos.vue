<template>
    <div class="container">
        <h1>Cadastro de Equipamentos</h1>
        <form>
            <div class="form-group">
                <label for="tipo-equipamento">Tipo do Equipamento</label>
                <select
                    id="tipo-equipamento"
                    v-model="equipamento.tipoEquipamento"
                    class="form-select"
                >
                    <option
                        v-for="tipo in details.tipos"
                        :key="tipo"
                        :value="tipo"
                    >
                        {{ tipo }}
                    </option>
                </select>
                <div
                    v-if="v$.equipamento.tipoEquipamento.$error"
                    :class="['submitError']"
                >
                    Selecione um tipo de equipamento
                </div>
            </div>
            <div class="form-group">
                <label for="marca-equipamento">Marca</label>
                <input
                    id="marca-equipamento"
                    v-model="equipamento.marca"
                    class="form-control"
                    type="text"
                />
                <div
                    v-if="v$.equipamento.marca.$error"
                    :class="['submitError']"
                >
                    Marca não pode ser vazia
                </div>
            </div>
            <div class="form-group">
                <label for="serial-equipamento">Serial</label>
                <input
                    id="serial-equipamento"
                    v-model="equipamento.serial"
                    class="form-control"
                    type="text"
                />
                <div
                    v-if="v$.equipamento.serial.$error"
                    :class="['submitError']"
                >
                    Serial não pode ser vazio
                </div>
            </div>
            <div class="form-group">
                <label for="descricao-equipamento">Descricao</label>
                <input
                    id="descricao-equipamento"
                    v-model="equipamento.descricao"
                    class="form-control"
                    type="text"
                />
            </div>
            <div class="form-group">
                <label for="data-compra-equipamento">Data de Compra</label>
                <input
                    id="data-compra-equipamento"
                    v-model="equipamento.dataDeCompra"
                    class="form-control"
                    type="date"
                />
            </div>
            <div class="form-group">
                <label for="ultima-atualizacao-equipamento"
                >Ultima Atualização</label
                >
                <input
                    id="ultima-atualizacao-equipamento"
                    v-model="equipamento.ultimaAtualizacao"
                    class="form-control"
                    type="date"
                />
            </div>
            <div class="form-group">
                <label for="capacidade">Capacidade de Armazenamento(Gb)</label>
                <input
                    v-model="
                        equipamento.caracteristicas.armazenamento.capacidade
                    "
                    class="form-control"
                    type="number"
                />
                <div
                    v-if="
                        v$.equipamento.caracteristicas.armazenamento.capacidade
                            .$error
                    "
                    :class="['submitError']"
                >
                    Armazenamento deve ser maior que 32GB
                </div>
            </div>

            <!-- Caracteristicas dos Equipamentos: condicionais dependendo do tipo de equipamento escolhido. -->
            <div
                v-if="
                    equipamento.tipoEquipamento === 'Desktop' ||
                        equipamento.tipoEquipamento === 'Notebook'
                "
            >
                <label for="armazenamento">Tipo de Armazenamento</label>
                <div
                    v-for="arm in details.armazenamento.tipo"
                    id="armazenamento"
                    :key="arm"
                    class="form-check"
                >
                    <label :for="arm">{{ arm }}</label>
                    <input
                        :id="arm"
                        v-model="equipamento.caracteristicas.armazenamento.tipo"
                        class="form-check-input"
                        type="radio"
                        :value="arm"
                    />
                </div>
                <div
                    v-if="
                        v$.equipamento.caracteristicas.armazenamento.tipo.$error
                    "
                    :class="['submitError']"
                >
                    Selecione um tipo de armazenamento
                </div>

                <label for="equipamento-os">Sistema Operacional</label>
                <div
                    v-for="os in details.os.pc"
                    id="equipamento-os"
                    :key="os"
                    class="form-check"
                >
                    <label :for="os">{{ os }}</label>
                    <input
                        :id="os"
                        v-model="equipamento.caracteristicas.os"
                        class="form-check-input"
                        type="radio"
                        :value="os"
                    />
                </div>
                <div
                    v-if="v$.equipamento.caracteristicas.os.$error"
                    :class="['submitError']"
                >
                    Selecione um sistema operacional
                </div>
            </div>

            <div v-else-if="equipamento.tipoEquipamento === 'Celular'">
                <label for="equipamento-os">Sistema Operacional</label>
                <div
                    v-for="os in details.os.mobile"
                    id="equipamento-os"
                    :key="os"
                    class="form-check"
                >
                    <label :for="os">{{ os }}</label>
                    <input
                        :id="os"
                        v-model="equipamento.caracteristicas.os"
                        class="form-check-input"
                        type="radio"
                        :value="os"
                    />
                </div>
                <div
                    v-if="v$.equipamento.caracteristicas.os.$error"
                    :class="['submitError']"
                >
                    Selecione um sistema operacional
                </div>
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
import { required, minValue, requiredIf } from '@vuelidate/validators';
export default {
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
                tipos: ['Celular', 'Desktop', 'Notebook'],
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
        };
    },
    methods: {
        async cadastrarEquipamento() {
            const isValid = await this.v$.$validate();
            if (!isValid) {
                console.log(this.v$.$errors);
            } else {
                console.log('Equipamento Cadastrado:', this.equipamento);
                this.equipamentosDisponiveis.push(this.equipamento);
                console.log(this.equipamentosDisponiveis);
            }
        },
        adicionarTipoDeEquipamento(tipo) {
            this.equipamento.tipos.push(tipo);
        },
        adicionarOs(pc, os) {
            pc
                ? this.equipamento.os.pc.push(os)
                : this.equipamento.os.mobile.push(os);
        },
    },
    validations() {
        return {
            equipamento: {
                tipoEquipamento: { required },
                marca: { required },
                serial: { required },
                descricao: {},
                dataDeCompra: {},
                ultimaAtualizacao: {},
                caracteristicas: {
                    ram: {},
                    armazenamento: {
                        tipo: {
                            requiredIf: requiredIf(
                                this.equipamento.tipoEquipamento != 'Celular'
                            ),
                        },
                        capacidade: { minValue: minValue(32) },
                    },
                    os: { required },
                    gpu: {},
                },
            },
        };
    },
};
</script>
