<template>
  <div :class="cols" style="padding: 0 2% 2% 0">
    <label :for="inputId">{{ label }}</label>
    <select
      :id="inputId"
      :class="[inputClass]"
      :value="selectedValue"
      @input="emitValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    inputId: String,
    label: String,
    inputClass: String,
    selectedValue: String,
    cols: String,
  },
  methods: {
    emitValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
