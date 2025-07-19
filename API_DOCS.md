# API Documentation

## POST /ai-chat
- Description: Get AI-powered mental wellness support
- Auth: Bearer token required
- Body: `{ message: string }`
- Response: `{ response: string }`

## GET /testimonials
- Description: Get all testimonials
- Response: `[{...testimonial}]`

## POST /testimonials
- Description: Submit a testimonial
- Auth: Bearer token required
- Body: `{ job, review, rating }`
- Response: `{ message, testimonial }`

## POST /user/login
- Description: User login
- Body: `{ email, password }`
- Response: `{ _id, name, email, token }`

## POST /user/sign
- Description: User registration
- Body: `{ name, email, password, avatar? }`
- Response: `{ _id, name, email, token }` 