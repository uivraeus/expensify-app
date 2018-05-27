import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../../components/DeleteModal';
import { wrap } from 'module';

let onYes, onNo, wrapper;
beforeEach(() => {
  onYes = jest.fn();
  onNo = jest.fn();
  wrapper = shallow(
    <DeleteModal
      queryConfirm={true} 
      onYes={onYes} 
      onNo={onNo} 
    />
  );
});

test('should render DeleteModal component with modal active', () => {
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
});

test('should handle No click', () => {
  const noBtn = wrapper.find('button').filterWhere(n => n.text()==='No');
  noBtn.simulate('click');
  
  expect(onNo).toHaveBeenCalled();
  expect(onYes).not.toHaveBeenCalled();  
});

test('should handle Yes click', () => {
  const noBtn = wrapper.find('button').filterWhere(n => n.text()==='Yes');
  noBtn.simulate('click');
  
  expect(onYes).toHaveBeenCalled();
  expect(onNo).not.toHaveBeenCalled();  
});