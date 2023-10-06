import { required, helpers, email } from '@vuelidate/validators';
const peloMenosUmaHabilidade = (param) => param.length > 0;

const colaboradorValidator = {
    nome: {
        required: helpers.withMessage('O campo é obrigatório', required),
    },
    telefone: {
        required: helpers.withMessage('O campo é obrigatório', required),
    },
    email: {
        email: helpers.withMessage('Email inválido', email),
        required: helpers.withMessage('O campo é obrigatório', required),
    },
    dataAdmissao: {
        required: helpers.withMessage('O campo é obrigatório', required),
    },
    habilidades: {
        atLeastOne: helpers.withMessage(
            'Colaborador precisa de pelo menos uma habilidade',
            peloMenosUmaHabilidade
        ),
    },
};

export default colaboradorValidator;
