# Dodital Homestay

Welcome to the Dodital Homestay project! This project is a web application designed to showcase a homestay located in the beautiful region of Dodital. The application provides information about the homestay, rooms, nearby attractions, and includes a Google Maps integration to show the location of the homestay.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Sanity Integration](#sanity-integration)
- [Contributing](#contributing)
- [License](#license)

## Project Purpose

The Dodital Homestay project aims to provide a comprehensive and visually appealing platform for potential guests to explore and learn about the homestay. It highlights the unique features of the homestay, the available rooms, and nearby attractions, making it easier for guests to make informed decisions about their stay.

## Features

- **Homepage**: A beautifully designed homepage with multiple sections including a carousel, welcome section, rooms section, nearby attractions, and a Google Maps integration.
- **Carousel**: A full-width carousel showcasing images of the homestay.
- **Welcome Section**: A section welcoming visitors and providing a brief introduction to the homestay.
- **Rooms Section**: Information about the different rooms available at the homestay.
- **Nearby Attractions**: Details about nearby attractions that guests can visit.
- **Google Maps Integration**: A map showing the exact location of the homestay.
- **Sanity Integration**: Content management using Sanity.io for dynamic content updates.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **CSS Modules**: A CSS file in which all class and animation names are scoped locally by default.
- **Google Maps API**: An API to integrate Google Maps into the application.
- **Sanity.io**: A headless CMS for managing and delivering content.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/dodital-homestay.git
    cd dodital-homestay
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env.local` file**:
    Create a `.env.local` file in the root directory and add your Google Maps API key and Sanity project details:
    ```env
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
    NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- **Homepage**: Navigate to the homepage to see the different sections and information about the homestay.
- **Google Maps**: View the location of the homestay on the integrated Google Map.
- **Sanity CMS**: Use Sanity.io to manage and update the content dynamically.

## Sanity Integration

The project is integrated with Sanity.io, a headless CMS that allows for easy content management and updates. Here's how the integration works:

1. **Sanity Studio**: The Sanity Studio is set up to manage the content for the homestay, including images, room details, and nearby attractions. The Sanity project for this application is available in the repository [dodital-homestay-cms](https://github.com/your-username/dodital-homestay-cms).
2. **Sanity Client**: The Next.js application uses the Sanity client to fetch and display content from the Sanity dataset.
3. **Dynamic Content**: Content updates made in the Sanity Studio are reflected in the application in real-time, ensuring that the information is always up-to-date.

To set up Sanity for this project, follow these steps:

1. **Clone the Sanity CMS repository**:
    ```bash
    git clone https://github.com/your-username/dodital-homestay-cms.git
    cd dodital-homestay-cms
    ```

2. **Install Sanity CLI**:
    ```bash
    npm install -g @sanity/cli
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Initialize Sanity Studio**:
    ```bash
    sanity init
    ```

5. **Deploy Sanity Studio**:
    ```bash
    sanity deploy
    ```

6. **Configure Sanity Client**:
    Update the Sanity client configuration in your Next.js application to use your project ID and dataset.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create an issue or submit a pull request.

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Commit your changes**:
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
5. **Open a pull request**.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.