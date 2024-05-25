import React from 'react';
import { ContentEnum } from '@/types/logic/content';
import { Checkbox } from '@/components/ui/checkbox';
import { capitalizeFirstLetter } from '@/lib/utils';

type ContentProps = {
    checkedItems: ContentEnum[];
    setCheckedItems: (items: ContentEnum[]) => void;
}
export default function Content({ checkedItems, setCheckedItems }: ContentProps) {
    const handleCheckboxChange = (content: ContentEnum) => {
        if (checkedItems.includes(content)) {
            setCheckedItems(checkedItems.filter(item => item !== content));  
        } else {
            setCheckedItems([...checkedItems, content]);  
        }
    };

    return (
        <div className="flex flex-col items-center my-8">
            <h2 className="text-3xl text-center mb-4">Content</h2>
            <div className="flex flex-col items-start">
                {Object.values(ContentEnum).map(content => (
                    <div key={content} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                            id={content}
                            checked={checkedItems.includes(content)}
                            onCheckedChange={() => handleCheckboxChange(content)}
                        >
                            {capitalizeFirstLetter(content)}
                        </Checkbox>
                        <label htmlFor={content} className="text-sm font-medium leading-none cursor-pointer">
                            {capitalizeFirstLetter(content)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
