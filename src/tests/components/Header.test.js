import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
//import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';

// test('should render Header correctly', () => {
//   const renderer  = new ReactShallowRenderer();
//   renderer.render(<Header />);
//   expect(renderer.getRenderOutput()).toMatchSnapshot();
// });

// test('should render Header correctly', () => {
//   const wrapper = shallow(<Header />);
//   expect(wrapper.find('h1').text()).toBe('Expensify');
// });

// test('should render Header correctly', () => {
//   const wrapper = shallow(<Header />);
//    //toJSON extracts the relevant part (our rendered component, not all enzyme-internal stuff)
//   expect(toJSON(wrapper)).toMatchSnapshot();
// });

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => {}}/>); //dummy function
   //automatic toJSON via the serializer [jest.config.json]
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});

