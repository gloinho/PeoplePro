<template>
    <table class="people-pro-table">
        <thead>
            <tr>
                <th v-for="(header, index) in headers" :key="index">
                    {{ header }}
                </th>
                <th v-if="actions">Opções</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in rows" :key="index">
                <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                <td v-if="actions">
                    <button
                        v-for="(action, actionIndex) in actions"
                        :key="actionIndex"
                        :class="
                            'people-pro-btn people-pro-btn-' + action?.class
                        "
                        @click="action.callback(row)"
                    >
                        {{ action.label }}
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        headers: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        actions: {
            type: Array,
            default: null,
        },
    },
};
</script>

<style scoped>
.people-pro-table {
    width: 100%;
    border-collapse: collapse;
}

.people-pro-table th,
.people-pro-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.people-pro-table th:first-child,
.people-pro-table td:first-child {
    width: 40%;
}

.people-pro-table th:nth-child(2),
.people-pro-table td:nth-child(2) {
    width: 30%;
}
</style>
