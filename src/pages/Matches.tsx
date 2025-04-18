
import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { getMatches, type Profile } from "@/data/mockProfiles";

const Matches = () => {
  const { data: matches = [] } = useQuery<Profile[]>({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="absolute top-4 right-4 flex items-center">
        <Heart className="h-8 w-8 text-tider-red" />
      </div>

      <div className="container mx-auto max-w-md px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-tider-brown">Your Matches</h1>
        
        {matches.length === 0 ? (
          <p className="text-center text-gray-500">No matches yet. Keep swiping!</p>
        ) : (
          <div className="grid gap-4">
            {matches.map((match) => (
              <div key={match.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img 
                    src={match.image} 
                    alt={match.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{match.name}</h3>
                    <p className="text-sm text-gray-500 font-mono">{match.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Matches;
