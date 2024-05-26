import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';

const Tiptap = ({ onChange, initialContent, editable = true }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { HTMLAttributes: { class: 'text-xl font-bold', levels: [2] } }
            })
        ],
        content: initialContent,
        editable: editable,
        editorProps: {
            attributes: {
                class: `prose prose-lg max-w-none p-4  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${editable && 'border border-gray-300'}`,
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange(html);
        },
    });

    // Update editor content when initialContent changes
    useEffect(() => {
        if (editor && initialContent !== editor.getHTML()) {
            editor.commands.setContent(initialContent);
        }
    }, [initialContent, editor]);

    return (
        <div className='text-center p-4 rounded-md shadow-sm'>
            {editable && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;
