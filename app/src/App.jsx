import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ModuleDetail from './pages/ModuleDetail';
import LessonView from './pages/LessonView';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Quests from './pages/Quests';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/lesson/:moduleId/:lessonId" element={<LessonView />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/module/:moduleId" element={<ModuleDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/quests" element={<Quests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
