import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useEffect} from 'react';

import SaveAllPage from './save-all-page';

export const SectionSelector = ({saveHandler = f => f, ...props}) => {
    
    const createArray = length => [...Array(length)];
    const essayHandler = (selectedEssay) => (props.onFocused(selectedEssay));

    return( 
        <div className='essay-selector'>
          <div className='toolbar'>
            {/* <p className='toolbar-info'>Section Selector</p> */}
            <SaveAllPage saveHandler={saveHandler} />
                <Divider />
            {createArray(6).map((n,i) => (
                <button key={i} className="toolbar-item spaced"
                    onClick={() => essayHandler(i+1)}
                >
                    <i className={`format essay${i+1}-icon`}></i>
                </button>
            ))}
                <Divider />
          </div>
        </div>
    );
}

function Divider() {
    return <div className="divider" />;
  }

