export const roles = {
    USER:"user",
    ADMIN:"admin",
    SELLER: "seller"
}
Object.freeze(roles)

export const status = {
    PENDING: "pending",
    VERIFIED: "verifiend",
    BLOCKED: "blocked"
}
Object.freeze(status)

export const couponType  = {
    FIXEDAMOUNT: "fixedAmount",
    PERCENTAGE: "percentage"
}
Object.freeze(couponType)

export const paymentMethod = {
    VISA:"visa",
    CASH: "cash"
 }
Object.freeze(paymentMethod)

export const orderStatus = {
    PLACED:"placed",
    DELIVERED: "delivered",
    CANCELED: "canceled",
    REFUNDED: "refunded"
 }
 Object.freeze(orderStatus)