# SaveCarousels Export App

A pixel-perfect Next.js web application that fetches Instagram carousel posts and exports them as PDF or PNG (ZIP) files.

## Features

- **Instagram Carousel Fetch**: Input a URL to retrieve carousel images.
- **Preview**: View all slides before exporting.
- **PDF Export**: Generate a single PDF document with all slides.
- **PNG Export**: Download all slides as a ZIP archive.
- **Responsive Design**: Matches the Figma design perfectly.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **PDF Generation**: `pdf-lib`
- **ZIP Creation**: `jszip`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Architecture

- `src/app/page.tsx`: Main entry point.
- `src/components/Hero.tsx`: Handles URL input and export logic.
- `src/app/api/fetch-carousel`: API route for fetching data (currently using mock data for stability).
- `src/app/api/export/*`: API routes for generating binary files.

## Integration

To enable real Instagram fetching:
1. Open `src/app/api/fetch-carousel/route.ts`.
2. Uncomment the `instagram-url-direct` logic.
3. Ensure you have proper network access/proxies if required.
