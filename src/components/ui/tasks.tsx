import React from 'react';
import { TaskEnum } from '@/types/components/ui/tasks';
import { Checkbox } from '@/components/ui/checkbox';
import { capitalizeFirstLetter } from '@/lib/utils';

type TasksProps = {
    checkedItems: TaskEnum[];
    setCheckedItems: (items: TaskEnum[]) => void;
}
export default function Tasks({ checkedItems, setCheckedItems }: TasksProps) {
    const handleCheckboxChange = (task: TaskEnum) => {
        if (checkedItems.includes(task)) {
            setCheckedItems(checkedItems.filter(item => item !== task));  
        } else {
            setCheckedItems([...checkedItems, task]);  
        }
    };

    return (
        <div className="flex flex-col items-center my-8">
            <h2 className="text-3xl text-center mb-4">Tasks</h2>
            <div className="flex flex-col items-start">
                {Object.values(TaskEnum).map(task => (
                    <div key={task} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                            id={task}
                            checked={checkedItems.includes(task)}
                            onCheckedChange={() => handleCheckboxChange(task)}
                        >
                            {capitalizeFirstLetter(task)}
                        </Checkbox>
                        <label htmlFor={task} className="text-sm font-medium leading-none cursor-pointer">
                            {capitalizeFirstLetter(task)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
