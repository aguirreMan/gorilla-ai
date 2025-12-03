import { Slider } from '@/components/ui/slider'

export interface ImageNumberSliderProps {
    value: number
    min: number
    max: number
    onChange: (newValue: number) => void
    disabled: boolean
}

export default function ImageNumberSlider({ value, min, max, onChange, disabled }: ImageNumberSliderProps) {
    return (
        <div className='pt-6 w-full flex justify-center items-center'>
            <Slider
                value={[value]}
                min={min}
                max={max}
                onValueChange={(value) => onChange(value[0])}
                disabled={disabled}
            />
        </div>
    )
}