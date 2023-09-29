<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ modalTitle }}</h2>
        <button @click="fecharModal">Fechar</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="confirmarAcao">Confirmar</button>
        <button @click="cancelarAcao">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    modalTitle: String,
  },
  methods: {
    fecharModal() {
      this.$emit('fechar');
    },
    confirmarAcao() {
      this.$emit('confirmar');
    },
    cancelarAcao() {
      this.$emit('cancelar');
    },
  },
};
</script>

<style scoped>
.people-pro-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.people-pro-modal-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.people-pro-modal-label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

.people-pro-modal-btn {
  padding: 5px 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.people-pro-modal-btn-salvar {
  background-color: #0074d9;
}

.people-pro-modal-btn-cancelar {
  background-color: #ff4136;
}
</style>
