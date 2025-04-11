
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockMatches, Profile } from "@/data/mockProfiles";
import { MessageSquare, ChevronRight } from "lucide-react";

const Matches = () => {
  const [activeTab, setActiveTab] = useState("matches");
  const [matches, setMatches] = useState<Profile[]>(mockMatches);
  const [conversations, setConversations] = useState<Profile[]>(mockMatches.slice(0, 1));
  const navigate = useNavigate();

  const handleStartChat = (profile: Profile) => {
    if (!conversations.find(c => c.id === profile.id)) {
      setConversations([...conversations, profile]);
    }
    setActiveTab("messages");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container max-w-md mx-auto pt-8 pb-20 px-4 md:px-0 md:ml-24">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Your Connections</h1>
        
        <Tabs defaultValue="matches" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="matches" className="space-y-4">
            {matches.length > 0 ? (
              matches.map(profile => (
                <Card key={profile.id} className="overflow-hidden border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={profile.image} alt={profile.name} />
                        <AvatarFallback>{profile.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.languages.slice(0, 2).map((lang, i) => (
                            <Badge key={i} variant="outline" className="bg-tider-red/10 text-tider-red border-tider-red/20 text-xs">
                              {lang}
                            </Badge>
                          ))}
                          {profile.languages.length > 2 && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 text-xs">
                              +{profile.languages.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleStartChat(profile)}
                        className="ml-2 w-10 h-10 flex items-center justify-center rounded-full bg-tider-red text-white hover:bg-opacity-90 transition-colors"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No matches yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep swiping to find your perfect code partner!
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            {conversations.length > 0 ? (
              conversations.map(profile => (
                <Card key={profile.id} className="overflow-hidden border-0 shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <Avatar className="h-14 w-14 mr-4">
                        <AvatarImage src={profile.image} alt={profile.name} />
                        <AvatarFallback>{profile.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-mono truncate">
                          // Let's pair program sometime!
                        </p>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No messages yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Start a conversation with one of your matches!
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Matches;
