
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useFamilyProfiles } from "@/hooks/useFamilyProfiles";

interface AddFamilyMemberDialogProps {
  editingProfile?: any;
  onClose?: () => void;
}

export const AddFamilyMemberDialog = ({ editingProfile, onClose }: AddFamilyMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: editingProfile?.name || "",
    relationship: editingProfile?.relationship || "",
    date_of_birth: editingProfile?.date_of_birth || "",
    gender: editingProfile?.gender || "",
    medical_notes: editingProfile?.medical_notes || "",
    is_active: editingProfile?.is_active ?? true
  });

  const { createProfile, updateProfile } = useFamilyProfiles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProfile) {
        await updateProfile.mutateAsync({
          id: editingProfile.id,
          ...formData
        });
      } else {
        await createProfile.mutateAsync(formData);
      }
      
      setFormData({
        name: "",
        relationship: "",
        date_of_birth: "",
        gender: "",
        medical_notes: "",
        is_active: true
      });
      
      setOpen(false);
      onClose?.();
    } catch (error) {
      console.error("Error saving family member:", error);
    }
  };

  const relationships = [
    "Spouse",
    "Child",
    "Parent",
    "Sibling",
    "Grandparent",
    "Grandchild",
    "Other"
  ];

  const genders = ["Male", "Female", "Other"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!editingProfile && (
          <Button className="bg-medical-primary hover:bg-medical-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Family Member
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingProfile ? "Edit Family Member" : "Add Family Member"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship *</Label>
              <Select 
                value={formData.relationship} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, relationship: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map((rel) => (
                    <SelectItem key={rel} value={rel.toLowerCase()}>
                      {rel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender.toLowerCase()}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="medical_notes">Medical Notes</Label>
            <Textarea
              id="medical_notes"
              value={formData.medical_notes}
              onChange={(e) => setFormData(prev => ({ ...prev, medical_notes: e.target.value }))}
              placeholder="Any important medical information, allergies, conditions..."
              rows={3}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Active Profile</Label>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-medical-primary hover:bg-medical-dark"
              disabled={createProfile.isPending || updateProfile.isPending}
            >
              {createProfile.isPending || updateProfile.isPending 
                ? "Saving..." 
                : editingProfile ? "Update" : "Add Member"
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
