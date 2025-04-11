
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Code } from "lucide-react";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome to Tider for Programmers",
      description: "All comments must be written using technical language",
      image: "/lovable-uploads/eb334984-2bf2-47d6-a527-acc3a301c2ee.png"
    },
    {
      title: "How it works",
      description: "Swipe right to approve a merge request, left to decline"
    },
    {
      title: "Tech Stack Dating",
      description: "Find developers with compatible technologies and frameworks"
    },
    {
      title: "Start your Code Journey",
      description: "Ready to compile connections?"
    }
  ];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Setup complete",
        description: "Let's find your perfect code companion!",
      });
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center tider-gradient p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="text-tider-brown flex items-center gap-2 mb-4">
          <Heart className="h-10 w-10 text-tider-red" />
          <Code className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold text-tider-brown mb-2">Tider for Programmers</h1>
      </div>

      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold text-tider-brown">{steps[currentStep].title}</h2>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-6">
          {currentStep === 0 && steps[currentStep].image && (
            <img 
              src={steps[currentStep].image} 
              alt="Onboarding" 
              className="w-full max-w-xs h-auto rounded-lg mb-6"
            />
          )}
          {currentStep === 1 && (
            <div className="flex space-x-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Swipe Right</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Swipe Left</span>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg text-center">
                <span className="block font-mono">JavaScript</span>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg text-center">
                <span className="block font-mono">Python</span>
              </div>
              <div className="bg-green-100 p-3 rounded-lg text-center">
                <span className="block font-mono">React</span>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg text-center">
                <span className="block font-mono">Node.js</span>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-tider-red bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-10 w-10 text-tider-red" />
              </div>
              <p className="text-gray-600 font-mono">// Ready to execute?</p>
            </div>
          )}
          <p className="text-gray-700 text-center">{steps[currentStep].description}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleContinue} className="w-full bg-tider-red hover:bg-opacity-90">
            {currentStep < steps.length - 1 ? "Continue" : "Get Started"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex mt-6 space-x-2">
        {steps.map((_, index) => (
          <div 
            key={index} 
            className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-tider-red" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
