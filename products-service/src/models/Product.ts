import joi from 'joi'

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

export const ProductSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  price: joi.number().positive().required(),
  count: joi.number().min(0).required(),
})
