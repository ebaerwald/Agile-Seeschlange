import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages';
import { LogInPage } from './pages/login';
import { GroupsPage } from './pages/groups';
import { QuestionsPage } from './pages/questions';
import { SignUpPage } from './pages/signup';
import { SingleQuestionPage } from './pages/single_question';
import { SingleGroupPage } from './pages/single_group';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/question/:id" element={<SingleQuestionPage />} />
      <Route path="/group/:id" element={<SingleGroupPage />} />
    </Routes>
  );
}

