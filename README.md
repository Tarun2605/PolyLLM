# PolyLLM Browser Extension

PolyLLM is a browser extension that allows seamless interaction with various Large Language Models (LLMs) directly from your browser.

## Features

- Interact with multiple LLM providers (OpenAI, Anthropic, Gemini, etc.)
- Context-aware prompting based on current webpage
- Save and organize conversations
- Customizable shortcuts for quick access
- Privacy-focused with local storage options

## Installation

### From Web Store

- Chrome: [Chrome Web Store Link](#)
- Firefox: [Firefox Add-ons Link](#)
- Edge: [Edge Add-ons Link](#)

### Manual Installation

1. Download the latest release from the [Releases page](https://github.com/yourusername/PolyLLM/releases)
2. Extract the ZIP file
3. Follow browser-specific instructions below

#### Chrome / Edge / Brave

1. Go to `chrome://extensions/` (or equivalent)
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the extracted extension folder

#### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select any file in the extracted extension folder

## Development Setup

This extension is built using [Plasmo](https://www.plasmo.com/), a framework for building browser extensions.

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Setup Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/PolyLLM.git
    cd PolyLLM
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn
    ```

3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Load the extension in your browser:
    - Chrome/Edge/Brave: Go to `chrome://extensions/`, enable Developer mode, click "Load unpacked", and select the `build/chrome-mv3-dev` directory
    - Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select any file in the `build/firefox-mv2-dev` directory

### Building for Production

```bash
npm run build
# or
yarn build
```

The built extension will be available in the `build` directory.

## Configuration

After installing the extension, click on the extension icon and go to Settings to:

1. Add your API keys for different LLM providers
2. Configure default models and parameters
3. Set up shortcuts and preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Plasmo](https://www.plasmo.com/)
- Icons by [Heroicons](https://heroicons.com/)