# OMA Tool - Technical Documentation

## Project Overview
**OMA Tool** is a modern, interactive organizational maturity assessment platform built with cutting-edge web technologies for performance, scalability, and exceptional user experience.

---

## Core Technologies

### Programming Language
- **TypeScript** (ES2020)
  - Strict type checking enabled
  - Enhanced code reliability and maintainability
  - Modern ES2020 features support

### Runtime Environment
- **Node.js** (v20+)
  - Modern JavaScript runtime
  - NPM package management

---

## Frontend Framework

### React Ecosystem
- **React** ^18.3.1
  - Component-based architecture
  - React Hooks for state management
  - Virtual DOM for optimal performance
  
- **React DOM** ^18.3.1
  - DOM rendering library

### Routing
- **React Router**
  - Client-side routing
  - Dynamic navigation
  - Page transitions

---

## Build Tools & Development

### Build System
- **Vite** 6.3.5
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - ES modules support
  - Modern bundling with Rollup

### Vite Plugins
- **@vitejs/plugin-react-swc** ^3.10.2
  - React Fast Refresh using SWC
  - Blazing-fast compilation
  - Superior performance over Babel

### TypeScript Configuration
- **Module Resolution**: Bundler mode
- **JSX**: React JSX transform
- **Path Aliases**: `@/*` → `src/*`
- **Strict Mode**: Enabled for type safety

---

## UI Framework & Component Libraries

### UI Component System
- **Radix UI** (Primitive Components)
  - Unstyled, accessible component primitives
  - WAI-ARIA compliant
  - Full keyboard navigation support
  
  **Components Used:**
  - Accordion, Alert Dialog, Aspect Ratio, Avatar
  - Checkbox, Collapsible, Context Menu, Dialog
  - Dropdown Menu, Hover Card, Label, Menubar
  - Navigation Menu, Popover, Progress, Radio Group
  - Scroll Area, Select, Separator, Slider
  - Switch, Tabs, Toggle, Toggle Group, Tooltip

### Icon Library
- **Lucide React** ^0.487.0
  - Modern, clean icon set
  - Tree-shakeable
  - Customizable SVG icons

### Styling
- **Tailwind CSS**
  - Utility-first CSS framework
  - Custom design system
  - Responsive design utilities
  
- **Class Variance Authority** ^0.7.1
  - Type-safe component variants
  - Dynamic styling logic

- **clsx** & **tailwind-merge**
  - Conditional class name composition
  - Tailwind class conflict resolution

---

## Advanced Features & Libraries

### Charts & Data Visualization
- **Recharts** ^2.15.2
  - Composable charting library
  - Built on React components
  - SVG-based rendering
  - Interactive data visualization

### Drag & Drop
- **@hello-pangea/dnd** ^18.0.1
  - Beautiful drag-and-drop interactions
  - Accessible (forked from react-beautiful-dnd)
  - Used for ranking/sorting features

### Carousel
- **Embla Carousel React** ^8.6.0
  - Lightweight, extensible carousel
  - Touch/swipe support
  - Smooth animations

### Forms & Input
- **React Hook Form** ^7.55.0
  - Performant form validation
  - Minimized re-renders
  - Easy integration with UI libraries

- **Input OTP** ^1.4.2
  - One-time password input component
  - Accessible and customizable

- **React Day Picker** ^8.10.1
  - Date picker component
  - Flexible and customizable

### UI Enhancements
- **Vaul** ^1.1.2
  - Drawer/modal component
  - Smooth animations

- **Sonner** ^2.0.3
  - Toast notification system
  - Beautiful, customizable alerts

- **React Resizable Panels** ^2.1.7
  - Resizable panel layouts
  - Flexible dashboard components

- **cmdk** ^1.1.1
  - Command menu component
  - Fast command palette

### Theme Management
- **next-themes** ^0.4.6
  - Dark/light mode support
  - System preference detection
  - Persistent theme storage

---

## Project Structure

```
OMA-UI/
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, media files
│   ├── components/      # Reusable components
│   │   ├── ui/         # Shadcn UI components
│   │   ├── survey/     # Survey-specific components
│   │   └── figma/      # Figma integration components
│   ├── pages/          # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── Survey.tsx
│   ├── styles/         # CSS files
│   │   ├── globals.css
│   │   ├── hero-background.css
│   │   └── login-background.css
│   ├── types/          # TypeScript type definitions
│   │   ├── survey.ts
│   │   └── surveyData.ts
│   ├── hooks/          # Custom React hooks
│   ├── guidelines/     # Project guidelines
│   ├── routes.ts       # Route configuration
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # Project documentation
```

---

## Development Scripts

### Available Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Runs Vite dev server with HMR on http://localhost:5173

# Build for production
npm run build
# Creates optimized production build in dist/
```

---

## Key Features Implementation

### Survey System
- **Question Types:**
  - Single Choice (Radio)
  - Multi-Choice (Checkbox)
  - Rank Sorter (Drag & Drop)
  - Text Input (Free form)
  - Likert Scale (Rating)

### Interactive Elements
- **Animated Backgrounds**
  - CSS animations for premium UI
  - Particle systems
  - Network visualizations
  
- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts (sm, md, lg, xl breakpoints)
  - Touch-optimized interactions

### Accessibility
- WCAG 2.1 AA compliance (via Radix UI)
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

---

## Design System

### Color Palette
- **Primary**: `#002D72` (Navy Blue)
- **Secondary**: `#008489` (Teal)
- **Gray Scale**: `#F7F9FC`, `#6B7280`, `#4A4A4A`
- **Interactive**: Hover states, focus rings

### Typography
- Font weights: Light (300), Regular (400), Medium (500), Semibold (600)
- Responsive text sizing
- Line height optimization

### Component Patterns
- Cards with gradient borders
- Animated hover effects
- Consistent spacing system
- Shadow hierarchy

---

## Performance Optimizations

### Build Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Minification**: CSS and JS compression
- **Asset Optimization**: Image and font optimization

### Runtime Performance
- **React 18 Features**: Concurrent rendering
- **Lazy Loading**: Component-level code splitting
- **Memoization**: Preventing unnecessary re-renders
- **Virtual Scrolling**: For large lists (via react-scroll-area)

---

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **ES2020 Support Required**
- **CSS Grid & Flexbox**
- **CSS Custom Properties**

---

## Development Best Practices

### Code Quality
- TypeScript strict mode
- ESLint integration potential
- Consistent code formatting
- Component composition patterns

### File Organization
- Feature-based structure
- Shared component library
- Type safety with TypeScript
- Modular CSS

### Version Control
- Git-based workflow
- Semantic versioning
- Branch-based development

---

## Dependencies Summary

### Production Dependencies (25)
- React ecosystem & routing
- Radix UI components (24 packages)
- Form handling & validation
- Charts & data visualization
- Drag & drop functionality
- Styling utilities
- Theme management
- UI enhancements

### Development Dependencies (4)
- TypeScript type definitions
- Vite & plugins
- Build tooling

---

## Future Enhancements Potential

- **State Management**: Zustand or Redux Toolkit
- **API Integration**: Axios or React Query
- **Testing**: Vitest, React Testing Library
- **E2E Testing**: Playwright or Cypress
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **CI/CD**: GitHub Actions
- **Monitoring**: Error tracking (Sentry)
- **Analytics**: User behavior tracking

---

## License & Credits

**Project**: OMA Tool - Organizational Maturity Assessment  
**Framework**: React + TypeScript + Vite  
**UI Components**: Radix UI + Custom Components  
**Styling**: Tailwind CSS  

---

*Last Updated: February 11, 2026*
