export const generateMessage=(entity)=>({
    alreadyExists:`${entity} already exists`,
    notFound:`${entity} not found`,
    failToCreate:`fail to create ${entity}`,
    failToupdate:`fail to create ${entity}`,
    created:`${entity} created successfully`,
    updated:`${entity} updated successfully`,
    deleted:`${entity} deleted successfully`,
    notAllowed: `${entity} not authorized to access this api`
})

export const messages={
    category: generateMessage('category'),
    subCategory: generateMessage('subCategory'),
    product: generateMessage('product'),
    brand: generateMessage('brand'),
    file: {required :'file is required'},
    user: generateMessage('user'),
    review: generateMessage('review'),
    cart: generateMessage('cart'),
    coupon: generateMessage('coupon'),
    order: generateMessage('order')
}
