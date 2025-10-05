'use client';

import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Briefcase, Pencil, Upload, Award } from 'lucide-react';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/definitions';
import { EditSkillsDialog } from './edit-skills-dialog';
import { EditProfileDialog } from './edit-profile-dialog';


export function UserProfileCard() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const resumeUploadRef = useRef<HTMLInputElement>(null);
  
  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile } = useDoc<UserProfile>(userDocRef);


  if (!user || !userProfile) {
    return null;
  }

  const handleUploadClick = () => {
    resumeUploadRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Here you would handle the file upload, e.g., to Firebase Storage
    }
  };


  const profileStrength = userProfile?.skills?.length ? 25 + (userProfile.skills.length * 5) : 25;

  return (
    <>
    <Card>
      <CardContent className="p-6 text-center">
        <div className="relative inline-block">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src={userProfile?.photoURL ?? ''} alt={userProfile?.displayName ?? ''} />
            <AvatarFallback>{userProfile?.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
           <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full" onClick={() => setIsProfileDialogOpen(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
        
        <h2 className="text-xl font-bold mt-4">{userProfile?.displayName}</h2>
        <p className="text-sm text-muted-foreground">{userProfile.headline || 'Your headline here'}</p>
        
        <div className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {userProfile.location || 'Your location'}</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4"/> {userProfile.availability || 'Availability'}</span>
        </div>

        <div className="mt-4">
            <Badge variant="secondary" className="border-green-300 bg-green-100 text-green-800 font-semibold text-sm py-1 px-3">
                <Award className="w-4 h-4 mr-2"/>
                Google Intern
            </Badge>
        </div>

        <div className="mt-6 text-left">
            <p className="text-sm font-medium">Profile Strength</p>
            <Progress value={profileStrength} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
                {profileStrength < 100 ? `Add more details to improve your score!` : `Your profile is complete!`}
            </p>
        </div>
        
        <div className="mt-6 text-left">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm">Skills</h3>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsSkillsDialogOpen(true)}>
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-wrap gap-2">
                {userProfile?.skills?.length ? userProfile.skills.map((skill: string) => (
                    <Badge key={skill}>{skill}</Badge>
                )) : <p className="text-xs text-muted-foreground">Add your skills to attract recruiters.</p>}
            </div>
        </div>

        <Button variant="outline" className="w-full mt-6" onClick={handleUploadClick}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
        </Button>
        <input
            type="file"
            ref={resumeUploadRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx"
        />
      </CardContent>
    </Card>
     <EditSkillsDialog 
        isOpen={isSkillsDialogOpen}
        setIsOpen={setIsSkillsDialogOpen}
        currentSkills={userProfile?.skills || []}
        userId={user.uid}
     />
     <EditProfileDialog
        isOpen={isProfileDialogOpen}
        setIsOpen={setIsProfileDialogOpen}
        userProfile={userProfile}
     />
    </>
  );
}
    