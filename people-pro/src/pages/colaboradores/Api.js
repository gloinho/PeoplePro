import { post, get } from '../../api/BaseApi';

export const postColaboradores = async (data = {}) => {
    return await post('colaboradores', data);
};

export const getColaboradorHabilidades = async () => {
    return await get('colaboradores-niveis-habilidades');
};
