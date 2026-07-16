import { reactive } from "vue";

export const orders = reactive({
    items: JSON.parse(localStorage.getItem("orders")) || []
});

function saveOrders() {
    localStorage.setItem(
        "orders",
        JSON.stringify(orders.items)
    );
}

export function addOrder(order) {

    orders.items.unshift(order);

    saveOrders();

}