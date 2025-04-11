
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { getMatches } from "@/data/mockProfiles";

const Matches = () => {
  const { data: matches = [] } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="absolute top-4 right-4 flex items-center">
        <Heart className="h-8 w-8 text-tider-red" />
      </div>
      
      <div className="container mx-auto max-w-md px-4 pt-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-tider-brown">Your Matches</h1>
        
        <div className="space-y-4">
          {matches.length > 0 ? (
            matches.map((match) => (
              <Card key={match.id} className="flex items-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={match.image} alt={match.name} />
                  <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{match.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {match.languages.slice(0, 2).map((lang, idx) => (
                      <Badge key={idx} variant="outline" className="bg-tider-red/10 text-tider-red text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {match.languages.length > 2 && (
                      <span className="text-xs text-gray-500">+{match.languages.length - 2} more</span>
                    )}
                  </div>
                </div>
                
                <button className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-tider-red/10 text-tider-red">
                  <MessageSquare className="h-5 w-5" />
                </button>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No matches yet. Keep swiping!</p>
            </div>
          )}
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Matches;
