# Statement Snatcher

This is a Next.js application built in Firebase Studio that allows users to upload credit card statement PDFs and uses Generative AI to parse and display the information.

## Running Locally

To run this project locally, you'll need Node.js and npm installed. You will also need a Gemini API key.

### 1. Set up Environment Variables

Create a file named `.env` in the root of the project and add your Gemini API key:

```bash
GEMINI_API_KEY="your_api_key_here"
```

### 2. Install Dependencies

Open your terminal, navigate to the project directory, and run the following command to install the necessary packages:

```bash
npm install
```

### 3. Run the Development Servers

You need to run two separate processes in two different terminal windows:

- **Terminal 1: Run the Next.js App**
  This command starts the frontend application.
  ```bash
  npm run dev
  ```
  Your application will be available at `http://localhost:9002`.

- **Terminal 2: Run the Genkit Flow Server**
  This command starts the Genkit service that handles the AI-powered PDF parsing.
  ```bash
  npm run genkit:dev
  ```
  This will start the Genkit development UI, typically on `http://localhost:4000`, which you can use to inspect your flows.

Now you can open `http://localhost:9002` in your browser to use the application.

## Application Control Flow

The application follows a simple flow to process a user's PDF statement:

1.  **File Upload**: The user visits the homepage (`src/app/page.tsx`) and is presented with a file upload component (`src/components/file-upload.tsx`).

2.  **Form Submission**: The user selects a PDF file and clicks "Parse Statement". This submits a form that triggers a Next.js Server Action named `parseStatement`.

3.  **Server Action**: The `parseStatement` action, defined in `src/lib/actions.ts`, receives the uploaded file. It performs validation checks (e.g., file type, size) and then converts the file to a Base64 encoded string.

4.  **Genkit AI Flow**: The server action invokes the `statementParserFlow` Genkit flow (`src/ai/flows/parser.ts`), passing the Base64 encoded PDF data to it.

5.  **AI Processing**: The `statementParserFlow` (currently a mock) processes the data. In a real implementation, it would use a generative model to extract structured data like transactions, balance, and due dates from the PDF content.

6.  **Return Data**: The flow returns the structured data (or an error) to the `parseStatement` server action.

7.  **Update UI**: The server action returns the result to the `Home` component. React's `useActionState` hook manages the state, and upon receiving the data, the UI updates to hide the form and display the parsed information using the `StatementDisplay` component (`src/components/statement-display.tsx`).
