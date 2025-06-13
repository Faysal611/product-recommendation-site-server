---

# Product Recommendation System

This repository contains the client-side application for a product recommendation system, allowing users to post product recommendations and submit queries.

---

## Features

* **Post Recommendations**: Easily share your favorite products with the community.
* **Submit Queries**: Ask questions about products or seek recommendations from other users.
* **User-friendly Interface**: Navigate and interact with the system seamlessly.

---

## Technologies Used

This project leverages a modern web development stack to provide a fast and responsive user experience.

* **React.js**: A declarative, efficient, and flexible JavaScript library for building user interfaces.
* **Vite**: A next-generation frontend tooling that provides an extremely fast development experience.
* **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
* **DaisyUI**: A Tailwind CSS component library that simplifies UI development.
* **Firebase**: A platform developed by Google for creating mobile and web applications, used here for authentication and potentially database services.
* **Axios**: A promise-based HTTP client for making API requests.
* **React Router**: For declarative routing in React applications.
* **Motion**: A production-ready animation library for React.
* **SweetAlert2**: A beautiful, responsive, customizable, and accessible (WAI-ARIA) replacement for JavaScript's popup boxes.
* **React Simple Typewriter**: A simple and customizable typewriter effect for React.

---

## Installation and Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js installed.

### Clone the Repository

```bash
git clone <repository-url>
cd product-recommendation-system-client
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and add your Firebase configuration details.

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run the Development Server

```bash
npm run dev
```

This will start the development server, usually accessible at `http://localhost:5173`.

---

## Available Scripts

In the project directory, you can run:

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the app for production to the `dist` folder.
* `npm run lint`: Runs ESLint to check for code quality issues.
* `npm run preview`: Serves the `dist` folder locally for a production preview.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

---

## License

[Specify your license here, e.g., MIT License]

---

Feel free to explore the code and contribute to making this product recommendation system even better!