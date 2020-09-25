import React from "react";
import Button from "react-bootstrap/Button";
import { MdDone, MdLibraryAdd, MdDeleteForever } from 'react-icons/md';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Item = ({ item, parent_item, index, onCompleteClick, onDeleteClick, onItemTextChange, onSubTopicClick, onSubTopicDeleteClick, onSubTopicItemTextChange, onSubTopicCompleteClick }) => (

   <>
   <Row className="mt-3 bg-white">
      <Col>
         <input
            type="text"
            className="form-control"
            placeholder="Enter text here"
            value={item.text}
            data-testid="text-input"
            onChange={(e) => onItemTextChange(item.uuid, e.target.value, index)}
         />
      </Col>

      <Col sm="auto">
         <Button
            onClick={() => onCompleteClick(item.uuid, !item.complete, index)}
            variant={item.complete ? "success" : "secondary"}
            data-testid="complete-button"
         >
            <MdDone />
         </Button>
      </Col>
      {
         onSubTopicClick &&
            <Col sm="auto">
               <Button
                  onClick={() => onSubTopicClick(item.uuid)}
                  variant={"secondary"}
                  data-testid="subtopic-button"
               >
                  <MdLibraryAdd />
               </Button>
            </Col>
      }
      <Col sm="auto">
         <Button
            onClick={() => onDeleteClick(item.uuid, parent_item)}
            variant={"secondary"}
            data-testid="delete-button"
         >
            <MdDeleteForever />
         </Button>
      </Col>
   </Row>

   {
      item.subitems && item.subitems.length>0 &&
      <Row className="ml-3 mt-3 bg-white">
         <Col>
            {item.subitems.map((subitem, index) => (
               <Item key={subitem.uuid} index={index} parent_item={item} item={subitem}
                     onCompleteClick={onSubTopicCompleteClick}
                     onDeleteClick={onSubTopicDeleteClick} onItemTextChange={onSubTopicItemTextChange}/>
            ))}
         </Col>
      </Row>
   }
   </>
);

export default Item;
