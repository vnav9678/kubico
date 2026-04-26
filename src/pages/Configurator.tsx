import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/cartStore';
import Button from '../components/Button';

interface BaseOption {
  id: string;
  label: string;
  dims: string;
  cols: number;
  rows: number;
  price: number;
}

interface Extension {
  id: string;
  label: string;
  price: number;
}

interface FinishOption {
  id: string;
  label: string;
  color: string;
}

const BASE_OPTIONS: BaseOption[] = [
  { id: 'small', label: 'Small', dims: '60 × 40 cm', cols: 3, rows: 2, price: 89 },
  { id: 'medium', label: 'Medium', dims: '120 × 40 cm', cols: 5, rows: 2, price: 149 },
  { id: 'large', label: 'Large', dims: '180 × 60 cm', cols: 7, rows: 3, price: 229 },
  { id: 'xlarge', label: 'XL', dims: '240 × 80 cm', cols: 9, rows: 4, price: 349 },
];

const EXTENSIONS: Extension[] = [
  { id: 'trellis', label: 'Trellis', price: 29 },
  { id: 'drip', label: 'Drip System', price: 49 },
  { id: 'casters', label: 'Caster Wheels', price: 39 },
  { id: 'sidepanel', label: 'Side Panel', price: 25 },
];

const FINISHES: FinishOption[] = [
  { id: 'natural', label: 'Natural Pine', color: '#C4A265' },
  { id: 'oak', label: 'Treated Oak', color: '#8B5E3C' },
  { id: 'charcoal', label: 'Charcoal', color: '#374151' },
  { id: 'white', label: 'White', color: '#F0EBE3' },
  { id: 'sage', label: 'Sage Green', color: '#40916C' },
];

const STEP_LABELS = ['Base', 'Extensions', 'Finish', 'Review'];

function PreviewSVG({ base, finish }: { base: BaseOption; finish: FinishOption }) {
  const cellW = Math.min(40, Math.floor(340 / (base.cols + 2)));
  const cellH = Math.min(40, Math.floor(200 / (base.rows + 2)));
  const totalW = base.cols * cellW;
  const totalH = base.rows * cellH;
  const startX = (340 - totalW) / 2;
  const startY = (200 - totalH) / 2;
  const woodColor = finish.color === '#F0EBE3' ? '#D9D2C7' : finish.color;

  return (
    <svg width="340" height="200" viewBox="0 0 340 200" role="img" aria-label="Planter preview">
      <rect width="340" height="200" fill="#F0EBE3" rx="12" />
      {Array.from({ length: base.rows }, (_, r) =>
        Array.from({ length: base.cols }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={startX + c * cellW + 2}
            y={startY + r * cellH + 2}
            width={cellW - 4}
            height={cellH - 4}
            rx={3}
            fill={woodColor}
            opacity={0.85}
          />
        ))
      )}
      <rect
        x={startX - 4}
        y={startY - 4}
        width={totalW + 8}
        height={totalH + 8}
        rx={6}
        fill="none"
        stroke={woodColor}
        strokeWidth={2.5}
      />
    </svg>
  );
}

