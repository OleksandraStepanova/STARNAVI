# STARNAVI: Star Wars Heroes App

This project is a Star Wars Heroes Application built with React, Redux, and React Flow. It fetches and displays a list of Star Wars heroes, ships, and films using an external API. The app supports pagination for heroes and ships, and includes detailed visualizations of hero data using React Flow.

## Features

- **Fetch and Display Heroes:** The app fetches a paginated list of Star Wars heroes from an API and displays them in a user-friendly interface.
- **Fetch Films:** On initialization, the app fetches and displays information about Star Wars films.
- **JFetch Ships (On first page load):** The app fetches a list of Star Wars ships when the heroes' page is on the first page.
- **Detailed Hero Information with React Flow:** For each hero, the app visualizes their associated films and ships in a flow diagram. The hero is the central node, with connections branching to their respective films, and from each film, there are connections to the ships.
- **Pagination:** Users can navigate between pages of heroes with "Back" and "More Heroes" buttons.
- **Loader:** A loading spinner is displayed while data is being fetched.
- **Error Handling:** Errors during API calls are captured and displayed to the user using toast notifications.

## Technologies Used

- **React:** The UI is built using React.
- **Redux:** State management is handled by Redux.
- **React Redux:** For connecting React components to the Redux store.
- **Redux Thunk:** For asynchronous actions.
- **React-Hot-Toast:** For displaying error and success notifications.
- **React Flow:** Used for visualizing relationships between a hero, their films, and associated ships.
- **TypeScript:** The project is written in TypeScript to ensure type safety.

# Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/uk)** (version 14.x or later)
- **[npm](https://www.npmjs.com/)** (or yarn if you prefer)

## Installation

1. Clone this repository:

`git clone https://github.com/OleksandraStepanova/STARNAVI`
`cd star-wars-heroes-app`

2. Install dependencies:
   `npm install`

## Running the App

To start the development server:
`npm run dev`

This will run the app in development mode. Open (http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Building the App

To build the app for production, run:
`npm run build`

This will create an optimized production build in the build folder.
