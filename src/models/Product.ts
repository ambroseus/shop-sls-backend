export type Product = {
  id: string
  title: string
  description: string
  price: number
  count: number
}

export type Products = Product[]

export type CreateProduct = Omit<Product, 'id'>

// Swagger types

export type CreateProductPayload = {
  title: string
  description: string
  price: number
  count: number
}
