# ArtistSite

## [See the App!] https://canvasandchaos.netlify.app/

## Description

Web dedicated to both show the portfolio works of an artist, and be able to sell the artworks in a store.

#### [Repository Link Client] 

#### [Repository Link Server] 

## Technologies & Libraries used

HTML, CSS, Javascript, React, axios, React Context, slick carousel, Stripe, Cloudinary.

## Backlog Functionalities

 - Email users with nodemailer
 - Some sort of Shippment api like fedex api


# Client Structure

## User Stories

- **404** - As a user, I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user, I want to see a nice error page when the super team screws it up so that I know it’s not my fault.
- **Homepage** - As a user, I want to be able to access the homepage so that I can see what the app is about, and log in or sign up.
- **Sign up** - As a user, I want to sign up on the webpage so that I can see all the events that I could attend.
- **Login** - As a user, I want to be able to log in on the webpage so that I can get back to my account.
- **Logout** - As a user, I want to be able to log out from the webpage so that I can make sure no one will access my account.
- **Portfolio** - As a user, I want to see all the artist's works in the same place so that I can browse their portfolio.
- **Store** - As a user, I want to see what products are available so that I can buy them.
- **Cart** - As a user, I want to be able to add products to a cart so that I can buy more than one product at a time.
- **Profile** - As a user, I want to change the shipping address so that my orders are delivered to the correct location.
- **Product Details** - As a user, I want to see detailed information about a product so that I can make an informed purchase decision.
- **Admin Page** - As an admin, I want to have a centralized place to manage all the necessary actions required to run an e-commerce site.
- **See All Users** - As an admin, I want to see a list of all users so that I can manage their accounts.
- **See All Payments** - As an admin, I want to see all payments so that I can track and manage transactions.
- **Add Products** - As an admin, I want to add new products so that I can update the store's inventory.
- **Modify Products** - As an admin, I want to modify existing products so that I can keep the product information up to date.
- **Delete Products** - As an admin, I want to delete products so that I can remove items that are no longer available.

## Client Routes

## React Router Routes

| Path                              | Page                     | Components        | Permissions             | Behavior                                                             |
| --------------------------------- | ------------------------ | ----------------- | ----------------------- | -------------------------------------------------------------------- |
| `/auth/signup`                    | Signup                   |                   | anon only `<IsAnon>`    | Registers the user in the database.                                  |
| `/auth/login`                     | Login                    |                   | anon only `<IsAnon>`    | Validates credentials, creates, and sends a token.                   |
| `/products/all`                   | Store                    | ProductList       | public                  | Retrieves all products with basic details.                           |
| `/products/all/images`            | Portfolio                |                   | public                  | Retrieves all product images for the category "Print".               |
| `/products`                       | Store                    | StoreSidebar      | public                  | Retrieves products with pagination and optional category filter.     |
| `/products/:productId`            | ProductDetails           |                   | public                  | Retrieves a specific product by its ID.                              |
| `/auth/verify`                    | Verify                   |                   | user only `<IsPrivate>` | Verifies the user's authentication token.                            |
| `/payments/create-payment-intent` | PaymentIntent            |                   | user only `<IsPrivate>` | Creates a payment intent using Stripe and stores it in the database. |
| `/payments/update-payment-intent` | PaymentIntent            | CheckoutForm      | user only `<IsPrivate>` | Updates the payment status to "succeeded".                           |
| `/user/own`                       | Profile                  |                   | user only `<IsPrivate>` | Retrieves the authenticated user's profile.                          |
| `/user/own/address`               | Profile                  |                   | user only `<IsPrivate>` | Updates the authenticated user's address.                            |
| `/user/own`                       | Cart                     |                   | user only `<IsPrivate>` | Adds an item to the authenticated user's cart.                       |
| `/user/own/delete`                | Cart                     |                   | user only `<IsPrivate>` | Removes an item from the authenticated user's cart.                  |
| `/payments/`                      | AdminPage                | PaymentList       | admin only `<IsAdmin>`  | Retrieves all payments with product details.                         |
| `/upload`                         | AdminPage,ProductDetails | PostProductsAdmin | admin only `<IsAdmin>`  | Uploads an image using Cloudinary.                                   |
| `/user/admin`                     | Admin                    |                   | admin only `<IsAdmin>`  | Admin-only route for accessing protected resources.                  |
| `/user/admin/users`               | AdminPage                | Users             | admin only `<IsAdmin>`  | Retrieves a list of users with their carts.                          |
| `/user/admin/product`             | AdminPage                | PostProductsAdmin | admin only `<IsAdmin>`  | Creates a new product (Admin only).                                  |
| `/user/admin/product/:productId`  | ProductDetails           |                   | admin only `<IsAdmin>`  | Deletes a product by its ID (Admin only).                            |
| `/user/admin/product/:productId`  | productDetails           |                   | admin only `<IsAdmin>`  | Updates a product by its ID (Admin only).                            |

## Other Components

- Navbar
- Footer
- Checkout form
- Pagination
- Payment intent
- Store carousel
- Edit product form

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.verify(user)
  - auth.verify(admin)

- External API
  - Stripe
  - Cloudinary

## Context

- auth.context

## Links

### Collaborators

[Huanye zhu] https://github.com/Huanye98?tab=repositories


### Project

[Repository Link Client] 

[Repository Link Server] 

[Deploy Link] https://canvasandchaos.netlify.app/

### Slides


proyect focuses on learning:
  typescript
  sql
  complex routes with: pagination, multiple query parameters, and sort
  material ui
  UX - easy navigation
solidificating my knowledge of:
 RBAC
 auth payment integration

Important for real use application:
  e-mail verification, send email for validate sign up
  Introduce printful to automate and simplify orders + print on demand
  Prinful to create products and render
  Printfull shipping

i would like to implement if possible
  analitics: google analytics 
  heatmaps and userb behaviour: hotjar or crazyegg
  Ecommerce features: dinamic pricing, product recomendations
  Perfomance optimization: react lazy, 
  seo: react helmet
  unit and integration testing 


next projects:
keita yamada front end
firebase
grapgql
security features: ssl encryption, data privacy



Other?:
docker
cd ci pipeline
cloud hosting
