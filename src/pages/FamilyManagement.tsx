
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FamilyProfileCard } from "@/components/family/FamilyProfileCard";
import { AddFamilyMemberDialog } from "@/components/family/AddFamilyMemberDialog";
import { useFamilyProfiles } from "@/hooks/useFamilyProfiles";
import { Users, Search, Heart, Shield, Clock } from "lucide-react";

const FamilyManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProfile, setEditingProfile] = useState(null);
  const { profiles, isLoading, deleteProfile } = useFamilyProfiles();

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditProfile = (profile: any) => {
    setEditingProfile(profile);
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (window.confirm("Are you sure you want to remove this family member?")) {
      await deleteProfile.mutateAsync(profileId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading family profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Family Health Management
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage health profiles for your entire family in one secure platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-3xl font-bold text-medical-primary">{profiles.length}</p>
                </div>
                <Users className="h-12 w-12 text-medical-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Profiles</p>
                  <p className="text-3xl font-bold text-green-600">
                    {profiles.filter(p => p.is_active).length}
                  </p>
                </div>
                <Heart className="h-12 w-12 text-green-600/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Data Protected</p>
                  <p className="text-3xl font-bold text-blue-600">100%</p>
                </div>
                <Shield className="h-12 w-12 text-blue-600/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search family members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <AddFamilyMemberDialog />
        </div>

        {/* Family Members Grid */}
        {filteredProfiles.length === 0 ? (
          <Card className="health-card">
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-accent mb-2">
                {searchQuery ? "No matching family members" : "No family members added yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "Start by adding your first family member to manage their health profile"
                }
              </p>
              {!searchQuery && <AddFamilyMemberDialog />}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <FamilyProfileCard
                key={profile.id}
                profile={profile}
                onEdit={handleEditProfile}
                onDelete={handleDeleteProfile}
              />
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        {editingProfile && (
          <AddFamilyMemberDialog
            editingProfile={editingProfile}
            onClose={() => setEditingProfile(null)}
          />
        )}

        {/* Family Health Tips */}
        <Card className="health-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-medical-primary" />
              Family Health Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Regular Health Checkups</h4>
                  <p className="text-sm text-accent">
                    Schedule annual health checkups for all family members to catch issues early.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Family Medical History</h4>
                  <p className="text-sm text-blue-700">
                    Keep track of genetic conditions that may affect multiple family members.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Emergency Preparedness</h4>
                  <p className="text-sm text-green-700">
                    Ensure all family members know important medical information and emergency contacts.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Data Privacy</h4>
                  <p className="text-sm text-purple-700">
                    Your family's health data is encrypted and protected according to Indian privacy laws.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyManagement;
