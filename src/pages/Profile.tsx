
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, LogOut, Heart } from "lucide-react";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    githubUrl: user?.githubUrl || "",
    linkedinUrl: user?.linkedinUrl || "",
    programmingLanguages: user?.programmingLanguages?.join(", ") || "",
    profileImage: user?.profileImage || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData({
      ...formData,
      profileImage: imageUrl
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      programmingLanguages: formData.programmingLanguages.split(",").map(lang => lang.trim()),
      profileImage: formData.profileImage
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="absolute top-4 right-4 flex items-center">
        <Heart className="h-8 w-8 text-tider-red" />
      </div>
      
      <div className="container max-w-md mx-auto pt-8 pb-20 px-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="relative p-0">
            <div className="h-40 bg-gradient-to-r from-tider-red to-tider-orange rounded-t-lg"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              {isEditing ? (
                <ProfileImageUpload 
                  currentImage={formData.profileImage} 
                  onImageChange={handleImageChange}
                  name={formData.name}
                />
              ) : (
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    src={user?.profileImage || "https://i.pravatar.cc/300"} 
                    alt={user?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-20 pb-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio (using code comments)</label>
                  <Textarea 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    placeholder="// Write something about yourself"
                    className="font-mono"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Programming Languages</label>
                  <Input 
                    name="programmingLanguages" 
                    value={formData.programmingLanguages} 
                    onChange={handleChange} 
                    placeholder="JavaScript, TypeScript, React, etc."
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
                  <Input 
                    name="githubUrl" 
                    value={formData.githubUrl} 
                    onChange={handleChange} 
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
                  <Input 
                    name="linkedinUrl" 
                    value={formData.linkedinUrl} 
                    onChange={handleChange} 
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <Button type="submit" className="flex-1 bg-tider-red hover:bg-opacity-90">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="flex-1">Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || "User"}</h2>
                  {user?.bio && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300 font-mono">{user.bio}</p>
                  )}
                  
                  {user?.programmingLanguages && user.programmingLanguages.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {user.programmingLanguages.map((lang, index) => (
                        <span key={index} className="px-3 py-1 bg-tider-red/10 text-tider-red rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center space-x-6">
                  {user?.githubUrl && (
                    <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white">
                      <Github className="h-6 w-6" />
                    </a>
                  )}
                  {user?.linkedinUrl && (
                    <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    className="w-full bg-tider-red hover:bg-opacity-90"
                  >
                    Edit Profile
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-3 text-gray-700 dark:text-gray-300" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Profile;
