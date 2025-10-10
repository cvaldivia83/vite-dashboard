[🇧🇷 Versão em Português](README.pt-BR.md)

# Frontend Challenge
 
Frontend project using React + TypeScript for user management, featuring modular architecture and local API integration for development.
 
## Index
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Data Flow](#data-flow)
- [UX (User Experience)](#ux)
- [Tests](#tests)
- [Tech Stack](#tech-stack)

## Setup

  ### Docker

  If you have Docker installed on your computer, you can run this application using our Docker image.

  1. **Pull the docker image:**
  ```sh
  docker pull queeniec/vite_dashboard
  ```

  2. **Run the container:**
  ```sh
  docker run -p 5173:5173 queeniec/vite_dashboard
  ```

  3. **Access the application:**

  Open your browser and navigate to http://localhost:5173

  4. **To stop the container:**
  ```sh
  docker stop vite_dashboard
  ```

  ### Github

  If you don't have Docker, you can download the repository through the following steps:

  1. **Clone the repository:**
  ```sh
  git@github.com:cvaldivia83/vite-dashboard.git
  cd desafio-cvaldivia
  ```

  2. **Install dependencies:**
  ```sh
  npm install
  ```

  3. **Start the server:**
  ```sh
  npm run dev
  ```

## Usage

- Access the app at 'http://localhost:5173' (Vite's default address).
- Use the dashboard to view, add, edit, and delete users.
- The app interacts with a local API simulation (/api/db.json).
- All modifications are reflected in the UI and persisted in the simulated database.

## Project Structure

 ```
 ├── api/                # Mock API and routes
 ├── public/             # Static assets
 ├── src/
 │   ├── assets/         # SVGs e imagens
 │   ├── components/     # UI components
 │   ├── hooks/          # Custom hooks
 │   ├── pages/          # Views
 │   ├── services/       # API logic
 │   ├── styles/         # CSS
 │   ├── tests/          # Unit tests
 │   └── types/          # TypeScript types
 ├── Dockerfile          # Container setup
 ├── package.json        # Scripts and metadata
 ├── vite.config.ts      # Vite configuration
 └── README.md           # Documentation
 ```

## Architecture 

The Dashboard component functions as a central hub for data management, concentrating all CRUD operations for users and wallets (creation, editing, and deletion).

This approach offers several benefits:

1.  **Single Source of Truth:** The users state in Dashboard ensures that all child components work with the same version of data, eliminating inconsistencies.

2.  **Centralized Management:** All mock API calls and state updates are in a controlled location, facilitating maintenance and debugging.

3.  **Unidirectional data flow:** Props are passed down and callbacks go up, following the recommended React pattern.

4.  **TDD facilitado:** Concentrated business logic allows more effective unit testing of the main component. 

The main objective for this choice was to avoid excessive prop drilling and maintain simplicity without introducing unnecessary complexity from external state managers for a small scope.

-  **Components:** Reusable UI elements located in `src/components`. Modals are grouped in `src/components/Modal`, and Toasts are grouped in `src/components/Toast`.

-  **Pages:** Main page is located in `src/pages` (e.g.: `Dashboard`).

-  **Hooks:** Custom hooks located in `src/hooks` (e.g., `useForm`).

-  **Services:** Request logic for user API data and currency exchange API is located in `src/services` (e.g., `users.ts`).

-  **Types:** TypeScript type definitions in `src/types`.

-  **Styles:** Global styles in `src/styles`.

-  **Tests:** Unit tests in `src/tests`.

-  **API:** Local data and custom routes in `api/db.json` e `api/routes.json`.

## Data Flow

The Dashboard component implements a top-down data flow pattern following React best practices:

> UI events -> State Updates -> API Calls -> Component Re-render

-  **State Management:**  States are centrally managed in the `Dashboard` component, functioning as a single source of truth for user and wallet data.

-  **Event Handling:**  User interactions (create/edit/delete) trigger callbacks that propagate to the parent component via props.

-  **API Integration:** Asynchronous operations are executed through dedicated service functions, maintaining separation of concerns.

-  **UI Synchronization:** After each successful CRUD operation, the local state is updated, triggering automatic interface re-render.

-  **Modal Communication:** Modal components receive data via props and communicate actions through callback functions, maintaining low coupling.

## UX

The project implements a series of visual and interactive elements to provide immediate feedback to the user during all CRUD operations, ensuring a fluid and intuitive experience.

### Immediate Visual Feedback

**1. User Creation**

- After successfully adding a new wallet, the table is automatically updated.
- The new wallet appears at the top of the list with a light green background, highlighting the recently performed action.
- This approach eliminates the need for users to search for the created record in the list.

**2. Form Validation**

- Implementation of the useForm custom hook for real-time validation of entered data.
- Instant feedback in the form itself when invalid data is detected.
- Specific error messages guide the user on how to correct each field.
- Prevention of form submission with inconsistent data.

**3. Toast Notification System**

- **Successfull operations:** Green Toast with a message confirming the action was performed.
- **Failed operations:** Red Toast informing that the action could not be completed.

The objective of this UX approach is:

- Provide clear feedback on operation status
- Avoid submission of incorrect data through preventive verification.
- Facilitate identification of recent changes through visual highlighting.

## Tests

Tests are located in `src/tests` and are organized by feature/component.

Run tests with:

```sh
npm run test 
```

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- json-server (for mock API)
- Tailwind CSS
- Docker