import { reactive } from "vue";

const savedOrders =
    JSON.parse(localStorage.getItem("orders")) || []

savedOrders.forEach(order => {

    if (!order.status) {

        order.status = "Pending"

    }

    if (!order.tracking) {

        order.tracking = [

            {
                title: "Order Placed",
                completed: true
            },

            {
                title: "Confirmed",
                completed: false
            },

            {
                title: "Packed",
                completed: false
            },

            {
                title: "Shipped",
                completed: false
            },

            {
                title: "Delivered",
                completed: false
            }

        ]

    }

})

export const orders = reactive({

    items: savedOrders

})

function saveOrders() {
    localStorage.setItem(
        "orders",
        JSON.stringify(orders.items)
    );
}

export function addOrder(order) {

    order.status = "Pending"

    order.tracking = [

        {
            title: "Order Placed",
            completed: true
        },

        {
            title: "Confirmed",
            completed: false
        },

        {
            title: "Packed",
            completed: false
        },

        {
            title: "Shipped",
            completed: false
        },

        {
            title: "Delivered",
            completed: false
        }

    ]

    orders.items.unshift(order)

    saveOrders()

}