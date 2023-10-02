import { createRouter, createWebHistory } from 'vue-router';
import CadastroColaborador from './pages/colaboradores/Cadastro.vue';
import CadastroEquipamentos from './pages/equipamentos/CadastroEquipamentos.vue';

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
    ],
});

export default router;
