import { useState } from 'react';
import './App.css';
import { SectionSelector } from './section-selector';
import { Essay1 } from './essay-first';
import { Essay5, Essay6 } from './essay-third';


import ToolbarPlugin from './plugins/ToolbarPlugin';


function App() {
  const [showDraftArea, setShowDraftArea] = useState(false);
  const [essayFocused, setEssayFocused] = useState(null);

  const [Essay1Content, setEssay1Content] = useState(null);
  const [Essay2Content, setEssay2Content] = useState(null);
  const [Essay3Content, setEssay3Content] = useState(null);
  const [Essay4Content, setEssay4Content] = useState(null);
  const [Essay5Content, setEssay5Content] = useState(null);

  const allContent = [Essay1Content, Essay2Content, Essay3Content, Essay4Content, Essay5Content];


  
  return (
    <div className="App">
      <div className='Header'>
        <p className='Header_loveSec'>
          For Michael
        </p>
        <div className='Header_title'>
          Talmud 
          <div className='Header_title_sub'> תַּלְמוּד‎ </div>
          Layout Generator
        </div>
      </div>
      <div className='preview'>
        <SectionSelector onFocused={setEssayFocused} saveHandler={() => {console.log(Essay4Content)}}/>
        <div className='third_wrapper'>
          <Essay5 onFocused={essayFocused} setContent={setEssay4Content} />
          <Essay6 onFocused={essayFocused} setContent={setEssay5Content} />
        </div>
        <div className='first_wrapper'>
          <Essay1 onFocused={essayFocused}/>
        </div>  
      </div> 
      
      {/* <div className='draftArea' style={{visibility: showDraftArea ? 'visible' : 'hidden'}}>
          <Editor />
      </div> */}
    </div>
  );
}

export default App;


