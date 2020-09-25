export default function items(state = [], action) {
   switch (action.type) {
      case 'ADD_ITEM':
         return [
            ...state,
            action.payload
         ];
      case 'UPDATE_ITEM':
         return state.map((item) => {
            if (action.payload.uuid === item.uuid) {
               const {updatedItem, updated_at} = action.payload;
                  return {
                     ...item,
                     ...updatedItem,
                     updated_at,
                     subitems: (updatedItem.complete === true && item.subitems) ? item.subitems.map((sub) => {
                        return {
                           ...sub,
                           ...updatedItem,
                           updated_at
                        }
                     }) : state.subitems
                  }
            }
            return item;
         });
      case 'REMOVE_ITEM':
         return [
            ...state.filter(item => item.uuid !== action.payload.uuid)
         ];
      case 'ADD_SUB_ITEM':
         return state.map((item) => {
            if (action.payload.uuid === item.uuid) {
               const {new_subitem, updated_at} = action.payload;
               return {
                  ...item,
                  complete: false,
                  updated_at,
                  subitems: (item.subitems) ? [...item.subitems, new_subitem] : [new_subitem]
               }
            }
            return item;
         });
      case 'UPDATE_SUB_ITEM':
         return state.map((item) => {
               const {index, updatedItem, updated_at} = action.payload;
               if (item.subitems[index] && action.payload.uuid === item.subitems[index].uuid) {
                     return {
                        ...item,
                        updated_at: (updatedItem.complete === false) ? updated_at : state.updated_at,
                        complete: (updatedItem.complete === false) ? false : state.complete,
                        subitems: [...item.subitems.filter((s, i) => i !== index), {
                           ...item.subitems[index],
                           ...updatedItem,
                           updated_at
                        }
                        ]
                     }
               }
               return item;
            }
         );
      case 'REMOVE_SUB_ITEM':
         return state.map((item) => {
            return {
               ...item,
               subitems: item.subitems.filter(sub => sub.uuid !== action.payload.uuid)
            }
         });

      default:
         return state;
   }
}