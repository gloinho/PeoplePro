<template>
  <div class="container">
    <h1>Cadastro de Colaboradores</h1>
    <form @submit.prevent="submitForm">
      <input-generic
        label="Nome"
        type="text"
        input-class="form-control"
        input-id="nome"
        v-model="colaborador.nome"
        :required="true"
      />
      <input-generic
        label="Telefone"
        type="tel"
        input-class="form-control"
        input-id="telefone"
        v-model="colaborador.telefone"
        :required="true"
      />
      <input-generic
        label="Email"
        type="email"
        input-class="form-control"
        input-id="email"
        v-model="colaborador.email"
        :required="true"
      />
      <input-generic
        label="Data de Admissão"
        type="date"
        input-class="form-control"
        input-id="dataAdmissao"
        v-model="colaborador.dataAdmissao"
        :required="true"
      />

      <div class="people-pro-container">
        <h3 class="people-pro-title">Habilidades:</h3>
        <form class="people-pro-form" @submit.prevent="adicionarHabilidade()">
          <input-generic
            id="novaHabilidade"
            type="text"
            v-model="novaHabilidade"
            :cols="'col-12 col-md-5'"
            required
            label="Habilidade"
            input-class="form-control people-pro-form-input"
            input-id="novaHabilidade"
          />

          <select-generico
            :cols="'col-12 col-md-5'"
            input-class="form-control people-pro-form-input"
            :input-id="'novoNivel'"
            :label="'Nível'"
            :options="nivelOptions"
            v-model="novoNivel"
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
          :headers="headers"
          :rows="colaborador.habilidades"
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
      radioOptions: [
        { value: 'opcao1', label: 'Opção 1' },
        { value: 'opcao2', label: 'Opção 2' },
        { value: 'opcao3', label: 'Opção 3' },
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
    },
    submitForm() {},
  },
};
</script>

<style scoped></style>
