<template>
    <div class="container">
        <form>
            <div class="row border border-primary">
                <div class="form-group col-auto">
                    <label for="tipo">Nome do Tipo</label>
                    <input class="form-control" id="tipo" v-model="tipo">
                    <div v-if="v$.tipo.$error" :class="['submitError']">Tipo já existente.</div>    
                </div>
                <div class="form-group col-auto">
                    <button class="btn btn-primary mt-4"  @click.prevent="adicionar">Adicionar</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
const checkType = (param) => (value) => !param.some(item => item.toLowerCase() === value.toLowerCase());
export default{ 
    setup () {
    return { v$: useVuelidate() }
    },
    name:'CadastrarTipoDeEquipamento',
    data(){
        return {
            tipo:''
        }    
    },
    props:{
        tipos:Array
    },
    methods: {
        async adicionar(){
            const isValid = await this.v$.$validate();
            if(isValid)
            {
                this.$emit('novo-tipo',this.tipo);
            }
        }
    },
    beforeUnmount(){
        const element = document.getElementById('tipo')
        element.value = ''
    },
    validations() {
        return {           
            tipo:{ isValid: checkType(this.tipos) }
    }}
}
</script>
<style scoped>
.border{
    border-radius: 15px;
    padding: 10px;
    margin: 5px;
}
</style>