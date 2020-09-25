import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { addItem, updateItem, removeItem, addSubItem, removeSubItem, updateSubItem } from './actions/items.js'
import ItemList from './components/ItemList'
import AddItemButton from './components/AddItemButton'
import BgEffect from './components/BgEffect'

const App = () => {
   const { items } = useSelector(state => state);
   const dispatch = useDispatch();
   const onAddItem = () => dispatch(addItem());
   const onDeleteClick = (uuid) => dispatch(removeItem(uuid));
   const onCompleteClick = (uuid, complete) => dispatch(updateItem(uuid, {complete}));
   const onItemTextChange = (uuid, text) => dispatch(updateItem(uuid, {text}));
   const onSubTopicItemTextChange = (uuid, text, index) => dispatch(updateSubItem(uuid, {text}, index));
   const onSubTopicClick = (uuid) => dispatch(addSubItem(uuid));
   const onSubTopicCompleteClick = (uuid, complete, index) => dispatch(updateSubItem(uuid, {complete}, index));
   const onSubTopicDeleteClick = (uuid, parent_item) => dispatch(removeSubItem(uuid, parent_item));

   return (
      <div className="app">
         <span className="logo">Todo_Redux</span>

         <Container className="bg-white px-4 py-3 rounded shadow-lg">
            <ItemList items={items}
                      onCompleteClick={onCompleteClick}
                      onDeleteClick={onDeleteClick}
                      onItemTextChange={onItemTextChange.bind(this)}
                      onSubTopicClick={onSubTopicClick}
                      onSubTopicDeleteClick={onSubTopicDeleteClick}
                      onSubTopicItemTextChange={onSubTopicItemTextChange}
                      onSubTopicCompleteClick={onSubTopicCompleteClick}
            />
            <div className="border-top mt-3">
               <AddItemButton onAddItem={onAddItem}/>
            </div>
         </Container>

         <BgEffect length={10} />
         </div>
   );
}

export default App;
