import { useState } from 'react';
import './App.css';
import { SectionSelector } from './section-selector';
import { Essay5, Essay6 } from './essay-third';

import ToolbarPlugin from './plugins/ToolbarPlugin';


function App() {
  const [showDraftArea, setShowDraftArea] = useState(false);
  const [essayFocused, setEssayFocused] = useState(null);

  
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
        <SectionSelector onFocused={setEssayFocused} />
        <div className='third_wrapper'>
          <Essay5 onFocused={essayFocused}/>
          <Essay6 onFocused={essayFocused}/>
        </div>
        <div className='first_wrapper'>
          <div className='essay1'>
              qu’elle emprunte à ma pensée dont elle est un mode ; mas que telle idée contienne telle ou telle réalité objective plutôt qu’une autre, qu’elle emprunte à ma pensée dont elle est un mode ; mas que telle idée contienne telle ou telle réalité objective plutôt qu’une autre, cela, assurément, elle doit le tenir de quelque cause dans laquelle il y ait pour le moins autant de réalité formelle qu’elle en contient elle- même d’objective. En effet , si nous posons qu’il se rencontre dans l’idée quelque chose qui n’a pas été dans sa cause, elle le tient donc du néant ; or, pour imparfait que soit ce mode d’être par lequel une chose est à titre d’objet dans l’entendement par l’entremise d’une idée, il est pourtant sûr que ce n’est pas rien du tout, et par conséquent cela ne saurait provenir du néant.
          </div>
        </div>  
      </div> 
      
      {/* <div className='draftArea' style={{visibility: showDraftArea ? 'visible' : 'hidden'}}>
          <Editor />
      </div> */}
    </div>
  );
}

export default App;


