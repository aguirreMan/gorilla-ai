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

    return (
        <div className='pt-6 w-[50%] ml-8 flex justify-center items-center cursor-pointer'>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={1}
                onValueChange={(value) => onChange(value[0])}
                disabled={disabled}
                className='[&_[data-slot=slider-track]]:bg-green-500 
[&_[data-slot=slider-range]]:bg-neutral-800'
            />
        </div>
    )
}