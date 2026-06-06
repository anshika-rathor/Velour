# VELOUR
"Velour is a premium bilingual (Hindi/English) fashion e-commerce platform where anyone can buy and sell clothing, accessories, and lifestyle products — featuring modern capabilities such as AR live try-on, an outfit builder, and a personalised style profile.

## Tech Stack
**Frontend**
- React (Vite)
- React Router — page navigation
- Context API — global authentication state
- Axios — API requests with JWT interceptor
- Tailwind CSS — styling

**Backend**
- Node.js + Express — server and REST API
- MongoDB + Mongoose — database and schemas
- bcrypt — password hashing and verification
- JWT — token based authentication and protected routes

## Authentication
During login, the server verifies the user's credentials and generates a JWT token. This token consists of three parts: a header, a payload containing the user's ID, and a signature. The signature is created by combining the header and payload with a secret key (JWT_SECRET) stored securely in the server's environment variables. On every subsequent request, the server re-generates the signature and compares it with the token's signature — if they match, the request is authenticated; if they don't, the token has been tampered with and the request is rejected. Upon logout, the token is removed from the browser.

## Models
- User, Product, Cart, Order, Wishlist, Address, Review, Notification, Outfit.

## API Routes
- /auth — signup, login.
- /products, /cart, /orders, /wishlist, /address, /reviews, /notifications, /outfits.

### CartPage
Fetches the authenticated user's cart from the `/api/cart` route. Displays each cart item with a placeholder image, product ID, price, quantity controls (increase/decrease), and a remove button. Shows a total price calculated using `reduce()` and a Checkout button at the bottom. Displays "Your cart is empty" if no items are present.

### SettingsPage
A settings page featuring a sidebar with six sections — Account Info, Addresses, Theme, Privacy, Data & Security, and Help. The active section is visually distinguished using a conditional ternary operator applied to the className. The Theme section contains a toggle button that switches the entire application between dark and light mode. This is achieved through ThemeContext — a globally shared React context — which updates the document body's className via useEffect whenever the theme state changes.

### Account Info  
Fetches the logged-in user's name, email, and phone from /api/auth/me. Displays them in read-only fields by default. Clicking Edit enables the fields; clicking Save sends the updated data to PUT /api/auth/me and updates the UI.


### Theme Persistence —
The selected theme is saved to localStorage via a useEffect that runs whenever the theme state changes. On every page load, ThemeContext reads from localStorage first — falling back to dark mode if nothing is saved. This ensures the theme persists across page refreshes and navigation without requiring the user to reselect it.

## Upcoming Features : 
Checkout and Orders page
Google / Facebook login
AR Live try-on
Outfit builder
Price drop alerts
Style profile
Bilingual support (Hindi/English) via i18next
TypeScript migration
Deployment