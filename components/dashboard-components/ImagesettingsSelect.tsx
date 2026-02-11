import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup,
    SelectItem
} from '@/components/ui/select'


export interface ImagesettingsSelectProps<Type extends string> {
    label: string
    currentValue: Type
    options: Type[]
    onChange: (newValue: Type) => void
}

//Make this a generic component
export default function ImagesettingsSelect<Type extends string>({
    label, currentValue, options, onChange }: ImagesettingsSelectProps<Type>) {

    return (
        <div className='flex flex-col gap-2'>
            {/**label  */}
            <span className='text-sm font-medium text-muted-foreground'>
                {label}
            </span>

            <Select
                value={currentValue}
                onValueChange={(value) => onChange(value as Type)}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>

                <SelectContent className='z-50'>
                    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm' />
                    <div className='relative z-100'>
                        <SelectGroup>
                            <SelectLabel>{label}</SelectLabel>
                            {options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </div>
                </SelectContent>
            </Select>
        </div>
    )
}
