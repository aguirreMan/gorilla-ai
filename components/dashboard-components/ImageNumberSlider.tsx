import { Slider } from '@/components/ui/slider'

export interface ImageNumberSliderProps {
    value: number
    min: number
    max: number
    onChange: (newValue: number) => void
    disabled: boolean
    step: number
}


export default function ImageNumberSlider({
    value,
    min,
    max,
    onChange,
    disabled }: ImageNumberSliderProps) {

    //Change shad/cn slider to reverse so that it fills with white space when slided all the way


    return (
        <div className='pt-6 w-[50%] ml-8 flex justify-center items-center cursor-pointer'>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={1}
                onValueChange={(value) => onChange(value[0])}
                disabled={disabled}
                className='`**:[[role=slider]]:bg-white`(suggestCanonicalClasses) 
                [&_.bg-primary]:bg-transparent [&_span:first-child]:bg-gray-900'
            />
        </div>
    )
}