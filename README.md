
Angular Mock App – Setup Guide

This is a complete guide to configuring this application using Angular (Standalone Components), Angular Material, Signals, and the ngrx Signal Store.

Prerequisites

Node.js installed

Angular CLI installed:

npm install -g @angular/cli


Git installed (for cloning the repository)

1. Clone the Existing Project
# Clone your repository
git clone https://github.com/sonalnigam31/CareMonitor_p.git

# Navigate into the project folder
cd CareMonitor_p

2. Install Project Dependencies
# Remove existing node_modules (optional, for a clean setup)
rm -rf node_modules
del /s /q node_modules  # Windows PowerShell

# Remove package-lock.json if necessary
del package-lock.json  # Windows PowerShell
rm package-lock.json  # Mac/Linux

# Install all dependencies
npm install

3. Reconfigure Angular Material (if needed)

If Angular Material was not fully configured, you can run:

ng add @angular/material
4. Install Additional Libraries
# Cookie Service and ngrx Signals Store
npm install ngx-cookie-service @ngrx/signals


⚠️ Make sure to install compatible versions with your Angular version:

Angular 19 → ngx-cookie-service@16

Angular 20 → ngx-cookie-service@20

Angular 21 → ngx-cookie-service@21

5. Run the Application
# Serve the Angular application locally
ng serve


Open your browser at http://localhost:4200.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

Project Architecture & Technical Approach

This application is built as a modern, modular Single Page Application (SPA) using Angular with Standalone Components. The focus is on scalability, clean architecture, reactive state management, and an overall smooth developer and user experience.

1. Architectural Pattern — Feature-Based & Modular

The project follows a feature-driven architecture, organized by domain rather than technical layers. This keeps code maintainable and easy to scale as features grow.

Core Layer: Contains global singletons such as AuthService, MockApiService, and route guards. Loaded once at the root.

Features Layer: Each domain (Login, Dashboard, List) is isolated and self-contained.

Lazy Loading: Dashboard and List are lazy-loaded to reduce bundle size and improve initial load performance.

2. State Management — NgRx Signal Store

The project uses @ngrx/signals for lightweight, reactive state management instead of heavy Redux boilerplate.

3. Authentication & Route Security & UI/UX

Cookie-based session authentication using a custom CookieService.

AuthGuard monitors navigation and protects private routes (/dashboard).

Unauthorized users are redirected to the Login page.

Built with Angular Material for accessible and consistent UI elements.

User feedback built-in (loading spinners, error notifications).

All UI states driven directly by reactive Signals.


✨ Summary

This project demonstrates a clean and scalable approach to building modern Angular applications using:

Standalone architecture

Lazy loading

Reactive state management (Signals + NgRx Signal Store)

Simulated backend APIs

Cookie-based auth with route protection

Responsive, user-focused UI
