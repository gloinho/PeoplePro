<template>
    <div :class="cols" style="padding: 0 2% 2% 0">
        <label :for="inputId">{{ label }}</label>
        <select
            :id="inputId"
            :class="[inputClass]"
            :value="modelValue"
            @input="handleInput"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
      <div v-for="(error, index) of vuelidate" :key="index">
      <div :class="['submitError']">{{ error.$message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    inputId: String,
    label: String,
    inputClass: String,
    modelValue: String,
    cols: String,
    vuelidate:Object,
  },
  methods: {
    handleInput(evt) {
      console.log(this.modelValue)
      this.$emit('update:modelValue', evt.target.value);
    }
  }
}
</script>
