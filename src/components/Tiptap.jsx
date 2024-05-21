"use client"

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';

const Tiptap = ({ onChange, initialContent }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { HTMLAttributes: { class: "text-xl font-bold", levels: [2] } }
            })
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: "rounded-md border border-black min-h-[300px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50",
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
