type Props = {
  id: string
  label: string
  value: number
  choices: readonly { label: string; width: number }[]
  onChange: (width: number) => void
  help?: string
}

export default function ViewingSizeControl({ id, label, value, choices, onChange, help = 'Shrink just the image to compare the effect. Larger sizes fit your screen.' }: Props) {
  return (
    <div className="mt-6">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(Number(event.currentTarget.value))} aria-describedby={`${id}-help`} className="mt-3 min-h-11 w-full rounded-md border border-slate-400 bg-transparent px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">
        {choices.map((size) => <option key={size.width} value={size.width}>{size.label}</option>)}
      </select>
      <p id={`${id}-help`} className="mt-3 text-xs leading-relaxed text-slate-600">{help}</p>
    </div>
  )
}
