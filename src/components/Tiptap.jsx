"use client"

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';
import Heading from "@tiptap/extension-heading";
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

const Tiptap = ({ onChange }) => {
    const editor = useEditor({
        extensions: [
          StarterKit,
          Heading.configure({
            HTMLAttributes: {
              class: "text-xl font-bold",
              levels: [2],
            }
          }),
          Document,
          Paragraph, 
          Text,  
        ],
        content: '',
        editorProps: {
            attributes: {
              class:
                "rounded-md border border-black min-h-[300px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50",
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
    });

    return (
        <div className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
