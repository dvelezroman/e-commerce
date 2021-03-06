import axios from 'axios';
import { CURRENT_TOTAL, ITEMS_IN_CART } from '../constants';

const products_in_cart = (items) => ({
    type: ITEMS_IN_CART,
    items
});

const num_items_in_cart = (current_total) => ({
    type: CURRENT_TOTAL,
    current_total
})

export const fetchItemsInCart = (userId) => dispatch => {
    axios.get(`/api/carrito/${userId}`)
    .then(res => res.data)
    .then(items => {
        dispatch(products_in_cart(items));
        dispatch(num_items_in_cart(items.length));
      }
    )}

export const updateItemInCart = (action, userId, itemId) => dispatch =>
  axios.put(`/api/carrito/${action}`,{
    userId: userId,
    itemId: itemId
  })
  .then(res => res.data)
  .then(items => dispatch(products_in_cart(items)));
