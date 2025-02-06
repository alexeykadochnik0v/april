# Nuxt 3 Product Catalog

A modern and responsive product catalog built with Nuxt 3, featuring a clean design and smooth user experience.

## Features

- 🎨 Clean and modern UI
- 📱 Fully responsive design
- 🔍 Real-time search functionality
- 📊 Grid and list view options
- 🔄 Pagination support
- ⚡ Fast and optimized performance

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue.js Framework
- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [SCSS](https://sass-lang.com/) - CSS with superpowers
- [DummyJSON](https://dummyjson.com/) - Fake REST API for testing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nuxt3-product-catalog.git
cd nuxt3-product-catalog
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
nuxt3-product-catalog/
├── components/          # Vue components
│   ├── ProductCard.vue  # Product card component
│   ├── ProductList.vue  # Product list component
│   └── SearchBar.vue    # Search and view toggle component
├── composables/         # Composable functions
│   ├── useApi.ts       # API integration
│   ├── usePagination.ts # Pagination logic
│   └── useSearch.ts    # Search functionality
├── assets/             # Static assets and styles
│   └── styles/         # SCSS styles
├── pages/              # Application pages
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
