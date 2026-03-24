import { LAYER_DEFINITIONS } from '@/lib/constants';
import type { Layer } from '@/lib/types';

interface LayerTabsProps {
  activeLayer: Layer;
  onLayerChange: (layer: Layer) => void;
}

export const LayerTabs = ({ activeLayer, onLayerChange }: LayerTabsProps) => (
  <div className="flex border-b border-border">
    {LAYER_DEFINITIONS.map((def) => (
      <button
        key={def.layer}
        type="button"
        className="layer-tab"
        data-active={def.layer === activeLayer}
        onClick={() => onLayerChange(def.layer)}
      >
        {def.label}
        <span className="ml-2 text-[10px] font-normal tracking-normal text-inherit opacity-50">
          {def.sensorRange}
        </span>
      </button>
    ))}
  </div>
);
