# Movie App 🎬

A movie browsing app that allows users to search for movies, view details, and explore various movie categories. The app fetches data from [The Movie Database (TMDb)](https://www.themoviedb.org/) API.

## Features

- 🎥 Browse trending, top-rated movies and tv-series
- 🔍 Search for specific movies by title.
- 📜 View detailed information about each movie (e.g., synopsis, release date, rating).
- 🌐 Fully responsive design.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript(React)
- **API:** [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
- **Styling:** css ,Material ui

## API Used

This app integrates with **TMDb API** for fetching movie-related data. You can obtain an API key by signing up on [TMDb](https://www.themoviedb.org/documentation/api).

### Key Endpoints Used

- **Get Popular Movies:** `https://api.themoviedb.org/3/movie/popular`
- **Search Movies:** `https://api.themoviedb.org/3/search/movie`
- **Get Movie Details:** `https://api.themoviedb.org/3/movie/{movie_id}`

## Getting Started

### Prerequisites

To run the app locally, you'll need:

- **Node.js** (for React-based setup)
- **API Key** from TMDb (sign up [here](https://www.themoviedb.org/))

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/movie-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd movie-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your TMDb API key:
    ```
    REACT_APP_API_KEY=your_api_key
    ```

5. Run the app:
    ```bash
    npm start
    ```


## Screenshots

Include screenshots of your app to showcase its UI.

## Contributing

If you'd like to contribute, feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

