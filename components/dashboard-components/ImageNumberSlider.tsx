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
        <div className='flex w-full flex-col gap-2'>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={1}
                onValueChange={(value) => onChange(value[0])}
                disabled={disabled}
                className='
                `**:data-[slot=slider-track]:bg-background`
          `**:data-[slot=slider-range]:bg-primary`
          `**:data-[slot=slider-thumb]:border-border`
          `**:data-[slot=slider-thumb]:bg-background`
          `**:data-[slot=slider-thumb]:ring-offset-background`
          `focus-visible:**:data-[slot=slider-thumb]:ring-2`
          `focus-visible:**:data-[slot=slider-thumb]:ring-ring`'
            />
        </div>
    )
}