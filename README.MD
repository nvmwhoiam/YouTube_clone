# YouTube Clone

## Overview

The YouTube Clone is a modern web application that recreates key features of YouTube, with a special focus on the Shorts viewing experience. This project demonstrates the implementation of video content delivery and user interaction in a clean, responsive interface that mimics YouTube's popular short-form video feature.

## Features

- **Shorts Viewing:** Watch short-form videos in a vertical scrolling format
- **Dynamic URL Parameters:** Access specific shorts using `?view=string` parameter
- **Responsive Design:** Optimized viewing experience across all device sizes
- **Custom Video Player:** Tailored video controls and interface
- **Modern UI/UX:** Clean and intuitive user interface matching YouTube's design principles

## File Structure

```text
/assets
├── css
│   ├── general/
│   │   ├── base.scss      # Base styles
│   │   ├── keyframes.scss # Animation keyframes
│   │   └── mixin.scss     # SCSS mixins
│   ├── index.scss         # Main page styles
│   ├── shorts.scss        # Shorts page styles
│   └── view.scss          # Video view styles
├── js
│   ├── functions.js       # Utility functions
│   ├── index.js          # Main page logic
│   ├── shorts.js         # Shorts functionality
│   └── view.js           # Video view logic
├── fonts
│   └── icon_fonts/       # Custom icon fonts
└── img
    └── default.svg       # Default images
index.html                # Main entry point
shorts.html              # Shorts viewing page
view.html                # Video viewing page
README.md                # Documentation
```

## Technologies Used

- **HTML5:** Core structure and semantic markup
- **CSS3/SCSS:** Advanced styling with SCSS preprocessing
- **JavaScript:** Dynamic functionality and user interactions
- **Custom Icon Fonts:** Optimized icon delivery system

## How to Use

**1. Clone the Repository:**

```bash
git clone https://github.com/nvmwhoiam/youtube-clone.git
```

**2. Navigate to the Project Directory:**

```bash
cd youtube-clone
```

**3. Open in Browser:**

- Simply open `index.html` in your preferred web browser
- No additional setup or dependencies required

**4. Viewing Shorts:**

- Navigate to the shorts page
- Use the URL parameter `?view=string` to access specific shorts

## Future Enhancements

- User authentication system
- Video upload functionality
- Comment and interaction features
- Personalized recommendations
- Search functionality
- Video categories and filtering
- Social sharing integration

## Contact

If you have any questions or need assistance, please do not hesitate to reach out. I apologize if any part of this setup is not clear; this is my first major project, and I am putting in continuous effort to improve it. Feel free to contact me at [info@lynqis.io](mailto:info@lynqis.io) or open an issue on the [GitHub Repository](https://github.com/nvmwhoiam/youtube-clone).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author

- nvmwhoiam
- GitHub: [GitHub Profile](https://github.com/nvmwhoiam/)
