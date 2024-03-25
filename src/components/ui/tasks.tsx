import { TaskEnum } from '@/types/components/ui/tasks';
import { Checkbox, CheckboxGroup, Text, VStack } from '@chakra-ui/react'
import { capitalizeFirstLetter } from '@/lib/utils';

type TasksProps = {
    checkedItems: TaskEnum[];
    setCheckedItems: (items: TaskEnum[]) => void;
}

export default function Tasks({checkedItems, setCheckedItems} : TasksProps) {
    
    return (
        <div>
            <Text fontSize="3xl" align="center" mb="2rem" mt="2rem">Tasks</Text>
            <CheckboxGroup 
                colorScheme="green"
                value={checkedItems}
                onChange={(values) => setCheckedItems(values as TaskEnum[])}
            >
                <VStack align="start">
                    <Checkbox value={TaskEnum.SUMMARISE}>{capitalizeFirstLetter(TaskEnum.SUMMARISE)}</Checkbox>
                    <Checkbox value={TaskEnum.PRACTICE}>{capitalizeFirstLetter(TaskEnum.PRACTICE)}</Checkbox>
                </VStack>
            </CheckboxGroup>
        </div>
    )
}
