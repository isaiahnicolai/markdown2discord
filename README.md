

# Markdown to Discord Formatter

This project is a simple React application that converts regular markdown into Discord-specific formatting. The app provides an input field where you can enter your markdown text, and it displays a preview of how the text will look in Discord's formatting. The preview window renders a styled version of the markdown to simulate how it will appear on Discord, but to use the actual Discord markdown, you will need to copy the text using the provided copy button.


![alt text](https://github.com/isaiahnicolai/markdown2discord/blob/gh-pages/assets/markdown2discord_interface.PNG?raw=true)

## Features

- **Markdown to Discord Formatting**: Converts markdown syntax to Discord-specific formatting.
- **Preview Window**: Displays a rendered version of the Discord formatting.
- **Copy Button**: Copies the raw Discord-formatted text to the clipboard for easy use.

## Usage

1. Enter your markdown text into the input field.
2. The preview window will show how the text will look with Discord's formatting.
3. Use the copy button to get the raw Discord-formatted text.
4. Paste the copied text into Discord to see the formatted result.

### Example

**Input:**

# Markdown to Discord Formatter
````
This is a **bold** text and this is an *italic* text.
Here is a code block:

```python
print("Hello, World!")
```
````
**Output:**
````
This is a **bold** text and this is an *italic* text.  
Here is a code block:

```py
print("Hello, World!")
```
````
## Live Demo

Check out the live demo of the application here: [Markdown to Discord Formatter](https://isaiahnicolai.github.io/markdown2discord)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/isaiahnicolai/markdown2discord.git
   cd markdown2discord
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or suggestions.

## Acknowledgments

This project uses [PrismJS](https://prismjs.com/) for syntax highlighting and [React](https://reactjs.org/) for building the user interface.


