import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import AddedPages from "../CommonComponents/AddedPages";
import {useSelector, useDispatch, connect} from 'react-redux';
import {UPDATE_CONTENT, GET_CONTENT} from '../Store/action';
import Button from "../CommonComponents/Button";
import store from "../../index"; // Import your action creator

const Editor = (props) => {
  const [editor, setEditor] = useState(null);
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content);

  useEffect(() => {
    setEditorFunction();
  }, []);

  const setEditorFunction = () => {
    const editorInstance = grapesjs.init({
      container: "#editor",
      fromElement: true,
      components: content,
      plugins: [gjsBlocksBasic],
      pluginsOpts: {
        gjsBlocksBasic: {},
      },
    });
    setEditor(editorInstance);
  };
  const onLoad = () => {
      if (window.location.pathname.includes('editor')){
          let url = window.location.pathname;
          url = url.split("/");
          let slug = url[url.length - 2];
          let contentToBeSaved = false;
           props.pages.filter(p=> {
                if (p.slug === slug && !p.content){
                    contentToBeSaved = true;
                }
            });
          contentToBeSaved ? saveContent() : getContent();
      }
  }
  const getContent = () => {
      let url = window.location.pathname;
      url = url.split("/");
      let slug = url[url.length - 2];
      let contentArr = props.pages.filter(p => p.slug === slug);
      let contentObj = contentArr ? contentArr[0] : null
      if (contentObj){
          editor.setComponents(contentObj.content);
      }
  }
  editor?.on('load', model => {
      onLoad()
  })
  editor?.on('component:update', (model) => {
    // dispatch(updateContent(editor.getHtml()));
  })
    const saveContent = () => {
      let url = window.location.pathname;
      url = url.split("/");
      let slug = url[url.length - 2];
    store.dispatch({
        type: UPDATE_CONTENT,
        payload: {
            page: slug,
            content: editor.getHtml(),
        },
    })   }
  return (
    <div>
      <div id="editor" />
        <Button onClickFunction={saveContent} buttonName={'Save'} name={'save'}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      pages: state.pages,
  };
};
export default connect(mapStateToProps)(Editor);

// import React, {useEffect, useState} from "react";
// import grapesjs from "grapesjs";
// import gjsBlocksBasic from "grapesjs-blocks-basic";
// import AddedPages from "../CommonComponents/AddedPages";
// import { useSelector, useDispatch } from 'react-redux';
//
// const Editor = () =>{
//     const [editor, setEditor] = useState(null);
//     useEffect(()=>{
//         setEditorFunction()
//     }, [])
//
//   const dispatch = useDispatch();
//   const content = useSelector((state) => state.content);
//     const setEditorFunction = ()=> {
//         const editor = grapesjs.init({
//                on(event, payload) {
//                    console.log('event', event)
//                   if (event === 'canvas:updated') {
//                     // Get the updated content from GrapesJS
//                     const updatedContent = editor.getHtml(); // This might vary depending on your usage
//                     // Update Redux store with the new content
//                     dispatch(() => ({
//                       type: 'UPDATE_CONTENT',
//                       payload: updatedContent,
//                     }));
//                   }
//                 },
//             container: "#editor",
//             fromElement: true, // Set this to true to use the initial content from the element
//             components: content,
//             plugins: [gjsBlocksBasic],
//             pluginsOpts:{
//                 gjsBlocksBasic: {},
//             }
//         })
//         setEditor(editor);
//     }
//     return (
//         <div>
//             <div dangerouslySetInnerHTML={{__html: editor}}/>
//             <div id={"editor"}></div>
//         </div>
//     )
// }
// export default Editor;