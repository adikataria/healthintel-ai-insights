
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash2, User, Calendar, Heart, FileText } from "lucide-react";
import { format } from "date-fns";

interface FamilyProfile {
  id: string;
  name: string;
  relationship: string;
  date_of_birth?: string;
  gender?: string;
  is_active: boolean;
  medical_notes?: string;
}

interface FamilyProfileCardProps {
  profile: FamilyProfile;
  onEdit: (profile: FamilyProfile) => void;
  onDelete: (id: string) => void;
}

export const FamilyProfileCard = ({ profile, onEdit, onDelete }: FamilyProfileCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getRelationshipColor = (relationship: string) => {
    const colors: Record<string, string> = {
      'spouse': 'bg-pink-100 text-pink-800',
      'child': 'bg-blue-100 text-blue-800',
      'parent': 'bg-green-100 text-green-800',
      'sibling': 'bg-purple-100 text-purple-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[relationship?.toLowerCase()] || colors['other'];
  };

  return (
    <Card className="health-card hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-medical-primary text-white">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{profile.name}</CardTitle>
              <Badge className={getRelationshipColor(profile.relationship)}>
                {profile.relationship}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(profile)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(profile.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {profile.date_of_birth && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(profile.date_of_birth), 'MMM dd, yyyy')} 
              ({getAge(profile.date_of_birth)} years old)
            </span>
          </div>
        )}
        
        {profile.gender && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{profile.gender}</span>
          </div>
        )}
        
        {profile.medical_notes && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mt-0.5" />
            <span className="line-clamp-2">{profile.medical_notes}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-medical-primary" />
            <span className="text-sm font-medium">Health Status</span>
          </div>
          <Badge variant={profile.is_active ? "default" : "secondary"}>
            {profile.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
