import { $getRoot, $getSelection } from 'lexical';
import { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { useLocalStorage } from 'react-use'


import { theme } from './theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import PlaygroundAutoLinkPlugin from './plugins/AutoLinkPlugin';
import SaveContent from './save-content';




function GetEditor(props) {
  const [editor] =  useLexicalComposerContext();
  useEffect(() => {
    props.editorElement(editor);
  }, [editor])
}

function MyCustomAutoFocusPlugin(props) {
  const [editor] = useLexicalComposerContext();
  const onFocused = props.onFocused;

  useLayoutEffect(() => {
    // Focus the editor when the effect fires!
    if(onFocused) { 
      editor.setEditable(true);
      editor.focus(); 
    } else {
      editor.setEditable(false);
    }
  }, [onFocused, editor]);

  return null;
}

function RestoreFromLocalStoragePlugin(essayNo) {
  const [editor] = useLexicalComposerContext();
  const [serializedEditorState, setSerializedEditorState] = useLocalStorage(`my-editor-state-example-key-${essayNo}`, null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);

      if (serializedEditorState) {
        const initialEditorState = editor.parseEditorState(serializedEditorState);
        editor.setEditorState(initialEditorState);
      }
    }
  }, [isFirstRender, serializedEditorState, editor]);

  const onChange = useCallback(
    (editorState) => {
      setSerializedEditorState(JSON.stringify(editorState.toJSON()));
    },
    [setSerializedEditorState]
  )

    return <OnChangePlugin onChange={onChange} />
}

// function SaveContent({essayNo, setContent = f => f}) {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     setContent(JSON.stringify(editor.getEditorState()));
//   }, [editor]);

//   return null;
// }


export default function Editor({essayNo, onFocused, setContent = f => f}) {
  
  const [editable, setEditable] = useState(true);
  
  const [showToolbar, setShowToolbar] = useState(false);
  const editorStateRef = useRef();

  useEffect(()=> {
    setShowToolbar(onFocused);
  }, [onFocused])

  useEffect(() => {
    setContent(editorStateRef.current);
  });

  const editorConfig = {
    namespace: 'MyEditor', 
    theme: theme,
    editable: editable,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
  ]
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className='editor-toolbar'>
          <ToolbarPlugin toolbarState={showToolbar}/>
        </div>
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-input' />}
            placeholder={<Placeholder essayNo={essayNo}/>}
            ErrorBoundary={LexicalErrorBoundary}
          /> 
          {/* <OnChangePlugin onChange={editorState => editorStateRef.current = editorState} /> */}
          <RestoreFromLocalStoragePlugin essayNo={essayNo}/>
          <MyCustomAutoFocusPlugin onFocused={onFocused}/>
          
          {/* <AutoFocusPlugin /> */}
          {/* <SaveContent stateRef={() => {
              if (editorStateRef.current) {
                setContent(JSON.stringify(editorStateRef.current));
                console.log(JSON.stringify(editorStateRef.current));
              }
            }}/> */}
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div> 
    </LexicalComposer>
  );
}

function Placeholder(props) {
  return (
    <div className="editor-placeholder">
      {props.essayNo}
    </div>
  );
}