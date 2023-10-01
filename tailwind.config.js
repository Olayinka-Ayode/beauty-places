/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: '#242582',
        weirdColor: '#553D67',
        deepRed: '#F64C72',
        lightBrown: '#99738E',
        lighterBlue: '2F2FA2'
      }
    },
  },
  plugins: [],
}

