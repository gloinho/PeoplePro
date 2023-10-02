module.exports = {
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    rules: {
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/html-indent': ['error', 4],
        'vue/singleline-html-element-content-newline': 0,
    },
};
