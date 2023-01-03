import { $getRoot, $getSelection } from 'lexical';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

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

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);

  });
}

function GetEditor(props) {
  const [editor] =  useLexicalComposerContext();
  useEffect(() => {
    props.editorElement(editor);
  }, [editor])
}

function SaveContentButton({editable = true}) {
  const [editor] =  useLexicalComposerContext();
  const word = editable.toString();
  const onEdit = editor.isEditable();
  useEffect(() => {
      console.log(editable);
  }, [])
  
  return(
    <>
      <button onClick={() => {editor.setEditable(false)}}>So False</button>
      <button onClick={() => {console.log(editor.isEditable())}}>Now {word}</button>
      <button onClick={() => {editor.setEditable(true)}}>So True</button>
    </>
  )
}

function BeEditable(editable) {
  const [editor] =  useLexicalComposerContext();
  if (!editor.isEditable()) {
    return editor.setEditable(editable);
  } else { return null }
}


// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
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

function SaveContent({essayNo, setContent = f => f}) {
  const [editor] = useLexicalComposerContext();
  const content = JSON.stringify(editor.getEditorState());

  useEffect(() => {
    setContent(content);
  }, [content, editor])
}


export default function Editor(props) {
  
  
  const [editable, setEditable] = useState(true);
  const onFocused = props.onFocused;
  const setContent = props.setContent;
  const [showToolbar, setShowToolbar] = useState(false);

  const essayNo = props.essayNo;

  useEffect(()=> {
    setShowToolbar(onFocused);
  }, [onFocused])

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
          <OnChangePlugin onChange={onChange} />
          {/* <TreeViewPlugin /> */}
          <HistoryPlugin />
          {/* <EditModeSwitch onFocused={onFocused}/> */}
          <MyCustomAutoFocusPlugin onFocused={onFocused}/>
          
          {/* <AutoFocusPlugin /> */}
          <SaveContent essayNo={essayNo} setContent={setContent}/>
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