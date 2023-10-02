<template>
    <div class="container">
        <h1>Cadastro de Colaboradores</h1>
        <form @submit.prevent="submitForm">
            <input-generic
                v-model="colaborador.nome"
                label="Nome"
                type="text"
                input-class="form-control"
                input-id="nome"
                :required="true"
            />
            <input-generic
                v-model="colaborador.telefone"
                label="Telefone"
                type="tel"
                input-class="form-control"
                input-id="telefone"
                :required="true"
            />
            <input-generic
                v-model="colaborador.email"
                label="Email"
                type="email"
                input-class="form-control"
                input-id="email"
                :required="true"
            />
            <input-generic
                v-model="colaborador.dataAdmissao"
                label="Data de Admissão"
                type="date"
                input-class="form-control"
                input-id="dataAdmissao"
                :required="true"
            />

            <div class="people-pro-container">
                <h3 class="people-pro-title">Habilidades:</h3>
                <form
                    class="people-pro-form"
                    @submit.prevent="adicionarHabilidade()"
                >
                    <input-generic
                        id="novaHabilidade"
                        v-model="novaHabilidade"
                        type="text"
                        :cols="'col-12 col-md-5'"
                        required
                        label="Habilidade"
                        input-class="form-control people-pro-form-input"
                        input-id="novaHabilidade"
                    />

                    <select-generico
                        v-model="novoNivel"
                        :cols="'col-12 col-md-5'"
                        input-class="form-control people-pro-form-input"
                        :input-id="'novoNivel'"
                        :label="'Nível'"
                        :options="nivelOptions"
                    />

                    <button
                        type="submit"
                        class="col-12 col-md-2 people-pro-form-btn btn btn-primary"
                    >
                        Adicionar
                    </button>
                </form>

                <table-generic
                    v-if="colaborador.habilidades.length > 0"
                    :rows="colaborador.habilidades"
                    :headers="headers"
                    :actions="actions"
                />
            </div>
            <div class="actions">
                <div class="button-container">
                    <button
                        type="submit"
                        class="col-12 col-md-2 people-pro-btn btn btn-primary"
                    >
                        Cadastrar
                    </button>
                    <button
                        type="button"
                        class="col-12 col-md-2 people-pro-btn btn btn-secondary"
                        @click.prevent="limparFormulario"
                    >
                        Limpar Formulário
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import InputGeneric from '../../components/InputGeneric.vue';
import SelectGenerico from '../../components/SelectGeneric.vue';
import TableGeneric from '../../components/TableGeneric.vue';

import { postColaboradores } from './Api';

export default {
    name: 'CadastroColaboradores',
    components: {
        InputGeneric,
        SelectGenerico,
        TableGeneric,
    },
    data() {
        return {
            colaborador: {
                nome: '',
                telefone: '',
                email: '',
                dataAdmissao: '',
                habilidades: [],
            },
            novaHabilidade: '',
            novoNivel: 'basico',
            showEditModal: false,
            habilidadeSelecionada: null,
            nivelOptions: [
                { label: 'Básico', value: 'basico' },
                { label: 'Intermediário', value: 'intermediario' },
                { label: 'Avançado', value: 'avancado' },
            ],
            headers: ['Habilidade', 'Nível'],
            actions: [
                {
                    label: 'Remover',
                    class: 'remover',
                    callback: this.removerHabilidade,
                },
            ],
            selectedOption: '',
        };
    },
    methods: {
        adicionarHabilidade() {
            const habilidade = {
                nome: this.novaHabilidade,
                nivel: this.novoNivel,
            };

            this.colaborador.habilidades.push(habilidade);
            this.novaHabilidade = '';
            this.novoNivel = 'basico';
        },
        removerHabilidade(index) {
            this.colaborador.habilidades.splice(index, 1);
        },
        limparFormulario() {
            this.colaborador = {
                nome: '',
                telefone: '',
                email: '',
                dataAdmissao: '',
                habilidades: [],
            };
            this.novaHabilidade = '';
            this.novoNivel = 'basico';
        },
        async submitForm() {
            try {
                await postColaboradores(this.colaborador);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped></style>
