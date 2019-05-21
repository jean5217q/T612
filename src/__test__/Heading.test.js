import React from 'react'
import Enzyme,{shallow} from 'enzyme'  
import Heading from '../component/home/component/Heading'; 
import { homepage }  from '../data/Content';  
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })    

test('Heading',()=>{
  const item = shallow(
    <Heading 
      item="test"
      homepage= {homepage}
      lang={0}
    />); 
  expect(item.find(`.heading-title.lang-0`).text()).toEqual('Trip Plan Making')
})

test('Heading',()=>{
  const item = shallow(
    <Heading 
      item="test"
      homepage= {homepage}
      lang={1}
    />); 
  expect(item.find(`.heading-title.lang-1`).text()).toEqual('制定專屬的旅行計畫')
})