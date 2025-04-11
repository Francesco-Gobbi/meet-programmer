
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (image: string) => void;
  name?: string;
}

const ProfileImageUpload = ({ currentImage, onImageChange, name }: ProfileImageUploadProps) => {
  const [image, setImage] = useState<string>(currentImage || "");
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImage(imageUrl);
        onImageChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-white">
          <AvatarImage src={image || "https://i.pravatar.cc/300"} alt={name || "Profile"} />
          <AvatarFallback className="text-2xl">{name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <label htmlFor="profile-image" className="absolute -bottom-2 -right-2 bg-tider-red hover:bg-opacity-90 text-white p-2 rounded-full cursor-pointer">
          <Camera className="h-5 w-5" />
          <input 
            type="file" 
            id="profile-image" 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
