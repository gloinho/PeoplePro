import { required, minValue, requiredIf, helpers } from '@vuelidate/validators';

export default function equipamentoValidator(tipoEquipamento) {
    return {
        tipoEquipamento: {
            required: helpers.withMessage(
                'Selecione um tipo de equipamento',
                required
            ),
        },
        marca: {
            required: helpers.withMessage(
                'Equipamento precisa ter uma marca',
                required
            ),
        },
        serial: {
            required: helpers.withMessage(
                'Equipamento precisa ter um número de serial.',
                required
            ),
        },
        caracteristicas: {
            armazenamento: {
                tipo: {
                    requiredIf: helpers.withMessage(
                        'Selecione um tipo de armazenamento',
                        requiredIf(
                            ['desktop', 'notebook'].includes(tipoEquipamento)
                        )
                    ),
                },
                capacidade: {
                    minValue: helpers.withMessage(
                        'A capacidade mínima deve ser de 32.',
                        minValue(32)
                    ),
                },
            },
            os: {
                requiredIf: helpers.withMessage(
                    'Selecione um sistema operacional.',
                    requiredIf(
                        ['desktop', 'notebook', 'mobile'].includes(
                            tipoEquipamento
                        )
                    )
                ),
            },
        },
    };
}
