
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, LinkedinIcon, MessageSquare, X, Check } from "lucide-react";
import { Profile } from "@/data/mockProfiles";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age?: number;
    bio: string;
    image: string;
    languages: string[];
    githubUrl?: string;
    linkedinUrl?: string;
    lookingFor?: string;
  };
  onSwipe: (direction: "left" | "right") => void;
  renderExtraInfo?: (profile: any) => React.ReactNode;
}

const ProfileCard = ({ profile, onSwipe, renderExtraInfo }: ProfileCardProps) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const swipeThreshold = 100;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setSwiping(true);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartX(e.clientX);
    setSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swiping) return;
    const currentX = e.touches[0].clientX;
    setOffsetX(currentX - startX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!swiping) return;
    const currentX = e.clientX;
    setOffsetX(currentX - startX);
  };

  const handleTouchEnd = () => finishSwipe();
  const handleMouseUp = () => finishSwipe();

  const finishSwipe = () => {
    setSwiping(false);
    
    if (offsetX > swipeThreshold) {
      onSwipe("right");
    } else if (offsetX < -swipeThreshold) {
      onSwipe("left");
    }
    
    setOffsetX(0);
  };

  const getCardStyle = () => {
    if (!swiping) return {};
    
    const rotate = offsetX * 0.1;
    return {
      transform: `translateX(${offsetX}px) rotate(${rotate}deg)`,
      opacity: 1 - Math.abs(offsetX) / 500,
    };
  };

  return (
    <div 
      className="swipe-card card-shadow"
      style={getCardStyle()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Card className="w-full h-full overflow-hidden border-0">
        <div 
          className="relative h-3/5 bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          <div className="absolute top-4 left-4 flex space-x-2">
            {profile.lookingFor && (
              <Badge variant="secondary" className="bg-white/80 text-tider-brown">
                {profile.lookingFor}
              </Badge>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h2 className="text-2xl font-bold">{profile.name} {profile.age && <span>{profile.age}</span>}</h2>
          </div>
        </div>
        
        <CardContent className="p-4 h-2/5 flex flex-col overflow-auto">
          <div className="mb-3">
            <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
              {profile.bio}
            </p>
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {profile.languages.map((lang, index) => (
              <Badge key={index} variant="outline" className="bg-tider-red/10 text-tider-red border-tider-red/20">
                {lang}
              </Badge>
            ))}
          </div>
          
          <div className="mt-auto flex justify-between">
            <div className="flex space-x-3">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              )}
            </div>
            
            {renderExtraInfo && renderExtraInfo(profile)}
            
            <div className="flex space-x-4">
              <button 
                onClick={() => onSwipe("left")} 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-red-500 transition-colors hover:bg-red-100"
              >
                <X className="h-5 w-5" />
              </button>
              <button 
                onClick={() => onSwipe("right")} 
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-green-500 transition-colors hover:bg-green-100"
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Swipe indicators */}
      {offsetX > 50 && (
        <div className="absolute top-1/4 right-8 transform -rotate-12 border-4 border-green-500 rounded-lg p-2 bg-white">
          <span className="text-green-500 font-bold text-2xl">MERGE</span>
        </div>
      )}
      {offsetX < -50 && (
        <div className="absolute top-1/4 left-8 transform rotate-12 border-4 border-red-500 rounded-lg p-2 bg-white">
          <span className="text-red-500 font-bold text-2xl">REJECT</span>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
