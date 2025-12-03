
# PLAN.md

## 1. Assumptions
1. This is a frontend-only project with no backend.
2. Quiz data and admin login status are stored in localStorage.
3. Admin login uses dummy credentials: admin / 123.
4. Quiz question types supported: MCQ, True/False, Text.
5. Public users can view, attempt quizzes and see scores.
6. Admin can create quizzes and add questions.
7. Built with Vite + React + TailwindCSS.
8. Merging dummy quizzes with admin-created quizzes is required.

## 2. Scope

### Included:
- Home page (quiz listing)
- Quiz attempt system
- Score calculation
- Admin login UI
- Admin dashboard
- Create quiz
- Add questions of all types
- Tailwind-based UI
- Merge dummy and admin quizzes
- LocalStorage storage

### Excluded:
- Backend or database
- Real authentication
- Edit quiz / delete quiz
- Timer & advanced quiz flow
- Image uploads
- Multi-user system

## 3. Approach

### Step 1: Setup
- Created Vite + React project
- Installed TailwindCSS & React Router
- Cleaned boilerplate

### Step 2: Data Structure
- Added dummy quizzes in data/quizzes.js
- Implemented localStorage-based storage

### Step 3: UI Pages
- Home Page for quiz listing
- Quiz Page for attempting quizzes
- Admin Login Page (dummy)
- Dashboard Page with create/add functionality

### Step 4: Core Logic
- Merge dummy + localStorage quizzes
- Save quizzes on creation
- Add questions with all three types
- Render MCQ/TF/Text questions properly
- Calculate score on submit

### Step 5: Styling
- Added TailwindCSS
- Clean cards & buttons for UX

## 4. Scope Changes During Implementation
1. Initially Home Page only used localStorage → Updated to merge dummy + admin quizzes.
2. Quiz Page originally failed to read dummy quizzes → Updated with merge logic.
3. Admin system expanded with question-add functionality.
4. UI improved with Tailwind components.

## 5. Reflection (If more time was available)
If more time was available, I would add:
- Edit quizzes
- Edit/delete questions
- Delete quizzes
- Drag-and-drop question ordering
- Better admin layout (sidebar)
- Toast notifications
- Import/export quizzes as JSON
- User accounts & real authentication
- Timed quizzes & progress tracking
- A more polished UI with animations

