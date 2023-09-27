<template>
    <div class="container">
        <h1>Cadastrar Equipamentos</h1>
        <form>
            <div class="form-group">
                <label for="tipo-equipamento">Tipo do Equipamento</label>
                <select 
                class="form-select" 
                id="tipo-equipamento"
                v-model="equipamento.tipoEquipamento">
                    <option v-for="tipo in tiposDisponiveis" :key="tipo" :value="tipo">{{ tipo }}</option>
                </select>
                <div v-if="v$.equipamento.tipoEquipamento.$error" :class="['submitError']">Selecione um tipo de equipamento</div>    
            </div>
            <div class="form-group">   
                <label for="marca-equipamento">Marca</label>
                <input class="form-control" type="text" id="marca-equipamento" v-model="equipamento.marca"/>        
                <div v-if="v$.equipamento.marca.$error" :class="['submitError']">Marca não pode ser vazia</div>    
            </div>
            <div class="form-group">   
                <label for="serial-equipamento">Serial</label>
                <input class="form-control" type="text" id="serial-equipamento" v-model="equipamento.serial"/>    
                <div v-if="v$.equipamento.serial.$error" :class="['submitError']">Serial não pode ser vazio</div>            
            </div>
            <div class="form-group">   
                <label for="descricao-equipamento">Descricao</label>
                <input class="form-control" type="text" id="descricao-equipamento" v-model="equipamento.descricao"/>            
            </div>
            <div class="form-group">   
                <label for="data-compra-equipamento">Data de Compra</label>
                <input class="form-control" type="date" id="data-compra-equipamento" v-model="equipamento.dataDeCompra"/>   
            </div>
            <div class="form-group">   
                <label for="ultima-atualizacao-equipamento">Ultima Atualização</label>
                <input class="form-control" type="date" id="ultima-atualizacao-equipamento" v-model="equipamento.ultimaAtualizacao"/>            
            </div>
            <div v-if="equipamento.tipoEquipamento==='Desktop' || equipamento.tipoEquipamento === 'Notebook'">
                <div v-for="(caracteristica, index) in equipamento.caracteristicas" :key="index" class="form-group">
                    <label for="teste">{{index.charAt(0).toUpperCase() + index.slice(1)}}</label>  
                    <input class="form-control" type="text" id="teste" v-model="equipamento.caracteristicas[index]"/>            
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="cadastrarEquipamento"
              >Cadastrar</button>
        </form>   
    </div> 
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default{
    setup () {
    return { v$: useVuelidate() }
    },
    data() {
        return  {
            equipamento : {
                tipoEquipamento:'',
                marca:'',
                serial:'',
                descricao:'',
                dataDeCompra:'',
                ultimaAtualizacao:'',
                caracteristicas: {
                    ram:'',
                    armazenamento:'',
                    os:'',
                    gpu:''
                },
        },
        tiposDisponiveis:['Android','Iphone','Desktop','Notebook']
        }         
    },
    validations() {
        return {
        // Define as regras de validação para os campos
            equipamento: {
                tipoEquipamento: {required},
                marca: { required }, // Usa a validação "required" para o campo "marca"
                serial: {required},
                descricao: {},
                dataDeCompra: {},
                ultimaAtualizacao: {},
                caracteristicas: {
                    ram: {},
                    armazenamento: {},
                    os: {},
                    gpu: {}
                }
            }
        }},
    methods: {
        async cadastrarEquipamento(){
            const isValid = await this.v$.$validate();
            if(!isValid)
            {
                console.log(this.v$.$errors)
            }
            else
            {
                console.log('Equipamento Cadastrado:',this.equipamento)   
            }
        }
    }
}
</script>