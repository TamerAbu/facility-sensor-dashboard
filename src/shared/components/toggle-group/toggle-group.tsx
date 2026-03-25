interface ToggleOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface ToggleGroupProps<T extends string> {
  options: ToggleOption<T>[];
  active: T;
  onChange: (value: T) => void;
}

export const ToggleGroup = <T extends string>({
  options,
  active,
  onChange,
}: ToggleGroupProps<T>) => (
  <div className="flex rounded-lg bg-surface-secondary p-0.5">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => onChange(opt.value)}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
          active === opt.value
            ? 'bg-foreground text-white shadow-sm'
            : 'text-text-secondary hover:text-foreground'
        }`}
      >
        {opt.icon}
        {opt.label}
      </button>
    ))}
  </div>
);
