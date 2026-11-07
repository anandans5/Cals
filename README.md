# CalorieIQ – AI-Powered Calorie & Nutrition Tracker

<p align="center">
  <strong>Track Smarter. Eat Better. Live Healthier.</strong>
</p>

CalorieIQ is an AI-powered nutrition and calorie tracking application designed to make food logging simple, intelligent, and accessible. It combines AI-based food image recognition, barcode scanning, voice-based food logging, and manual nutrition tracking to help users understand their daily food intake.

The application provides a personalized nutrition dashboard where users can monitor calories, macronutrients, water consumption, burned calories, daily progress, and achievement streaks.

## Features

### 1. AI Food Recognition
- Capture food images using your device camera.
- Upload food images for analysis.
- Identify multiple food items from a single image.
- Estimate portion sizes and nutritional values.
- Calculate calories, protein, carbohydrates, fats, and fiber.
- Review detected food components before logging.

Powered by Google's Gemini API.

### 2. Barcode Food Scanner
- Scan packaged food barcodes using your camera.
- Manually enter barcode numbers.
- Retrieve product information through Open Food Facts.
- View nutritional information before adding food to your diary.

### 3. Voice-Based Food Logging
- Log meals using voice input.
- Recognize natural-language food descriptions.
- Identify food quantities and serving sizes.
- Generate estimated nutritional information.
- Review parsed results before saving.

### 4. Manual Food Logging
- Search through the food database.
- Select breakfast, lunch, dinner, or snacks.
- Customize serving sizes and quantities.
- Create custom food entries.
- Automatically calculate nutrition based on portion size.

### 5. Nutrition Dashboard
Monitor your daily nutrition through:
- Total calorie consumption.
- Daily calorie targets.
- Remaining calories.
- Protein intake.
- Carbohydrate intake.
- Fat intake.
- Dietary fiber.
- Water consumption.
- Burned calories.

### 6. Progress & Achievements
- Daily activity tracking.
- Meal logging statistics.
- Daily streaks.
- Achievement badges.
- Nutrition goal progress.

### 7. Local Data Persistence
- IndexedDB-based storage.
- Persistent food diary.
- Saved user profile information.
- Session persistence.
- LocalStorage fallback for supported data operations.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend framework |
| TypeScript | Type safety |
| Vite 8 | Development and build tooling |
| Tailwind CSS 4 | UI styling |
| Lucide React | Icons |
| Motion | UI animations |
| Node.js | Runtime |
| Express.js | Backend API |
| Google Gemini API | AI food image analysis |
| Open Food Facts API | Barcode product lookup |
| IndexedDB | Local database |
| Web Speech API | Voice recognition |

## Architecture

```text
                 CalorieIQ
                     |
          React + TypeScript UI
                     |
       +-------------+-------------+
       |             |             |
    Dashboard     Food Logging   Scanners
       |             |             |
       |         +---+---+      +---+---+
       |         |       |      |       |
       |       Manual  Voice   Barcode  AI Vision
       |         |       |      |       |
       +---------+-------+------+-------+
                     |
                Express API
                     |
          +----------+----------+
          |                     |
       Gemini API         Open Food Facts
          |
     Food Analysis
                     |
                IndexedDB
                     |
              Local Persistence
```

## Getting Started

### Prerequisites

- Node.js (compatible with your installed Vite version)
- npm
- Google Gemini API key

### Installation

Clone the repository:

```bash
git clone https://github.com/anandans5/Cals.git
```

Navigate into the project:

```bash
cd Cals
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
```

Keep your API key private. Do not commit `.env` to GitHub.

### Run the Application

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run TypeScript checks:

```bash
npm run lint
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/analyze-food` | Analyzes food images using Gemini |
| GET | `/api/barcode/:code` | Retrieves product information using its barcode |

### AI Food Analysis

Example request:

```json
{
  "imageBase64": "BASE64_ENCODED_IMAGE",
  "mimeType": "image/jpeg"
}
```

The API returns structured nutritional information, including calories, protein, carbohydrates, fats, fiber, and detected food components.

## Project Structure

```text
Cals/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── DashboardScreen.tsx
│   │   ├── ManualFoodLogScreen.tsx
│   │   ├── BarcodeScannerScreen.tsx
│   │   ├── AIVisionScannerScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── Navigation.tsx
│   │   └── VoiceQuickLogModal.tsx
│   │
│   ├── data/
│   ├── db/
│   │   └── indexedDb.ts
│   │
│   ├── utils/
│   │
│   └── App.tsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── server.ts
├── tsconfig.json
└── vite.config.ts
```

## Current Development Status

CalorieIQ is currently under beta development.

The application includes AI-powered food recognition, manual food logging, barcode lookup, voice input, nutrition tracking, and local persistence.

The current login system uses demonstration beta credentials:

- Username: `user101`
- Password: `betatest`

This is a development-only authentication mechanism and should be replaced with production-grade authentication before public deployment.

## Future Improvements

- Personalized nutrition recommendations.
- User-defined calorie and macronutrient goals.
- Weekly and monthly nutrition analytics.
- Cloud synchronization across devices.
- Secure user authentication.
- Personalized meal planning.
- Fitness tracker integration.
- Improved food recognition accuracy.
- Exportable nutrition reports.

## Contributing

Contributions, suggestions, and feature improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Submit a pull request.

## License

This project currently includes Apache License 2.0 source-file headers. A repository-wide license should be added and confirmed before distributing the project under that license.

---

**CalorieIQ**

*Smarter Nutrition. Better Decisions. Healthier Living.*
