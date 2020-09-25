import React from 'react';
import Item from './Item';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmojiMessage from './EmojiMessage'

export const RenderList = props => (
   props.item_list && props.item_list.length>0 &&
      <>
      <Row className="border-bottom p-1 text-left">
         <Col className="text-muted">
            {props.label}
         </Col>
      </Row>
      {props.item_list.map((item) => (
         <Item key={item.uuid} item={item}
               onCompleteClick={props.onCompleteClick} onDeleteClick={props.onDeleteClick}
               onItemTextChange={props.onItemTextChange}
               onSubTopicClick={props.onSubTopicClick} onSubTopicDeleteClick={props.onSubTopicDeleteClick}
               onSubTopicItemTextChange={props.onSubTopicItemTextChange}
               onSubTopicCompleteClick={props.onSubTopicCompleteClick}/>
      ))}
      </>
);

const ItemList = props => {
   const items_completed = props.items && props.items.filter(item => item.complete === true).sort((a, b) => b.updated_at - a.updated_at);
   const items_incomplete = props.items && props.items.filter(item => item.complete !== true);

   return (<>
   <Row className="p-4 text-center">
      <Col className="text-muted">
            {
               (() => {
               switch (props.items.length) {
                  default:
                     return <EmojiMessage label="Making Progress..." symbol="128076"/>
                  case 0:
                     return <EmojiMessage label="No Todo Items yet." symbol="128123"/>
                  case items_completed.length:
                     return <EmojiMessage label="Hurray! You're all caught up." symbol="127881"/>
                  case items_incomplete.length:
                     return <EmojiMessage label="You haven't completed any Todo Items yet." symbol="128064"/>
               }
            })()
         }
      </Col>
   </Row>

   <RenderList label="Todo:" item_list={items_incomplete} {...props} />
   <RenderList label="Complete:" item_list={items_completed} {...props} />

   </>);
};

export default ItemList;