
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, User } from "lucide-react";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    {
      name: "Swipe",
      path: "/home",
      icon: <Home className="h-6 w-6" />,
    },
    {
      name: "Matches",
      path: "/matches",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-6 w-6" />,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10">
      <div className="grid h-full w-full grid-cols-3">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => navigate(route.path)}
            className={`flex flex-col items-center justify-center transition-colors ${
              isActive(route.path)
                ? "text-tider-red"
                : "text-gray-500 hover:text-tider-red"
            }`}
          >
            {route.icon}
            <span className="text-xs mt-1">{route.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
