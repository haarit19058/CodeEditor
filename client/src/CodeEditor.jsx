import { useEffect,useRef,useCallback, useState } from "react";
import * as monaco from "monaco-editor";
import "./CodeEditor.css"
import { v4 as uuidv4 } from 'uuid';

export default function CodeEditor(){
    const [myEditor,setMyEditor] = useState()


    const wrapperRef = useCallback(()=>{
        const value = /* set from `myEditor.getModel()`: */ `function hello() {
            alert('Hello world!');
        }`;
        
        const monacoEditor = document.getElementById("container")
        
        let Editor = monaco.editor.create(monacoEditor, {
            value: 'function hello() {\n\talert("Hello world!");\n}',
            language: "javascript",
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            minimap: {
                enabled: true,
                maxColumn: 80
            },
            wordWrap: 'on',
            tabSize: 2,
            insertSpaces: true,
            cursorStyle: 'line',
            cursorBlinking: 'blink',
            smoothScrolling: true,
            accessibilitySupport: 'on',
            ariaLabel: 'Code editor',
            suggestOnTriggerCharacters: true,
            quickSuggestions: {
                other: true,
                comments: false,
                strings: true
            },
            parameterHints: {
                enabled: true
            },
            hover: {
                enabled: true
            },
            formatOnType: true,
            formatOnPaste: true,
            codeActionsOnSave: {
                source: {
                    organizeImports: true
                }
            },
            validateOnInput: true,
            enableSchemaRequest: true
        });

        
    })
    
    
    
    const changeFileName = (e)=>{
        fileRef.current = e.target.value
        let ext = getFileExtension(fileRef.current)
        console.log(ext)
        let lang = setDocLang(ext)
        console.log(lang)
        let currentModel = myEditor.getModel()
        const newModel = monaco.editor.createModel(currentModel.getValue(), lang);
        myEditor.setModel(newModel);
    }
    let fileRef = useRef("Untitled.txt")


    function getFileExtension(file) {
        if (typeof file !== 'string') {
          throw new TypeError('Expected a string');
        }
        
        const parts = file.split('.');
        if (parts.length > 1) {
          return parts.pop(); // Get the last part after the last dot
        }
        return ''; // Return empty string if there is no extension
      }
      

      const setDocLang = (fileext) => {
        if (!fileext) return "plaintext"; // Default to plaintext for empty or null extensions
      
        const extToLangMap = {
          'js': 'javascript',
          'jsx': 'javascript',
          'ts': 'typescript',
          'tsx': 'typescript',
          'py': 'python',
          'c': 'c',
          'cpp': 'cpp',
          'cc': 'cpp',
          'cs': 'csharp',
          'java': 'java',
          'html': 'html',
          'htm': 'html',
          'css': 'css',
          'scss': 'scss',
          'less': 'less',
          'json': 'json',
          'xml': 'xml',
          'yml': 'yaml',
          'yaml': 'yaml',
          'php': 'php',
          'rb': 'ruby',
          'rs': 'rust',
          'go': 'go',
          'md': 'markdown',
          'sh': 'shell',
          'bat': 'bat',
          'pl': 'perl',
          'swift': 'swift',
          'r': 'r',
          'kt': 'kotlin',
          'sql': 'sql',
          'ini': 'ini',
          'toml': 'toml'
          // Add more file extensions and corresponding Monaco Editor languages as needed
        };
      
        return extToLangMap[fileext] || 'plaintext'; // Default to plaintext if the extension is not found
      };
      







    // useEffect(()=>{
    //     const url = 'https://localhost:5000/editData';
    //     const data = {
    //     _id:uuidv4(),
    //     fileName:fileRef.current,
    //     fileExt: getFileExtension(fileRef.current),
    //     text: myEditor.getValue()
    //     };
    //     console.log(data)

    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    // },[myEditor.getValue(),fileRef.current])

    return(
        <>
        <label htmlFor="fileName" style={{color:"#EEEEEE"}}>Enter Name of the file: </label>
        <input type="text" ref={fileRef} onChange={changeFileName} name="fileName"/>
        <div className="container" id="container" defaultValue="Untitled.txt" ref={wrapperRef}></div>
        </>
    )
}