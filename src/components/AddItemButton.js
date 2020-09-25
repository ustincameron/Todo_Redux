import React from 'react';
import Button from 'react-bootstrap/Button';
import { MdLibraryAdd } from 'react-icons/md';

const AddItemButton = ({ onAddItem }) => (
  <Button onClick={() => onAddItem()} className="mt-3">
    <MdLibraryAdd/> Add To-Do Item
  </Button>
);

export default AddItemButton;
