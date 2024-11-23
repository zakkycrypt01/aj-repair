'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Search, X, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import Link from 'next/link'

const products = [
//   { 
//     id: 1, 
//     name: "HP Pavilion Laptop", 
//     price: 799.99, 
//     category: "Laptop", 
//     images: [
//       "/placeholder.svg?height=300&width=300",
//       "/placeholder.svg?height=300&width=300&text=Side+View",
//       "/placeholder.svg?height=300&width=300&text=Keyboard",
//       "/placeholder.svg?height=300&width=300&text=Ports",
//     ]
//   },
//   { 
//     id: 2, 
//     name: "Dell XPS Desktop", 
//     price: 1299.99, 
//     category: "Desktop", 
//     images: [
//       "/placeholder.svg?height=300&width=300",
//       "/placeholder.svg?height=300&width=300&text=Front+Panel",
//       "/placeholder.svg?height=300&width=300&text=Internals",
//       "/placeholder.svg?height=300&width=300&text=Rear+Ports",
//     ]
//   },
  { 
    id: 3, 
    name: "Samsung 27\" Monitor", 
    price: 299.99, 
    category: "Monitor", 
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300&text=Side+View",
      "/placeholder.svg?height=300&width=300&text=Ports",
      "/placeholder.svg?height=300&width=300&text=VESA+Mount",
    ]
  },
//   { 
//     id: 4, 
//     name: "Logitech MX Master 3", 
//     price: 99.99, 
//     category: "Accessory", 
//     images: [
//       "/placeholder.svg?height=300&width=300",
//       "/placeholder.svg?height=300&width=300&text=Side+View",
//       "/placeholder.svg?height=300&width=300&text=Bottom+View",
//       "/placeholder.svg?height=300&width=300&text=In+Use",
//     ]
//   },
  { 
    id: 5, 
    name: "WD 2TB External HDD", 
    price: 79.99, 
    category: "Storage", 
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300&text=Side+View",
      "/placeholder.svg?height=300&width=300&text=Ports",
      "/placeholder.svg?height=300&width=300&text=In+Use",
    ]
  },
//   { 
//     id: 6, 
//     name: "ASUS ROG Gaming Laptop", 
//     price: 1499.99, 
//     category: "Laptop", 
//     images: [
//       "/placeholder.svg?height=300&width=300",
//       "/placeholder.svg?height=300&width=300&text=Open+View",
//       "/placeholder.svg?height=300&width=300&text=Keyboard",
//       "/placeholder.svg?height=300&width=300&text=Ports",
//     ]
//   },
]

export default function ProductGallery() {
  const [cartItems, setCartItems] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<{ id: number, name: string, price: number, category: string, images: string[] } | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const addToCart = () => {
    setCartItems(cartItems + 1)
  }

  const filteredProducts = products.filter(product => 
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = ["All", ...new Set(products.map(product => product.category))]

  const openGallery = (product: { id: number, name: string, price: number, category: string, images: string[] }) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedProduct(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      selectedProduct && prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (selectedProduct?.images.length ?? 1) - 1 : prevIndex - 1
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
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
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Product Gallery</h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-2/3 relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <div className="relative h-48 w-full cursor-pointer" onClick={() => openGallery(product)}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
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

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No products found matching your criteria.</p>
        )}

        <Dialog open={selectedProduct !== null} onOpenChange={closeGallery}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProduct?.name}</DialogTitle>
              <DialogDescription>
                ${selectedProduct?.price.toFixed(2)} - {selectedProduct?.category}
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Image
                src={selectedProduct?.images[currentImageIndex] || "/placeholder.svg?height=300&width=300"}
                alt={`${selectedProduct?.name} - Image ${currentImageIndex + 1}`}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                onClick={prevImage}
              >
                ←
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={nextImage}
              >
                →
              </Button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {selectedProduct?.images.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentImageIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <footer className="bg-gray-200 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AJ Computers Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}