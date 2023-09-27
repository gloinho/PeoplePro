<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="container">
          <h1>Cadastro de Colaboradores</h1>
          <div>
            <form>
              <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" class="form-control" id="nome" required />
              </div>
              <div class="form-group">
                <label for="telefone">Telefone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="telefone"
                  required
                  pattern="[0-9]{10}"
                />
                <small id="telefoneHelp" class="form-text text-muted"
                  >Deve ter 10 dígitos.</small
                >
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" required />
              </div>
              <div class="form-group">
                <label for="dataAdmissao">Data de Admissão</label>
                <input
                  type="date"
                  class="form-control"
                  id="dataAdmissao"
                  required
                />
              </div>

              <!-- Tabela de habilidades -->
              <div class="form-group">
                <label for="habilidade">Habilidades</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="habilidade"
                    v-model="novaHabilidade"
                  />
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click.prevent="adicionarHabilidade"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
                <table class="table mt-2">
                  <thead>
                    <tr>
                      <th>Habilidade</th>
                      <th>Nível</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(habilidade, index) in habilidades" :key="index">
                      <td>{{ habilidade.nome }}</td>
                      <td>
                        <select
                          class="custom-select"
                          v-model="habilidade.nivel"
                        >
                          <option value="">Selecione</option>
                          <option value="básico">Básico</option>
                          <option value="intermediário">Intermediário</option>
                          <option value="avançado">Avançado</option>
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          @click.prevent="removerHabilidade(index)"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Seleção de contratos -->
              <div class="form-group">
                <label for="contratos">Contratos</label>
                <select
                  multiple
                  class="custom-select"
                  id="contratos"
                  v-model="contratosSelecionados"
                >
                  <option
                    v-for="(contrato, index) in colaborador.contratos"
                    :key="index"
                    :value="contrato.id"
                  >
                    {{ contrato.nome }}
                  </option>
                </select>

                <!-- Lista de contratos selecionados -->
                <ul class="list-group mt-2">
                  <li
                    v-for="(contrato, index) in colaborador.contratos.filter(
                      (c) => contratosSelecionados.includes(c.id)
                    )"
                    :key="index"
                    class="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {{ contrato.nome }}
                    <button
                      type="button"
                      @click.prevent="removerContrato(index)"
                    >
                      Remover
                    </button>
                  </li>
                </ul>
              </div>

              <!-- Botão de cadastro -->
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="cadastrarColaborador"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      colaborador: {
        nome: '',
        telefone: '',
        email: '',
        dataAdmissao: null,
        novaHabilidade: '',
        contratos: [
          { id: 1, nome: 'Contrato 1' },
          { id: 2, nome: 'Contrato 2' },
          { id: 3, nome: 'Contrato 3' },
        ],
      },
      habilidades: [],
      contratosSelecionados: [],
    };
  },
  methods: {
    cadastrarColaborador() {
      console.log('Colaborador cadastrado:', this.colaborador);
    },
    adicionarHabilidade() {
      if (this.novaHabilidade === '') {
        return;
      }

      this.habilidades.push({
        nome: this.novaHabilidade,
        nivel: '',
      });

      this.novaHabilidade = '';
    },
    removerHabilidade(index) {
      this.habilidades.splice(index, 1);
    },
    removerContrato(index) {
      this.contratosSelecionados.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* Estilos do componente */
</style>
