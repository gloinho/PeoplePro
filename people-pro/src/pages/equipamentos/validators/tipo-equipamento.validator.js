import { helpers, required } from '@vuelidate/validators';

const checkType = (param) => (value) =>
    !param.some((item) => item.value === value.toLowerCase());

export default function tipoEquipamentoValidator(tipos) {
    return {
        isValid: helpers.withMessage('Tipo já existente.', checkType(tipos)),
        required: helpers.withMessage('Preencha o nome do tipo', required),
    };
}
