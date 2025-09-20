/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'black-void': '#000000',
        'navy': '#1A2A44',
        'horizon-orange': '#FF3300',
        'velvet-red': '#800020',
        'deep-purple': '#2D0A31',
        'midnight-purple': '#1A0E25',
        'secondary-color': '#6c757d', // Added secondary color
      },
      opacity: {
        '85': '0.85', // Add custom opacity value
      },
      zIndex: {
        'base': '10',
        'svg-overlay': '50',
        'narrative-panel': '100',
        'audio-controls': '200',
        'chapter-navigation': '300',
        'tooltips': '400',
        'play-button-nav': '350',
      },
    },
  },
  plugins: [],
}

