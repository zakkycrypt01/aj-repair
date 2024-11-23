'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Link from 'next/link'

const products = [
  { id: 1, name: "HP Pavilion Laptop", price: 799.99, category: "Laptop", image: "/placeholder.svg?height=300&width=300" },
  { id: 2, name: "Dell XPS Desktop", price: 1299.99, category: "Desktop", image: "/placeholder.svg?height=300&width=300" },
  { id: 3, name: "Samsung 27\" Monitor", price: 299.99, category: "Monitor", image: "/placeholder.svg?height=300&width=300" },
  { id: 4, name: "Logitech MX Master 3", price: 99.99, category: "Accessory", image: "/placeholder.svg?height=300&width=300" },
  { id: 5, name: "WD 2TB External HDD", price: 79.99, category: "Storage", image: "/placeholder.svg?height=300&width=300" },
  { id: 6, name: "ASUS ROG Gaming Laptop", price: 1499.99, category: "Laptop", image: "/placeholder.svg?height=300&width=300" },
]

export default function HomePage() {
  const [cartItems, setCartItems] = useState(0)

  const addToCart = () => {
    setCartItems(cartItems + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome to AJ Computers Store</h2>
        <p className="text-center max-w-2xl mx-auto">
          At AJ Computers Store, we bring you a seamless online shopping experience where convenience meets trust. Browse through our carefully curated collection of high-quality products, add them to your cart, and complete your purchase with ease using secure bank transfers.
        </p>
        <div className="text-center mt-6">
          <Link href="/products">
            <Button variant="outline" size="lg">Shop Now</Button>
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Featured Products</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-md"
                />
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
                <Badge className="mt-2">{product.category}</Badge>
              </CardContent>
              <CardFooter>
                <Button onClick={addToCart} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/products">
            <Button size="lg">View All Products</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}