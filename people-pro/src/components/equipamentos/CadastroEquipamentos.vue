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
                    <option v-for="tipo in tiposDisponiveis" :key="tipo">{{ tipo }}</option>
                </select>
            </div>
            <div class="form-group">   
                <label for="marca-equipamento">Marca</label>
                <input class="form-control" type="text" id="marca-equipamento" v-model="equipamento.marca"/>            
            </div>
            <div class="form-group">   
                <label for="serial-equipamento">Serial</label>
                <input class="form-control" type="text" id="serial-equipamento" v-model="equipamento.serial"/>            
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
export default{
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
    methods: {
        cadastrarEquipamento(){
            console.log('Equipamento Cadastrado:',this.equipamento)
        }
    }
}
</script>
