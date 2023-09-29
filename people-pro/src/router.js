import { createRouter, createWebHistory } from 'vue-router';
import CadastroColaborador from './components/colaboradores/CadastroColaborador.vue'; // Importe o componente corretamente
import CadastroEquipamentos from './components/equipamentos/CadastroEquipamentos.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'CadastroColaborador',
      component: CadastroColaborador,
    },
    {
      path: '/cadastro-equipamento',
      name: 'CadastroEquipamentos',
      component: CadastroEquipamentos,
    },
    // Outras rotas aqui, se necessário
  ],
});

export default router;
