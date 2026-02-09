import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: '\u{1F3E0}', label: 'Home' },
  { to: '/quests', icon: '\u{26A1}', label: 'Quests' },
  { to: '/leaderboard', icon: '\u{1F3C6}', label: 'Rank' },
  { to: '/profile', icon: '\u{1F464}', label: 'Profile' },
];

export default function NavBar() {
  return (
    <nav className="nav-bar">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <span className="nav-icon">{icon}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
