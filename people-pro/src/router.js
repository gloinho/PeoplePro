import { createRouter, createWebHistory } from 'vue-router';
import CadastroColaborador from './colaboradores/CadastroColaborador.vue'; // Importe o componente corretamente

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/cadastro-colaborador',
      name: 'CadastroColaborador',
      component: CadastroColaborador,
    },
    // Outras rotas aqui, se necessário
  ],
});

export default router;
