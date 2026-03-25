interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export const ToggleSwitch = ({
  label,
  checked,
  onChange,
}: ToggleSwitchProps) => (
  <label
    className="flex cursor-pointer items-center gap-2.5"
    onClick={() => onChange(!checked)}
  >
    <div
      className={`relative h-5 w-9 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-border'}`}
      role="switch"
      aria-checked={checked}
    >
      <div
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`}
      />
    </div>
    <span className="text-xs font-semibold text-text-secondary">{label}</span>
  </label>
);
