module.exports = {
  content: [
    // ... your content configuration
  ],
  theme: {
    extend: {
      // ... your theme extensions
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} 