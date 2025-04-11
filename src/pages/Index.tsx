
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProfileCard from "@/components/ProfileCard";
import Navigation from "@/components/Navigation";
import { getProfiles } from "@/data/mockProfiles";

const Index = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const { toast } = useToast();
  
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
  });

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (direction: "left" | "right") => {
    // Show toast based on swipe direction
    if (direction === "right") {
      toast({
        title: "Merge Request Approved",
        description: `You approved ${currentProfile.name}'s code`,
      });
    } else {
      toast({
        title: "Merge Request Rejected",
        description: `You rejected ${currentProfile.name}'s code`,
      });
    }

    // Move to next profile
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      toast({
        title: "No more profiles",
        description: "You've reviewed all potential matches",
      });
      // Reset to first profile for demo purposes
      setCurrentProfileIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col pb-20">
      <div className="absolute top-4 right-4 flex items-center">
        <Heart className="h-8 w-8 text-tider-red" />
      </div>
      
      <div className="container mx-auto max-w-md px-4 py-8 flex-1 flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-8 text-tider-brown">Find Your Match</h1>
        
        <div className="relative w-full h-[70vh] flex-1">
          {profiles.length > 0 && currentProfile ? (
            <ProfileCard 
              profile={currentProfile}
              onSwipe={handleSwipe}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading profiles...</p>
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
