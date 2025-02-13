# Canvas&Chaos

## [See the App!] https://canvasandchaos.netlify.app/

## Description

The page is part of a full-stack web application built with a TypeScript React front-end, an Express back-end, and a PostgreSQL database. The interface uses Material-UI (MUI) for a polished, responsive, and modern design.

#### [Repository Link Client] https://github.com/Huanye98/Typescript-Store-Client

#### [Repository Link Server] https://github.com/Huanye98/Typescript-Store-Server

## Technologies & Libraries used

- HTML
- CSS
- Material UI
- Typescript
- Javascript
- React
- Axios
- React Context
- Slick carousel
- Stripe
- Cloudinary

## Backlog Functionalities
- [ ] Email users with Nodemailer.
- [ ] Implement the Printful API for shipping.
## Features

- User authentication (signup/login/logout).
- Admin functionality for managing products and users.
- Stripe integration for secure payments.
- Cloudinary integration for image uploads.
- Responsive design with Material-UI.

# Client Structure

- **404** - As a user, I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user, I want to see a nice error page when the An internal server error occurs so that I know it’s not my fault.
- **Mainpage** - As a user, I want to be able to access the homepage so that I can see what the app is about, and log in or sign up.
- **Sign up** - As a user, I want to sign up on the webpage so that I can see all the events that I could attend.
- **Login** - As a user, I want to be able to log in on the webpage so that I can get back to my account.
- **Logout** - As a user, I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **Portfolio** - As a user, I want to see all the artist's works in the same place so that I can browse their portfolio.
- **Store** - As a user, I want to see what products are available so that I can buy them.
- **Cart** - As a user, I want to be able to add products to a cart so that I can buy more than one product at a time.
- **Profile** - As a user, I want to change the shipping address so that my orders are delivered to the correct location.
- **Product Details** - As a user, I want to see detailed information about a product so that I can make an informed purchase decision.
- **Admin** - As an admin, I want to have a centralized place to manage all the necessary actions required to run an e-commerce site.
- **Add Products** - As an admin, I want to add new products so that I can update the store's inventory.
- **Modify Products** - As an admin, I want to modify existing products so that I can keep the product information up to date.
- **Delete Products** - As an admin, I want to delete products so that I can remove items that are no longer available.

## Client Routes

| Path                             | Page                   | Components                    | Permissions                  | Behavior                                                 |
| -------------------------------- | ---------------------- | ----------------------------- | ---------------------------- | -------------------------------------------------------- |
| `/auth/signup`                   | Signup                 |                               | anon only                    | Registers the user in the database.                      |
| `/auth/login`                    | Login                  |                               | anon only                    | Logs the user into the system and generates a token.     |
| `/products`                      | Store, Main page       | ProductCard, StoreFilters,Nav | public                       | Displays a list of all products.                         |
| `/products/create`               | Admin                  | ProductForm                   | admin only                   | Allows an admin to create a new product in the database. |
| `/products/:productId`           | Product Details        | ProductUpdateForm             | public                       | Displays detailed information about a specific product.  |
| `/payment/create-payment-intent` | Cart                   | CheckoutForm                  | user only                    | Initiates the payment process using Stripe.              |
| `/payment/update-payment-intent` | Cart                   | CheckoutForm                  | user only                    | Updates the payment intent details.                      |
| `/upload`                        | Admin, Product Details | ProductUpdateForm             | admin only                   | Allows admin to upload images via Cloudinary.            |
| `/users/all`                     | Admin                  |                               | admin only                   | Retrieves all user data for admin review.                |
| `/users/:id`                     | Profile                |                               | user only                    | Retrieves the specific user's profile information.       |
| `/users/modify/:id`              | Profile                | Profile                       | user only                    | Allows the user to modify their profile information.     |
| `/users/:id`                     | Profile                |                               | user only + token validation | Deletes the user's account after verification.           |
| `/cart`                          | Store, Main page       |                               | user only                    | Adds a product to the user's cart.                       |
| `/cart/:cart_id`                 | Cart                   |                               | user only                    | Deletes selected item in the user's cart.                |
| `/users/cart`                    | Store, Main page,Cart  | CartList, CartItem            | user only                    | Adds a product to the user's cart.                       |
| `/users/:cart_id`                | Payment success        |                               | user only                    | Empties the user's cart.                                 |

## Other Components

- Nav
- Footer
- Checkout form
- Payment intent
- ProductUpdateForm
- Product Cart
- Store Filters

## Services

- External API
  - Stripe
  - Cloudinary

## Deployment

- **Client**: Deployed on [Netlify](https://www.netlify.com).
- **Server**: Hosted on [Railway](https://www.railway.com).

## Context

- auth.context

## Links

### Collaborators

[Huanye zhu] https://github.com/Huanye98?tab=repositories

### Project

[Deploy Link] https://canvasandchaos.netlify.app/

## Misc

proyect focuses on learning:

- typescript
- sql
- complex routes with: pagination, multiple query parameters, and sort
- material ui
- UX - easy navigation
  solidificating my knowledge of:
- RBAC
- auth payment integration

Important for real use application & need to implement:

- e-mail verification, send email for validate sign up
- Introduce printful to automate and simplify orders + print on demand
- Prinful to create products and render
- Printfull shipping

i would like to implement if possible

- analitics: google analytics
- heatmaps and userb behaviour: hotjar or crazyegg
- Ecommerce features: dinamic pricing, product recomendations
- Perfomance optimization: react lazy,
- seo: react helmet
- unit and integration testing

next project?:

- keita yamada front end + firebase + grapgql + security features: ssl encryption, data privacy

Other?:

- docker
- cd ci pipeline
- cloud hosting
