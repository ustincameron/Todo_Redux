import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AddItemButton from './components/AddItemButton'
import Item from './components/Item'
import items from './reducers/items.js'

it('should call onAddItem if addItem button is clicked', () => {
   const mockOnAddItem = jest.fn()
   render(<AddItemButton onAddItem={mockOnAddItem}/>)
   fireEvent.click(screen.getByText('Add To-Do Item'), {button: 1})
   expect(mockOnAddItem).toHaveBeenCalledTimes(1)
})

it('should call onItemTextChange if item text is entered', () => {
   const mockOnItemTextChange = jest.fn()
   const mockOnCompleteClick = jest.fn()
   render(<Item item={{uuid: '1234', complete: false, text: ''}} onCompleteClick={mockOnCompleteClick}
                onItemTextChange={mockOnItemTextChange}/>)
   fireEvent.change(screen.getByPlaceholderText('Enter text here'), {target: {value: 'stuff'}})
   expect(mockOnItemTextChange).toHaveBeenCalledWith('1234', 'stuff', undefined)
})

it('should call onCompleteClick if item is completed', () => {
   const mockOnItemTextChange = jest.fn()
   const mockOnCompleteClick = jest.fn()
   render(<Item item={{uuid: '1234', complete: false, text: ''}} onCompleteClick={mockOnCompleteClick}
                onItemTextChange={mockOnItemTextChange}/>)
   fireEvent.click(screen.getByTestId('complete-button'), {button: 1})
   expect(mockOnCompleteClick).toHaveBeenCalledWith('1234', true, undefined)
})

it('should call onSubTopicClick if item is completed', () => {
   const mockOnItemTextChange = jest.fn()
   const mockonSubTopicClick = jest.fn()
   render(<Item item={{uuid: '1234'}} onSubTopicClick={mockonSubTopicClick} onItemTextChange={mockOnItemTextChange}/>)
   fireEvent.click(screen.getByTestId('subtopic-button'), {button: 1})
   expect(mockonSubTopicClick).toHaveBeenCalledWith('1234')
})


describe('items reducer', () => {
   it('should return the initial state', () => {
      expect(items(undefined, {})).toEqual([])
   })

   it('should handle ADD_ITEM', () => {
      expect(items([{}], {
         type: 'ADD_ITEM',
         payload: {
            uuid: '1234',
            complete: false,
            text: '',
         }
      })).toEqual([
         {},
         {
            uuid: '1234',
            complete: false,
            text: '',
         }
      ])
   })

   it('should handle UPDATE_ITEM', () => {
      expect(items([{
         uuid: '1234',
         complete: false,
         text: '',
      }], {
         type: 'UPDATE_ITEM',
         payload: {
            uuid: '1234',
            updatedItem: {
               complete: true,
               text: 'help me',
            }
         }
      })).toEqual([
         {
            uuid: '1234',
            complete: true,
            text: 'help me',
         }
      ])
   })
})
