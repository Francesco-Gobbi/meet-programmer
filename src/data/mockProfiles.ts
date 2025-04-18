
export interface Profile {
  id: string;
  name: string;
  bio: string;
  image: string;
  programmingLanguages: string[];
  githubUrl?: string;
  operatingSystems: string[];
  hosting: string[];
}

const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Jane Developer',
    bio: 'console.log("Looking for someone to debug my heart");',
    image: 'https://i.pravatar.cc/300?img=1',
    programmingLanguages: ['JavaScript', 'TypeScript', 'React'],
    githubUrl: 'https://github.com/jane',
    operatingSystems: ['macOS'],
    hosting: ['VM', 'WordPress']
  },
  // Add more mock profiles as needed
];

export const getProfiles = (): Promise<Profile[]> => {
  return Promise.resolve(mockProfiles);
};

export const getMatches = (): Promise<Profile[]> => {
  return Promise.resolve(mockProfiles.slice(0, 2)); // Return first 2 profiles as matches for demo
};
