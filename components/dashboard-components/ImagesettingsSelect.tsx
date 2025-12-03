import {
    Select, SelectContent, SelectTrigger,
    SelectValue, SelectLabel, SelectGroup, SelectItem
} from '@/components/ui/select'


interface ImagesettingsSelectProps<Type extends string> {
    label: string
    currentValue: Type
    options: Type[]
    onChange: (newValue: Type) => void
}

//Make this a generic component 
export default function ImagesettingsSelect<Type extends string>({
    label, currentValue, options, onChange }: ImagesettingsSelectProps<Type>) {

    return (
        <Select value={currentValue} onValueChange={(value) => onChange(value as Type)}>
            <SelectTrigger className='w-full bg-white/20 cursor-pointer'>
                <SelectValue>{currentValue}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map(option => (
                        <SelectItem className='cursor-pointer' key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}