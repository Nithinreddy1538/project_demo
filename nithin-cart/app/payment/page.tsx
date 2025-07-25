'use client';

import { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Header } from '@/components/layout/Header';
import { ShoppingBag, CreditCard, Smartphone, Building, Truck, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PaymentPage() {
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful! Order placed.');
      clearCart();
      setLoading(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some items to your cart to proceed with payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Choose Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                {/* UPI Payment */}
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">UPI Payment</p>
                      <p className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</p>
                    </div>
                  </Label>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="yourname@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                )}

                {/* Net Banking */}
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Net Banking</p>
                      <p className="text-sm text-gray-600">Pay using your bank account</p>
                    </div>
                  </Label>
                </div>

                {/* Credit/Debit Card */}
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                    </div>
                  </Label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="ml-6 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {/* Cash on Delivery */}
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Truck className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when your order is delivered</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-6 space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Your payment information is encrypted and secure. 100% safe transactions.
                  </p>
                </div>

                <Button 
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-700" 
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Processing Payment...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}