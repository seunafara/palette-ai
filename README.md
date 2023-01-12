# palette-ai
The palette-ai repository is a tool for generating matching color palettes for use in design projects. The generated palettes include a primary color, a secondary color, a color that matches the primary and secondary colors, and a text color that contrasts well with the other colors in the palette.

https://user-images.githubusercontent.com/28274433/211949205-e74eeff1-39e5-4520-a7dd-1c07f015b5aa.mov

# Demo guide

Featuring a simple UI, you can easily generate new color palettes by clicking the "generate" button. The AI scores each generated palette, and if the score is above 0.5 (50%), the colors will be painted on the screen for you to view. If the score is below 0.5, the generate function will be called recursively until a suitable palette is found

If you come across a generated palette that you like, you can save it by clicking the "save" button. This tells the AI that the generated colors are a good match and should be labeled as a "1" in the system. The more palettes you save, the more the AI will learn and adapt to your personal preferences, improving its ability to generate palettes that you will like in the future. No data is stored, refreshing the page clears out the saves

# To do
- Store saved training data in browser `localStorage` or `IndexDB`
- Copy and paste matching color palettes

This is an experimental tool for building AI models using JS





