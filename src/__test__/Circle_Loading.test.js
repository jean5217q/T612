import React from 'react'
import Enzyme,{shallow} from 'enzyme'  
import Circle_Loading from '../component/loading/Circle_Loading';     
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })    

test('Circle_Loading',()=>{
  const item = shallow(<Circle_Loading item="test"/>); 
  expect(item.hasClass('loading-circle-wrap')).toBe(true)
})