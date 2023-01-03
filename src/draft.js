import { $getRoot, $getSelection } from 'lexical';
import { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    // Focus the editor when the effect fires!
    if(props.onFocused) { editor.focus(); }
  }, [props.onFocused, editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}




export default function Editor(props) {
  
  const [saveContent, setSaveContent] = useState(null);
  const [editable, setEditable] = useState(true);
  const onFocused = props.onFocused;
  const [showToolbar, setShowToolbar] = useState(false);

  const placeholder = props.essayNo;

  useEffect(()=> {
    setShowToolbar(onFocused);
  }, [onFocused])

  const editorConfig = {
    namespace: 'MyEditor', 
    theme: theme,
    editable: editable,
    onError,
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
            placeholder={<Placeholder essayNo={placeholder}/>}
            ErrorBoundary={LexicalErrorBoundary}
          /> 
          <OnChangePlugin onChange={onChange} />
          {/* <TreeViewPlugin /> */}
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin onFocused={onFocused}/>
          {/* <AutoFocusPlugin /> */}
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            {/* <SaveContentButton editable={editable}/>
            <button onClick={()=>{setEditable(true)}}>parent!</button> */}
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