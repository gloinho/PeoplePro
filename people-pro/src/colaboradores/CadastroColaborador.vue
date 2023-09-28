<template>
  <v-main>
    <v-container>
      <div class="container">
        <h1>Cadastro de Colaboradores</h1>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input
              type="text"
              class="form-control"
              id="nome"
              v-model="colaborador.nome"
              required
              :class="{ 'is-invalid': !validarNome(colaborador.nome) }"
            />
            <span
              v-if="!validarNome(colaborador.nome)"
              class="invalid-feedback"
            >
              O campo Nome deve conter pelo menos um nome e um sobrenome com
              pelo menos 3 caracteres cada.
            </span>
          </div>
          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input
              type="tel"
              class="form-control"
              id="telefone"
              v-model="colaborador.telefone"
              required
              pattern="[0-9]{10}"
              :class="{ 'is-invalid': !validarTelefone(colaborador.telefone) }"
            />
            <small id="telefoneHelp" class="form-text text-muted">
              Deve ter 10 dígitos.
            </small>
            <span
              v-if="!validarTelefone(colaborador.telefone)"
              class="invalid-feedback"
            >
              O campo Telefone deve conter apenas números.
            </span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="colaborador.email"
              required
              :class="{ 'is-invalid': !validarEmail(colaborador.email) }"
            />
            <span
              v-if="!validarEmail(colaborador.email)"
              class="invalid-feedback"
            >
              O campo Email deve ser válido.
            </span>
          </div>
          <div class="form-group">
            <label for="dataAdmissao">Data de Admissão</label>
            <input
              type="date"
              class="form-control"
              id="dataAdmissao"
              v-model="colaborador.dataAdmissao"
              required
              :class="{
                'is-invalid': !validarDataAdmissao(colaborador.dataAdmissao),
              }"
            />
            <span
              v-if="!validarDataAdmissao(colaborador.dataAdmissao)"
              class="invalid-feedback"
            >
              O campo Data de Admissão deve ser uma data válida.
            </span>
          </div>

          <!-- Componente de tabela de habilidades -->
          <!-- <tabela-habilidades
            :habilidades="colaborador.habilidades"
            @adicionar-habilidade="adicionarHabilidade"
          /> -->

          <!-- Componente de seleção de contratos -->
          <!-- <selecao-contratos
            :contratos-disponiveis="contratosDisponiveis"
            :contrato-selecionado="colaborador.contrato"
            @selecionar-contrato="selecionarContrato"
          /> -->

          <button type="submit" class="btn btn-primary">Cadastrar</button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="limparFormulario"
          >
            Limpar Formulário
          </button>
        </form>
      </div>
    </v-container>
  </v-main>
</template>

<script>
// import TabelaHabilidades from './TabelaHabilidades.vue';
// import SelecaoContratos from './SelecaoContratos.vue';

export default {
  name: 'CadastroColaboradores',
  components: {
    // TabelaHabilidades,
    // SelecaoContratos,
  },
  data() {
    return {
      colaborador: {
        nome: '',
        telefone: '',
        email: '',
        dataAdmissao: '',
        habilidades: [],
        contrato: null,
      },
      contratosDisponiveis: [
        { id: 1, nome: 'PJ' },
        { id: 2, nome: 'CLT' },
      ],
    };
  },
  methods: {
    validarNome(nome) {
      // Validação do campo Nome
      // Deve conter pelo menos um nome e um sobrenome com pelo menos 3 caracteres cada.
      const nomes = nome.trim().split(' ');
      return nomes.length >= 2 && nomes.every((n) => n.length >= 3);
    },
    validarTelefone(telefone) {
      // Validação do campo Telefone
      // Deve conter apenas números.
      return /^\d+$/.test(telefone);
    },
    validarEmail(email) {
      // Validação do campo Email
      // Deve ser um email válido.
      return /\S+@\S+\.\S+/.test(email);
    },
    validarDataAdmissao(dataAdmissao) {
      // Validação do campo Data de Admissão
      // Deve ser uma data válida.
      return !isNaN(Date.parse(dataAdmissao));
    },
    adicionarHabilidade(habilidade) {
      this.colaborador.habilidades.push(habilidade);
    },
    selecionarContrato(contrato) {
      this.colaborador.contrato = contrato;
    },
    submitForm() {
      // Envio do formulário
      // Aqui você pode enviar os dados do colaborador para o backend ou fazer alguma outra ação necessária.
    },
    limparFormulario() {
      // Limpa todos os campos do formulário
      this.colaborador.nome = '';
      this.colaborador.telefone = '';
      this.colaborador.email = '';
      this.colaborador.dataAdmissao = '';
      this.colaborador.habilidades = [];
      this.colaborador.contrato = null;
    },
  },
};
</script>
