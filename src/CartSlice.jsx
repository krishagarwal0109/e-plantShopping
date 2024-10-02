import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const {name,image,description,cost}=action.payload;
      const itemfound= state.items.find(item=>item.name==name);
      if(itemfound){
        itemfound.count++;
      }  
      else{
        state.items.push({name,image,description,cost,count:1});
      }
      },
    
    removeItem: (state, action) => {
      state.items=state.items.filter(item=>action.payload.name!=item.name);
    },
    updateQuantity: (state, action) => {
      const {name,count}=action.payload;
      const itemtomodify=state.items.find(item=>item.name==name);
      if(itemtomodify){
        itemtomodify.count=count;
      }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
