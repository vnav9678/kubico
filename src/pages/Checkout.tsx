import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/cartStore';
import Button from '../components/Button';

type ShippingMethod = 'standard' | 'express';

interface AddressForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

interface PaymentForm {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const STEP_LABELS = ['Address', 'Shipping', 'Payment', 'Confirmation'];

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
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
            <span className="text-xs mt-1 hidden sm:block text-gray-500">{label}</span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className={`h-0.5 w-12 md:w-16 mb-4 transition-colors ${i < currentStep ? 'bg-[#2D6A4F]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

const COUNTRIES = [
  'Austria', 'Belgium', 'Czech Republic', 'Denmark', 'Finland', 'France',
  'Germany', 'Ireland', 'Italy', 'Netherlands', 'Norway', 'Poland',
  'Portugal', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom',
];

export default function Checkout() {
  const { state, totalPrice, dispatch } = useCart();
  const [step, setStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');

  const [address, setAddress] = useState<AddressForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
  });

  const [shipping, setShipping] = useState<ShippingMethod>('standard');
  const shippingCost = shipping === 'standard' ? 9.95 : 19.95;

  const [payment, setPayment] = useState<PaymentForm>({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const vat = totalPrice * 0.21;
  const grandTotal = totalPrice + shippingCost + vat;

  useEffect(() => {
    if (step === 3) {
      const num = `KUB-${Date.now().toString().slice(-8)}`;
      setOrderNumber(num);
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [step, dispatch]);

  function handleAddressSubmit(e: FormEvent) {
    e.preventDefault();
    setStep(1);
  }

  function handlePaymentSubmit(e: FormEvent) {
    e.preventDefault();
    setStep(3);
  }

  function updateAddress(field: keyof AddressForm, value: string) {
    setAddress(prev => ({ ...prev, [field]: value }));
  }

  function updatePayment(field: keyof PaymentForm, value: string) {
    setPayment(prev => ({ ...prev, [field]: value }));
  }

  const fieldClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent bg-white';
  const labelClass = 'block text-xs font-medium text-gray-600 mb-1';

  if (state.items.length === 0 && step !== 3) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#374151] mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add some products before checking out.</p>
        <Link to="/catalog">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-[#374151] mb-8 text-center">Checkout</h1>
      <StepIndicator currentStep={step} />

      {/* Step 1: Address */}
      {step === 0 && (
        <form onSubmit={handleAddressSubmit} noValidate>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#374151] mb-5">Delivery Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelClass}>First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={address.firstName}
                  onChange={e => updateAddress('firstName', e.target.value)}
                  className={fieldClass}
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={address.lastName}
                  onChange={e => updateAddress('lastName', e.target.value)}
                  className={fieldClass}
                  placeholder="Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={address.email}
                  onChange={e => updateAddress('email', e.target.value)}
                  className={fieldClass}
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <input
                  id="phone"
                  type="tel"
                  value={address.phone}
                  onChange={e => updateAddress('phone', e.target.value)}
                  className={fieldClass}
                  placeholder="+31 6 12345678"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>Street Address *</label>
                <input
                  id="address"
                  type="text"
                  required
                  value={address.address}
                  onChange={e => updateAddress('address', e.target.value)}
                  className={fieldClass}
                  placeholder="123 Garden Lane"
                />
              </div>
              <div>
                <label htmlFor="city" className={labelClass}>City *</label>
                <input
                  id="city"
                  type="text"
                  required
                  value={address.city}
                  onChange={e => updateAddress('city', e.target.value)}
                  className={fieldClass}
                  placeholder="Amsterdam"
                />
              </div>
              <div>
                <label htmlFor="postcode" className={labelClass}>Postcode *</label>
                <input
                  id="postcode"
                  type="text"
                  required
                  value={address.postcode}
                  onChange={e => updateAddress('postcode', e.target.value)}
                  className={fieldClass}
                  placeholder="1234 AB"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="country" className={labelClass}>Country *</label>
                <select
                  id="country"
                  required
                  value={address.country}
                  onChange={e => updateAddress('country', e.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select country…</option>
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="primary" size="lg">Continue &rarr;</Button>
          </div>
        </form>
      )}

      {/* Step 2: Shipping */}
      {step === 1 && (
        <div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#374151] mb-5">Shipping Method</h2>
            <div className="space-y-3">
              {[
                { id: 'standard' as ShippingMethod, label: 'Standard Delivery', price: 9.95, desc: '3–5 business days' },
                { id: 'express' as ShippingMethod, label: 'Express Delivery', price: 19.95, desc: '1–2 business days' },
              ].map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    shipping === opt.id ? 'border-[#2D6A4F] bg-[#2D6A4F]/5' : 'border-gray-200 hover:border-[#2D6A4F]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      className="accent-[#2D6A4F]"
                    />
                    <div>
                      <p className="font-medium text-[#374151] text-sm">{opt.label}</p>
                      <p className="text-xs text-gray-400">{opt.desc}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#2D6A4F]">€{opt.price.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(0)}>&larr; Back</Button>
            <Button variant="primary" size="lg" onClick={() => setStep(2)}>Continue &rarr;</Button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 2 && (
        <form onSubmit={handlePaymentSubmit} noValidate>
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-4 flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#B45309" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-yellow-800 font-medium">
              DEMO ONLY — No real payment is processed. Do not enter real card details.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#374151] mb-5">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className={labelClass}>Card Number</label>
                <input
                  id="cardNumber"
                  type="text"
                  required
                  maxLength={19}
                  value={payment.cardNumber}
                  onChange={e => updatePayment('cardNumber', e.target.value)}
                  className={fieldClass}
                  placeholder="•••• •••• •••• ••••"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className={labelClass}>Expiry Date</label>
                  <input
                    id="expiry"
                    type="text"
                    required
                    maxLength={5}
                    value={payment.expiry}
                    onChange={e => updatePayment('expiry', e.target.value)}
                    className={fieldClass}
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className={labelClass}>CVV</label>
                  <input
                    id="cvv"
                    type="text"
                    required
                    maxLength={4}
                    value={payment.cvv}
                    onChange={e => updatePayment('cvv', e.target.value)}
                    className={fieldClass}
                    placeholder="•••"
                  />
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Products</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping ({shipping === 'standard' ? 'Standard' : 'Express'})</span>
                <span>€{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>VAT (21%)</span>
                <span>€{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#374151] pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#2D6A4F]">€{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Button type="button" variant="ghost" onClick={() => setStep(1)}>&larr; Back</Button>
            <Button type="submit" variant="primary" size="lg">Place Order &rarr;</Button>
          </div>
        </form>
      )}

      {/* Step 4: Confirmation */}
      {step === 3 && (
        <div className="text-center">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <div className="w-16 h-16 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#374151] mb-2">Thank you, {address.firstName || 'there'}!</h2>
            <p className="text-gray-500 mb-1">Your order has been placed successfully.</p>
            <p className="text-sm text-gray-400 mb-6">
              Order reference: <span className="font-mono font-semibold text-[#374151]">{orderNumber}</span>
            </p>

            {state.items.length > 0 ? (
              <div className="text-left border border-gray-100 rounded-lg divide-y divide-gray-100 mb-6">
                {state.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 text-sm">
                    <div>
                      <p className="font-medium text-[#374151]">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.finish} · Qty {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-[#374151]">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-left border border-gray-100 rounded-lg p-4 mb-6 text-center text-sm text-gray-400">
                Order items confirmed and cleared from cart.
              </div>
            )}

            <div className="bg-[#F8F5F0] rounded-lg p-4 text-sm text-gray-600 mb-6">
              <p>
                A confirmation email has been sent to{' '}
                <span className="font-medium">{address.email || 'your email'}</span>.
                Delivery to <span className="font-medium">{address.city || 'your address'}</span> is expected in{' '}
                {shipping === 'standard' ? '3–5' : '1–2'} business days.
              </p>
            </div>

            <div className="font-bold text-[#374151] mb-6">
              Total charged: <span className="text-[#2D6A4F]">€{grandTotal.toFixed(2)}</span>
            </div>

            <Link to="/">
              <Button variant="primary" size="lg">Back to Home</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
