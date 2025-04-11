
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, User, Menu, X, Code } from "lucide-react";

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
    <>
      {/* Mobile bottom navigation bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10">
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

      {/* Desktop side navigation */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-20 flex-col bg-white shadow-lg z-10">
        <div className="flex flex-col items-center mt-6 mb-10">
          <Heart className="h-8 w-8 text-tider-red" />
          <Code className="h-8 w-8 text-tider-brown mt-2" />
        </div>
        
        <div className="flex flex-grow flex-col items-center space-y-6">
          {routes.map((route) => (
            <button
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`navbar-icon group ${
                isActive(route.path) && "bg-tider-red text-white rounded-xl"
              }`}
            >
              {route.icon}
              <span className="navbar-tooltip group-hover:scale-100">
                {route.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
