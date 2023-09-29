import { createRouter, createWebHistory } from 'vue-router';
import CadastroColaborador from './pages/colaboradores/Cadastro';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'CadastroColaborador',
      component: CadastroColaborador,
    },
  ],
});

export default router;
