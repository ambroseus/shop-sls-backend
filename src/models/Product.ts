export type Product = {
  id: string
  title: string
  description: string
  price: number
  count: number
}

export type Products = Product[]

export type CreateProductPayload = Omit<Product, 'id'>

export type CreateProductPayloadSwagger = {
  title: string
  description: string
  price: number
  count: number
}
