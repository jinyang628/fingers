import Editor from '@/components/ui/editor';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';

export default function Output() {
    const { data } = useAppContext();
    const { summary, practice } = data;

    return (
        // ML will need to give the default langauge input here 
        <div>
            <Editor defaultLanguage="javascript"/>

            {/* TODO: Format summary nicely and put practice code in the editor */}
            <p>Summary: {summary}</p>
            <p>Practice: {practice}</p>
        </div>
    );
}