import CadastroColaborador from './pages/colaboradores/Cadastro.vue';
import CadastroEquipamentos from './pages/equipamentos/CadastroEquipamentos.vue';

const appRoutes = [
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
];

export default appRoutes;
