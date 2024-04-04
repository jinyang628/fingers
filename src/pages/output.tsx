import Editor from '@/components/ui/editor';
import React, { useEffect, useState } from 'react';
import { useAppContext, SummaryType, PracticeType } from '../AppContext';

export default function Output() {
    const { data } = useAppContext();
    const { summary, practice } = data;

    const formatSummary = (summary: SummaryType) => {
        if (!summary) return 'No summary available';
        return Object.entries(summary).map(([key, value], index) => (
            <div key={index}>
                <strong>{key}:</strong> {value}
            </div>
        ));
    };

    const formatPractice = (practice: PracticeType) => {
        if (!practice) return 'No practice available';
        return practice.map((item, index) => (
            <div key={index}>
                <p>Language</p>
                <strong>{item.language}</strong> 
                <p>Question</p>
                <strong>{item.question}</strong> 
                <p>Answer</p>
                <strong>{item.answer}</strong>
                <br/>
            </div>
        ));
    }
    

    return (
        // ML will need to give the default langauge input here 
        <div>
            <Editor defaultLanguage="javascript"/>

            {/* TODO: Format summary nicely and put practice code in the editor */}
            <p>Summary: {formatSummary(summary as SummaryType)}</p>
            <p>Practice: {formatPractice(practice as PracticeType)}</p>
        </div>
    );
}