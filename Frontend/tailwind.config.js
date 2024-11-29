module.exports = {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5733",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
      },
      screens: {
        'sm': '640px',
        'sm': '340px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'sm': '576px',
        'md': '960px',
        'lg': '1440px',
        'lg': '992px',
        '3xl': '1600px',
        'md': '975px',
        'lg': '1180px',
        'sm': '855px',
        'sm': '850px',
        'sm': '840px',

      },
      borderImageSource: {
        'custom-gradient': 'linear-gradient(255.6deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 18.54%)',
      },
    },
  },
  plugins: [],
}