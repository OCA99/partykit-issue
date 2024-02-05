import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
// Import CodeMirror CSS
import 'codemirror/lib/codemirror.css';
// Import the theme and any additional styles or modes you need
import 'codemirror/theme/material.css'; // Example for a theme, optional
import 'codemirror/mode/javascript/javascript'; // Optional, for JavaScript mode
import useYProvider from "y-partykit/react";
import * as Y from "yjs";
import * as awarenessProtocol from 'y-protocols/awareness'
// @ts-ignore
import { CodemirrorBinding } from 'y-codemirror';

const TextEditor = () => {
	const yDocRef = useRef<Y.Doc | null>(null);
	if (!yDocRef.current) {
		yDocRef.current = new Y.Doc();
	}

	const provider = useYProvider({
		host: window.location.host,
		room: 'my-document-name',
		doc: yDocRef.current,
		options: {
			awareness: new awarenessProtocol.Awareness(yDocRef.current),
		},
	});

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		if (textAreaRef.current && yDocRef.current) {
			const yText = yDocRef.current.getText('codemirror');

			const editor = CodeMirror.fromTextArea(textAreaRef.current, {
				lineNumbers: true,
				mode: 'text/plain', // Use 'text/plain' for plain text
				theme: 'neat', // Optional: use if you've imported a theme
			});

			const binding = new CodemirrorBinding(yText, editor, provider.awareness);

			return () => {
				binding.destroy();
				provider.disconnect()
				editor.toTextArea();
			};
		} else {
			throw new Error('No text area ref found');
		}
	}, []);

	return <textarea ref={textAreaRef} />;
};

export default TextEditor;