# Monk-Minal CLI - Typing Practice Terminal Tool
![Contributors](https://img.shields.io/github/contributors/shikhar13012001/monk-minal?color=dark-green) ![Forks](https://img.shields.io/github/forks/shikhar13012001/monk-minal?style=social) ![Stargazers](https://img.shields.io/github/stars/shikhar13012001/monk-minal?style=social) ![Issues](https://img.shields.io/github/issues/shikhar13012001/monk-minal) ![License](https://img.shields.io/github/license/shikhar13012001/monk-minal) 
<p align="center">
  <a href="https://github.com/shikhar13012001/monk-minal">
    <img src="https://cdn.dribbble.com/userupload/5060097/file/original-11ba38b32008a09195495c9ceaed13dc.jpg?compress=1&resize=1024x768" alt="Logo" width="80" height="80">
  </a>
  </p>

**Monk-Minal** is an interactive, open-source typing practice tool built for the command-line interface (CLI). It brings the functionality and ease of web-based typing tools like MonkeyType directly to your terminal, providing users with a fully offline typing practice experience. With customizable options for game type, time, word count, and difficulty levels, **Monk-Minal** is the perfect tool to help users improve typing speed and accuracy while enjoying a minimalistic, distraction-free environment.

Whether you're a developer, writer, or just someone looking to improve your typing skills, Monk-Minal offers an engaging and flexible platform with real-time feedback and performance tracking.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the CLI](#running-the-cli)
- [Game Modes](#game-modes)
- [Performance Metrics](#performance-metrics)
- [Customization](#customization)
  - [Game Type](#game-type)
  - [Difficulty Levels](#difficulty-levels)
  - [Time and Word Limits](#time-and-word-limits)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## Features

- **Fully Offline**: Practice typing without an internet connection.
- **Multiple Game Modes**: Choose between time-based, word count, or quote typing challenges.
- **Difficulty Levels**: Select from Easy, Medium, or Hard word challenges.
- **Real-Time Feedback**: Provides live updates on typing speed, errors, and accuracy.
- **Customizable Time and Word Count**: Tailor your sessions with flexible time and word count limits.
- **Detailed Performance Metrics**: Track Words Per Minute (WPM), accuracy, and errors to gauge improvement.
- **Command-Line Interface (CLI)**: Simple and clean interface with intuitive prompts for selection.

## Screenshots
![Screenshot (3)](https://github.com/user-attachments/assets/b0fe7a1c-18fe-4a27-b74b-9ca8e6b77f9e)
![Screenshot (4)](https://github.com/user-attachments/assets/9d0eb44b-6180-4f38-99fe-571ee7c10b13)
![Screenshot (6)](https://github.com/user-attachments/assets/5ef17ed9-56c8-41ac-aed4-f2a82fc86e98)


## Getting Started

### Prerequisites

Before you begin, ensure you have **Node.js** installed on your system. You can verify this by running:

```bash
node -v
```

If Node.js is not installed, [download and install it from here](https://nodejs.org/en/download/).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shikhar13012001/monk-minal.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd monk-minal
   ```

3. **Install the required dependencies**:

   ```bash
   npm install
   ```

4. **Link the package locally for easy CLI access**:

   ```bash
   npm link
   ```

   Now, you can run the CLI by entering:

   ```bash
   mnm
   ```

### Running the CLI

To start using Monk-Minal, simply type `mnm` in your terminal and follow the interactive prompts to customize your typing session.

```bash
mnm
```

You'll be asked to choose the following options:
- **Game Type**: Time-based, Word count-based, or a Quote typing challenge.
- **Time/Word Limit**: Depending on your selected game mode, you can choose a time or word limit.
- **Difficulty**: Select between Easy, Medium, or Hard word difficulty.

The game will start once you press any key. After completing the session, you'll receive feedback on your performance, including your Words Per Minute (WPM), accuracy, and errors.

## Game Modes

Monk-Minal offers three distinct game modes to cater to different practice styles:

1. **Time Mode**: 
   - Focuses on typing for a set duration (15s, 30s, 60s, 120s).
   - Perfect for practicing sustained typing speed over a period of time.

2. **Word Mode**: 
   - Lets you practice typing a specific number of words (e.g., 10, 20, 30, 40, 50 words).
   - Great for short bursts of typing or focused word count-based exercises.

3. **Quote Mode**: 
   - Type out randomly selected famous quotes.
   - Ideal for those who want a mix of word challenges and inspirational quotes.

## Performance Metrics

Monk-Minal provides real-time feedback and a comprehensive summary of your performance at the end of each session. The performance metrics include:

- **Gross WPM**: The total words typed per minute (including errors).
- **Net WPM**: Adjusted for accuracy, this value represents your effective typing speed after accounting for errors.
- **Accuracy**: A percentage of how many characters you typed correctly, relative to the total characters typed.
- **Errors**: Shows where and how many typing errors were made.

This detailed feedback helps track improvement and gives users actionable insights to enhance their typing skills.

## Customization

Monk-Minal allows you to customize the following aspects of your typing practice:

### Game Type

- **Time**: Practice for a set duration.
- **Words**: Type a specific number of words.
- **Quote**: Type random quotes from a curated list.

### Difficulty Levels

Choose from three levels of difficulty to tailor the word selection to your current skill level:

1. **Easy**: Generates shorter words (up to 5 characters).
2. **Medium**: Generates words with up to 8 characters.
3. **Hard**: Generates complex words of varying lengths (8–12 characters), testing your skill and speed.

### Time and Word Limits

Monk-Minal offers flexible time and word limits to suit your needs:
- **Time Mode**: 15 seconds, 30 seconds, 60 seconds, or 120 seconds.
- **Word Mode**: 10, 20, 30, 40, or 50 words.

These customizable options allow you to adjust the challenge level based on your available time and typing goals.

## Built With

Monk-Minal is built using the following powerful libraries and modules:

- **[Chalk](https://www.npmjs.com/package/chalk)**: Terminal string styling and coloring.
- **[Enquirer](https://www.npmjs.com/package/enquirer)**: Interactive prompts for user input.
- **[CLI-Spinners](https://www.npmjs.com/package/cli-spinners)**: Animated spinners to indicate elapsed time.
- **[Random-Words](https://www.npmjs.com/package/random-words)**: For generating random words based on difficulty.
- **[Readline](https://nodejs.org/api/readline.html)**: Node.js module for handling user input and keypress events.
- **[Strip-ANSI](https://www.npmjs.com/package/strip-ansi)**: For stripping ANSI escape codes from terminal strings.
- **[Ruxe](https://www.npmjs.com/package/ruxe)**: For wrapping text output to fit terminal width.
- **[Ora](https://www.npmjs.com/package/ora)**: Elegant terminal spinners for visual feedback.

## Contributing

Contributions are always welcome and appreciated! To contribute:

1. **Fork the repository**.
2. **Create your feature branch**: 
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes**: 
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a pull request**.

Please ensure your contributions adhere to the [Code of Conduct](https://github.com/shikhar13012001/monk-minal/blob/main/CODE_OF_CONDUCT.md).

## License

Distributed under the MIT License. See [LICENSE](https://github.com/shikhar13012001/monk-minal/blob/main/LICENSE.md) for more information.

## Authors

- **Shikhar Gupta** - [GitHub Profile](https://github.com/shikhar13012001)

## Acknowledgements

Special thanks to the open-source community for the amazing libraries and tools that made this project possible.

