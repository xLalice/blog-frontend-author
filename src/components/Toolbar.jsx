// src/components/Toolbar.jsx

"use client";
import {
    Bold,
    Strikethrough,
    Italic,
    Heading2,
} from "lucide-react";
import Toggle from "./Toggle";

export default function Toolbar({ editor }) {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex space-x-2 justify-center mb-2">
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
            >
                <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() => {
                    editor.chain().focus().toggleBold().run();
                }}
            >
                <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() => {
                    editor.chain().focus().toggleStrike().run();
                }}
            >
                <Strikethrough className="h-4 w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => {
                    editor.chain().focus().toggleItalic().run();
                }}
            >
                <Italic className="h-4 w-4" />
            </Toggle>
        </div>
    );
}
