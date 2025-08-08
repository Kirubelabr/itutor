import { Suspense } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import TutorDashboard from "./components/dashboard/TutorDashboard";
import Home from "./components/home";
import MessagesPage from "./components/shared/MessagesPage";
import StudentAIAssistant from "./components/student/StudentAIAssistant";
import StudentSessions from "./components/student/StudentSessions";
import TutorFinder from "./components/student/TutorFinder";
import TutorAIAssistant from "./components/tutor/TutorAIAssistant";
import TutorRegistrationForm from "./components/tutor/TutorRegistrationForm";
import TutorSessions from "./components/tutor/TutorSessions";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="student/dashboard" element={<StudentDashboard />} />
          <Route path="student/find-tutor" element={<TutorFinder />} />
          <Route path="student/assistant" element={<StudentAIAssistant />} />
          <Route path="student/messages" element={<MessagesPage />} />
          <Route path="student/sessions" element={<StudentSessions />} />
          <Route path="tutor/dashboard" element={<TutorDashboard />} />
          <Route path="tutor/sessions" element={<TutorSessions />} />
          <Route path="tutor/assistant" element={<TutorAIAssistant />} />
          <Route path="tutor/registration" element={<TutorRegistrationForm />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
