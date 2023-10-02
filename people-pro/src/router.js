import { createRouter, createWebHistory } from 'vue-router';
import CadastroColaborador from './pages/colaboradores/Cadastro.vue';
import CadastroEquipamentos from './components/equipamentos/CadastroEquipamentos.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/cadastro-colaborador',
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