function StepIndicator({ currentStep, total }: { currentStep: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              i < currentStep
                ? 'bg-[#2D6A4F] text-white'
                : i === currentStep
                ? 'bg-[#2D6A4F] text-white ring-4 ring-[#2D6A4F]/20'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {i < currentStep ? (
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-12 md:w-20 transition-colors ${i < currentStep ? 'bg-[#2D6A4F]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Configurator() {
  const [step, setStep] = useState(0);
  const [selectedBase, setSelectedBase] = useState<BaseOption>(BASE_OPTIONS[1]);
  const [selectedExtensions, setSelectedExtensions] = useState<Set<string>>(new Set());
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(FINISHES[0]);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const total = useMemo(() => {
    const extTotal = Array.from(selectedExtensions).reduce((sum, id) => {
      const ext = EXTENSIONS.find(e => e.id === id);
      return sum + (ext?.price || 0);
    }, 0);
    return selectedBase.price + extTotal;
  }, [selectedBase, selectedExtensions]);

  function toggleExtension(id: string) {
    setSelectedExtensions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleAddToCart() {
    const extensions = Array.from(selectedExtensions)
      .map(id => EXTENSIONS.find(e => e.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const configSummary = [
      `Base: ${selectedBase.label} (${selectedBase.dims})`,
      extensions ? `Extensions: ${extensions}` : null,
      `Finish: ${selectedFinish.label}`,
    ]
      .filter(Boolean)
      .join(' | ');

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `custom-${selectedBase.id}-${selectedFinish.id}-${Date.now()}`,
        productId: `custom-${selectedBase.id}`,
        name: `Custom Raised Bed ${selectedBase.label}`,
        price: total,
        quantity: 1,
        finish: selectedFinish.label,
        configSummary,
      },
    });
    navigate('/cart');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#374151] mb-2">Build Your Planter</h1>
        <p className="text-gray-500">Configure your perfect Kubico in three steps.</p>
      </div>

      <StepIndicator currentStep={step} total={STEP_LABELS.length} />

      {/* Running total */}
      <div className="bg-[#2D6A4F] text-white rounded-xl px-6 py-3 mb-8 flex items-center justify-between">
        <span className="text-sm font-medium">Running Total</span>
        <span className="text-2xl font-bold">€{total}</span>
      </div>

      {/* Live preview */}
      <div className="flex justify-center mb-8">
        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <PreviewSVG base={selectedBase} finish={selectedFinish} />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        {step === 0 && (
          <div>
            <h2 className="font-semibold text-[#374151] mb-4">Step 1: Choose your base module</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BASE_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedBase(opt)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedBase.id === opt.id
                      ? 'border-[#2D6A4F] bg-[#2D6A4F]/5'
                      : 'border-gray-200 hover:border-[#2D6A4F]/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-[#374151]">{opt.label}</span>
                    <span className="text-[#2D6A4F] font-bold">€{opt.price}</span>
                  </div>
                  <span className="text-sm text-gray-500">{opt.dims}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-semibold text-[#374151] mb-4">Step 2: Add extensions (optional)</h2>
            <div className="space-y-3">
              {EXTENSIONS.map(ext => (
                <label
                  key={ext.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedExtensions.has(ext.id)
                      ? 'border-[#2D6A4F] bg-[#2D6A4F]/5'
                      : 'border-gray-200 hover:border-[#2D6A4F]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedExtensions.has(ext.id)}
                      onChange={() => toggleExtension(ext.id)}
                      className="accent-[#2D6A4F] w-4 h-4"
                    />
                    <span className="font-medium text-[#374151]">{ext.label}</span>
                  </div>
                  <span className="text-[#2D6A4F] font-semibold">+€{ext.price}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-semibold text-[#374151] mb-4">Step 3: Choose your finish</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FINISHES.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFinish(f)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedFinish.id === f.id
                      ? 'border-[#2D6A4F] bg-[#2D6A4F]/5'
                      : 'border-gray-200 hover:border-[#2D6A4F]/50'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-lg border border-gray-200 flex-shrink-0"
                    style={{ backgroundColor: f.color }}
                  />
                  <span className="font-medium text-[#374151]">{f.label}</span>
                  {selectedFinish.id === f.id && (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="#2D6A4F" className="ml-auto" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-semibold text-[#374151] mb-4">Review your configuration</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Base module</span>
                <span className="font-medium text-[#374151]">{selectedBase.label} ({selectedBase.dims}) — €{selectedBase.price}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Extensions</span>
                <span className="font-medium text-[#374151]">
                  {selectedExtensions.size === 0
                    ? 'None'
                    : Array.from(selectedExtensions)
                        .map(id => {
                          const ext = EXTENSIONS.find(e => e.id === id);
                          return ext ? `${ext.label} (+€${ext.price})` : null;
                        })
                        .filter(Boolean)
                        .join(', ')}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Finish</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: selectedFinish.color }} />
                  <span className="font-medium text-[#374151]">{selectedFinish.label}</span>
                </div>
              </div>
              <div className="flex justify-between py-3 font-bold text-base">
                <span className="text-[#374151]">Total</span>
                <span className="text-[#2D6A4F]">€{total}</span>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full mt-4" onClick={handleAddToCart}>
              Add to Cart — €{total}
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
        >
          &larr; Back
        </Button>
        {step < STEP_LABELS.length - 1 && (
          <Button variant="primary" onClick={() => setStep(s => s + 1)}>
            Next &rarr;
          </Button>
        )}
      </div>
    </div>
  );
}
