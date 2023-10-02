<template>
    <div class="container">
        <h1>Cadastro de Colaboradores</h1>
        <form @submit.prevent="submitForm">
            <input-field
                v-model="colaborador.nome"
                label="Nome"
                type="text"
                input-class="form-control"
                input-id="colaboradorNome"
                :required="true"
                :validator="validarNome"
            />
            <input-field
                v-model="colaborador.telefone"
                label="Telefone"
                type="tel"
                input-class="form-control"
                input-id="colaboradorTelefone"
                :validator="validarTelefone"
                :required="true"
            />
            <input-field
                v-model="colaborador.email"
                label="Email"
                type="email"
                input-class="form-control"
                input-id="colaboradorEmail"
                :required="true"
                :validator="validarEmail"
            />
            <input-field
                v-model="colaborador.dataAdmissao"
                label="Data de Admissão"
                type="date"
                input-class="form-control"
                input-id="colaboradorDataAdmissao"
                :required="true"
                :validator="validarDataAdmissao"
            />

            <div class="people-pro-container">
                <h3 class="people-pro-title">Habilidades:</h3>
                <form
                    class="people-pro-form"
                    @submit.prevent="adicionarHabilidade()"
                >
                    <input-field
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
                        @input="handleSelect($event)"
                    />

                    <button
                        type="submit"
                        class="col-12 col-md-2 people-pro-form-btn btn btn-primary"
                    >
                        Adicionar
                    </button>
                </form>
                <table class="people-pro-table">
                    <thead>
                        <tr>
                            <th>Habilidade</th>
                            <th>Nível</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(
                                habilidade, index
                            ) in colaborador.habilidades"
                            :key="'habilidade_' + index"
                        >
                            <td>{{ habilidade.nome }}</td>
                            <td>{{ habilidade.nivel }}</td>
                            <td>
                                <button
                                    class="people-pro-btn people-pro-btn-remover"
                                    type="button"
                                    @click.prevent="removerHabilidade(index)"
                                >
                                    Remover
                                </button>
                                <button
                                    class="people-pro-btn people-pro-btn-editar"
                                    type="button"
                                    @click.prevent="
                                        editarHabilidade(habilidade)
                                    "
                                >
                                    Editar Nível
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="form-actions">
                <div class="button-container">
                    <button type="submit" class="btn btn-primary">
                        Cadastrar
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
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
import InputField from '../InputField.vue';
import SelectGenerico from '../SelectGeneric.vue'; // Importe o novo componente

export default {
    name: 'CadastroColaboradores',
    components: {
        InputField,
        SelectGenerico,
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
        };
    },
    methods: {
        handleSelect(e) {
            if (e.target) console.log('handleSelect', e.target.value);
        },
        validarNome(nome) {
            return nome?.length >= 3;
        },
        validarTelefone(telefone) {
            const regex = /^\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}$/;
            return regex.test(telefone);
        },
        validarEmail(email) {
            const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
            return regex.test(email);
        },
        validarDataAdmissao(dataAdmissao) {
            const hoje = new Date();
            const data = new Date(dataAdmissao);
            return data <= hoje;
        },
        adicionarHabilidade() {
            console.log(this.novaHabilidade, this.novoNivel);
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
        editarHabilidade(habilidade) {
            this.habilidadeSelecionada = habilidade;
            this.showEditModal = true;
        },
        confirmarEdicao() {
            this.showEditModal = false;
            this.habilidadeSelecionada = null;
        },
        cancelarEdicao() {
            this.showEditModal = false;
            this.habilidadeSelecionada = null;
        },
        submitForm() {},
        limparFormulario() {
            this.colaborador = {
                nome: '',
                telefone: '',
                email: '',
                dataAdmissao: '',
                habilidades: [],
            };
        },
    },
};
</script>

<style scoped>
.people-pro-table {
    width: 100%;
    border-collapse: collapse;
}

.people-pro-table th,
.people-pro-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.people-pro-table th:first-child,
.people-pro-table td:first-child {
    width: 40%;
}

.people-pro-table th:nth-child(2),
.people-pro-table td:nth-child(2) {
    width: 30%;
}
</style>
