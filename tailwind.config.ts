import type { Config } from "tailwindcss";
import daisyUi from "daisyui";
import themes from "daisyui/src/theming/themes";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  plugins: [daisyUi],
  daisyui: {
    themes: [
      {
        light: {
          ...themes["light"],
          primary: "oklch(70% 0.187 19.48)",
          "base-100": "oklch(95.7761% 0.005767 264.532118)",
          "base-200": "oklch(91.88% 0.005 264.532118)",
          "base-300": "oklch(86.65% 0.007 264.532118)",
          "base-content": "oklch(37.18% 0.049 275.72)",
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
