# VELOUR
Velour is a premium bilingual (Hindi/English) fashion e-commerce platform where anyone can buy and sell clothing, accessories, and lifestyle products — featuring modern capabilities such as AR live try-on, an outfit builder, and a personalised style profile.


## Tech Stack

# Frontend
- React (Vite)
- React Router — page navigation
- Context API — global authentication and theme state
- Axios — API requests with JWT interceptor
- Tailwind CSS — styling with full dark/light theme support

# Backend
- Node.js + Express — server and REST API
- MongoDB + Mongoose — database and schemas
- bcrypt — password hashing and verification
- JWT — token-based authentication and protected routes

## Authentication

During login, the server verifies the user's credentials and generates a JWT token. This token consists of three parts: a header, a payload containing the user's ID, and a signature. The signature is created by combining the header and payload with a secret key (`JWT_SECRET`) stored securely in the server's environment variables. On every subsequent request, the server re-generates the signature and compares it with the token's signature — if they match, the request is authenticated; if they don't, the token has been tampered with and the request is rejected. Upon logout, the token is removed from the browser.

Persistent login is handled via a `/auth/me` route — on every page refresh, the stored token is sent to the server, which returns the authenticated user, keeping the session alive without requiring re-login.

## Models
User , Product , Cart , Order , Wishlist , Address , Review , Notification , Outfit

## API Routes

|    Base Route  | Actions |

| `/auth`        | Signup, Login, Get current user, Update user |
| `/products`    | Get all, Get by ID, Create, Update, Delete |
| `/cart`        | Get cart, Add item, Update quantity, Remove item |
| `/wishlist`    | Get wishlist, Add product, Remove product |
| `/orders`      | Get orders, Create order |
| `/address`     | Get addresses, Add, Update, Delete |
| `/reviews`     | Get reviews, Add review |
| `/notifications` | Get notifications |
| `/outfits`     | Get outfits, Create outfit |

## Pages

### HomePage
The landing page of Velour. Features a full-screen hero section, a featured products grid, and a footer. Fully responsive with dark and light theme support.

### LoginPage
Handles user authentication. On submission, sends credentials to `/api/auth/login`, receives a JWT token, stores it in localStorage, and redirects the user to the homepage. Includes client-side validation using `useRef`.

### SignupPage
Handles new user registration. Collects name, email, phone, and password. On submission, sends data to `/api/auth/signup`, receives a JWT token, and logs the user in immediately.

### ProductsPage
Fetches all products from MongoDB via `/api/products` and displays them in a responsive grid. Each card shows the product image, name, category, price, available sizes, and two action buttons — Add to Cart and Add to Wishlist. Features a gold glow hover effect.

### CartPage
Fetches the authenticated user's cart from `/api/cart`. Since the cart only stores product IDs and quantities, `Promise.all` is used to fetch full product details for each ID simultaneously — the same pattern used in WishlistPage. Each product detail is then combined with its corresponding quantity and cart item ID. Displays each item with its real image, name, price, and quantity controls. The minus button removes the item automatically when quantity reaches zero. Total price is calculated using `reduce()` multiplying price by quantity for each item. A summary box on the
 right shows the total and Checkout button.

### WishlistPage
Fetches the authenticated user's wishlist from `/api/wishlist`. Since the wishlist stores only product IDs, `Promise.all` is used to fetch full product details for each ID simultaneously. Displays product cards with real images, names, and a remove button. Duplicate prevention is handled on server-side using MongoDB's `$addToSet` operator.

### SettingsPage
A settings page featuring a sidebar with six sections — Account Info, Addresses, Theme, Privacy, Data & Security, and Help. The active section is visually distinguished using a conditional ternary operator applied to the `className`.

# Account Info —
 Fetches the logged-in user's name, email, and phone from `/api/auth/me`. Displays them in read-only fields by default. Clicking Edit enables the fields; clicking Save sends the updated data to `PUT /api/auth/me` and updates the UI.

# Theme —
 Contains a toggle button that switches the entire application between dark and light mode. This is achieved through `ThemeContext` — a globally shared React context — which updates `document.body`'s className via `useEffect` whenever the theme state changes.

# Theme Persistence — 
The selected theme is saved to `localStorage` via a `useEffect` that runs whenever the theme state changes. On every page load, `ThemeContext` reads from `localStorage` first — falling back to dark mode if nothing is saved. This ensures the theme persists across page refreshes and navigation without requiring the user to reselect it.

## Navbar
A reusable `Navbar` component extracted from HomePage and placed inside the `Layout` component — so it appears automatically on every page without being imported individually. Contains links to all pages and a Logout button that clears the JWT token and redirects to the login page.

## Folder Structure

```
velour/
├── client/          # React frontend (Vite, port 5173)
│   ├── src/
│   │   ├── context/     # AuthContext, ThemeContext
│   │   ├── pages/       # All page components
│   │   ├── services/    # API service functions
│   │   └── components/  # Navbar, Layout, ProtectedRoute
└── server/          # Express backend (port 5000)
    ├── auth.js          # Auth routes
    ├── products.js      # Product routes
    ├── cart.js          # Cart routes
    ├── wishlist.js      # Wishlist routes
    ├── middleware.js    # JWT protect middleware
    └── server.js        # Entry point
```
## Upcoming Features

- Checkout and Orders page
- Google / Facebook login
- AR Live try-on
- Outfit builder
- Price drop alerts
- Style profile
- Bilingual support (Hindi/English) via i18next
- TypeScript migration
- Deployment