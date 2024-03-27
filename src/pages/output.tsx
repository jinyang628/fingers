import Editor from '@/components/ui/editor';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';

export default function Output() {
    const { data } = useAppContext();
    const { summary, practice } = data;

    const formatSummary = (summary: Record<string, string>) => {
        if (!summary) return 'No summary available';
        return Object.entries(summary).map(([key, value], index) => (
            <div key={index}>
                <strong>{key}:</strong> {value}
            </div>
        ));
    };
    
    return (
        // ML will need to give the default langauge input here 
        <div>
            <Editor defaultLanguage="javascript"/>

            {/* TODO: Format summary nicely and put practice code in the editor */}
            <p>Summary: {formatSummary(summary as Record<string, string>)}</p>
            <p>Practice: {practice}</p>
        </div>
    );
}