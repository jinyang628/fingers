import { _get } from '@/api/inference/_get';
import Editor from '@/components/ui/editor';
import React, { useEffect, useState } from 'react';

export default function Output() {
    const [data, setData] = useState({ summary: '', code: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        _get().then(response => {
            setData(response);
            setIsLoading(false);
        }).catch(error => {
            console.error("Failed to fetch data:", error);
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return (
        // ML will need to give the default langauge input here 
        <Editor defaultLanguage="javascript"/>
    );
}