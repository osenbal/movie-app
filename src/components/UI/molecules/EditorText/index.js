import React, { useState } from 'react';

// Editor react
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './editor-text.css';

function EditorText({ valueInput }) {
  const [htmlContent, setHtmlContent] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setHtmlContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    valueInput(htmlContent);
  };
  return (
    <Editor
      placeholder="Descriptions"
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
}

export default EditorText;
