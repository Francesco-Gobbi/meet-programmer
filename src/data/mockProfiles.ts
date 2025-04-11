
export interface Profile {
  id: string;
  name: string;
  age?: number;
  bio: string;
  image: string;
  languages: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  lookingFor?: string;
}

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Julia",
    age: 28,
    bio: "function getMatch() { return 'Looking for someone to debug my heart'; }",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    languages: ["JavaScript", "React", "Node.js"],
    githubUrl: "https://github.com",
    lookingFor: "Long-term repository"
  },
  {
    id: "2",
    name: "Mark",
    age: 32,
    bio: "while(true) { searchForSoulmate(); }",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    languages: ["Python", "Django", "AWS"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "3",
    name: "Sophia",
    age: 26,
    bio: "if (youLikeMe && iLikeYou) { return 'Perfect match!'; }",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    languages: ["TypeScript", "Angular", "MongoDB"],
    lookingFor: "Code review partner"
  },
  {
    id: "4",
    name: "Alex",
    age: 30,
    bio: "console.log('Seeking someone to share my code and life with');",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    languages: ["Ruby", "Rails", "PostgreSQL"],
    githubUrl: "https://github.com"
  },
  {
    id: "5",
    name: "Emma",
    age: 27,
    bio: "class Personality { constructor() { this.traits = ['Creative', 'Analytical', 'Romantic']; } }",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    languages: ["Java", "Spring", "React Native"],
    linkedinUrl: "https://linkedin.com",
    lookingFor: "Startup co-founder"
  }
];

export const mockMatches: Profile[] = [
  {
    id: "6",
    name: "David",
    age: 31,
    bio: "git commit -m 'Looking for a meaningful connection'",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    languages: ["C#", ".NET", "Azure"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com"
  },
  {
    id: "7",
    name: "Olivia",
    age: 25,
    bio: "sudo apt-get install perfect-date",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop",
    languages: ["Go", "Docker", "Kubernetes"],
    githubUrl: "https://github.com"
  }
];
