'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Trash2, Plus, Minus, Upload, Sun, Moon, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { toast, useToast } from "@/hooks/use-toast"

import Image from 'next/image'
import Link from 'next/link'

// This would typically come from a global state management solution
const initialCartItems = [
  { id: 1, name: "HP Pavilion Laptop", price: 799.99, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Samsung 27\" Monitor", price: 299.99, quantity: 2, image: "/placeholder.svg?height=100&width=100" },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPaymentReceipt(event.target.files[0])
    }
  }

  const handleSubmitOrder = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Here you would typically send the order details and receipt to your server
    console.log("Order submitted with receipt:", paymentReceipt)

    setIsSubmitting(false)
    setCartItems([])
    setPaymentReceipt(null)

    toast({
      title: "Order submitted successfully",
      description: "Thank you for your purchase! We'll process your order soon.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer">AJ Computers Store</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/products">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-xl mb-4">Your cart is empty</p>
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="flex items-center p-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-4"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Complete Your Order</CardTitle>
              <CardDescription>Please transfer the total amount and upload your payment receipt to complete your order.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Bank Transfer Details</AlertTitle>
                  <AlertDescription>
                    <p>Bank Name: AJ Bank</p>
                    <p>Account Name: AJ Computers Store</p>
                    <p>Account Number: 1234567890</p>
                    <p>Amount to Transfer: ${total.toFixed(2)}</p>
                  </AlertDescription>
                </Alert>
                <div>
                  <Label htmlFor="receipt">Upload Payment Receipt</Label>
                  <Input 
                    id="receipt" 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*,.pdf"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting || !paymentReceipt}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" /> Submit Order
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AJ Computers Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}