const new_uuid = () => {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
   });
}

const new_subitem = () => {
   return {
      uuid: new_uuid(),
      complete: false,
      updated_at: new Date().getTime(),
      text: "",
   }
}

export const addItem = () => ({
   type: 'ADD_ITEM',
   payload: {
      uuid: new_uuid(),
      complete: false,
      updated_at: new Date().getTime(),
      text: "",
      subitems: []
   }
})

export const updateItem = (uuid, updatedItem) => ({
   type: 'UPDATE_ITEM',
   payload: {
      uuid,
      updatedItem,
      updated_at: new Date().getTime()
   }
});

export const removeItem = (uuid) => ({
   type: 'REMOVE_ITEM',
   payload: {
      uuid
   }
});

export const addSubItem = (uuid) => ({
   type: 'ADD_SUB_ITEM',
   payload: {
      uuid,
      new_subitem: new_subitem(),
      updated_at: new Date().getTime()
   }
});

export const updateSubItem = (uuid, updatedItem, index) => ({
   type: 'UPDATE_SUB_ITEM',
   payload: {
      uuid,
      updatedItem,
      index,
      updated_at: new Date().getTime()
   }
});

export const removeSubItem = (uuid, parent_item) => ({
   type: 'REMOVE_SUB_ITEM',
   payload: {
      uuid,
      parent_item
   }
});