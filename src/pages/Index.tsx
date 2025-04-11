
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ProfileCard from "@/components/ProfileCard";
import Navigation from "@/components/Navigation";
import { mockProfiles, Profile } from "@/data/mockProfiles";
import { Heart, Code } from "lucide-react";

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with mock profiles
    setProfiles([...mockProfiles]);
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= profiles.length) return;

    const currentProfile = profiles[currentIndex];
    
    // "right" swipe is a like
    if (direction === "right") {
      // Simulate a match about 50% of the time
      const isMatch = Math.random() > 0.5;
      
      if (isMatch) {
        setMatches([...matches, currentProfile.id]);
        toast({
          title: "New Match!",
          description: `You and ${currentProfile.name} have matched!`,
        });
      }
    }

    // Move to the next profile
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container max-w-md mx-auto pt-8 pb-20 px-4 md:px-0 md:ml-24">
        <div className="flex items-center justify-center mb-6">
          <Heart className="h-8 w-8 text-tider-red" />
          <Code className="h-8 w-8 text-tider-brown ml-2" />
        </div>
        
        <div className="relative h-[70vh] w-full">
          {profiles.length > 0 ? (
            <>
              {currentIndex < profiles.length ? (
                <ProfileCard 
                  profile={profiles[currentIndex]} 
                  onSwipe={handleSwipe} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <Code className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No More Profiles</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                    You've reviewed all available profiles. Check back later for new developers!
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-tider-red border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
