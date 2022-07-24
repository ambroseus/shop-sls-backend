export type UUID = string

export type ProductId = UUID

export type Product = {
  id: ProductId
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
