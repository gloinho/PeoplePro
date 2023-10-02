import { createRouter, createWebHistory } from 'vue-router';
import CadastroColaborador from './pages/components/colaboradores/Cadastro';
import CadastroEquipamentos from './components/equipamentos/CadastroEquipamentos.vue';

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
