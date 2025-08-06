import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface FormStep {
  title: string;
  description: string;
}

const TutorRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: FormStep[] = [
    {
      title: "Basic Information",
      description: "Tell us about yourself",
    },
    {
      title: "Qualifications & Credentials",
      description: "Your education and certifications",
    },
    {
      title: "Subject Expertise",
      description: "What subjects can you teach?",
    },
    {
      title: "Languages",
      description: "What languages do you speak?",
    },
    {
      title: "Availability Settings",
      description: "When are you available to teach?",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Tutor Registration
          </CardTitle>
          <CardDescription className="text-center">
            {steps[currentStep].description}
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {index < currentStep ? (
                      <CheckCircle size={16} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {currentStep === 0 && <BasicInformationStep />}
          {currentStep === 1 && <QualificationsStep />}
          {currentStep === 2 && <SubjectExpertiseStep />}
          {currentStep === 3 && <LanguagesStep />}
          {currentStep === 4 && <AvailabilityStep />}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={
              currentStep === steps.length - 1
                ? () => alert("Form submitted!")
                : nextStep
            }
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
            {currentStep !== steps.length - 1 && (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const BasicInformationStep = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john.doe@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="+1 (555) 123-4567" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell students about yourself, your teaching style, and experience..."
          className="min-h-[120px]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <Input id="profilePicture" type="file" />
      </div>
    </div>
  );
};

const QualificationsStep = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Education</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="degree">Highest Degree</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your highest degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="master">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" placeholder="University name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input id="fieldOfStudy" placeholder="e.g. Computer Science" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input id="graduationYear" placeholder="e.g. 2020" />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Certifications</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certificationName">Certification Name</Label>
            <Input
              id="certificationName"
              placeholder="e.g. Teaching Certification"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuingOrganization">Issuing Organization</Label>
            <Input
              id="issuingOrganization"
              placeholder="e.g. Board of Education"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expirationDate">
                Expiration Date (if applicable)
              </Label>
              <Input id="expirationDate" type="date" />
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          + Add Another Certification
        </Button>
      </div>
    </div>
  );
};

const SubjectExpertiseStep = () => {
  const subjects = [
    {
      id: "math",
      name: "Mathematics",
      subcategories: ["Algebra", "Calculus", "Statistics", "Geometry"],
    },
    {
      id: "science",
      name: "Science",
      subcategories: ["Physics", "Chemistry", "Biology", "Earth Science"],
    },
    {
      id: "english",
      name: "English",
      subcategories: ["Literature", "Writing", "Grammar", "ESL"],
    },
    {
      id: "history",
      name: "History",
      subcategories: [
        "World History",
        "US History",
        "European History",
        "Ancient History",
      ],
    },
    {
      id: "cs",
      name: "Computer Science",
      subcategories: [
        "Programming",
        "Web Development",
        "Data Science",
        "Algorithms",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Select subjects you can teach and your proficiency level for each.
      </p>

      {subjects.map((subject) => (
        <div key={subject.id} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id={subject.id} />
            <Label htmlFor={subject.id} className="font-medium">
              {subject.name}
            </Label>
          </div>

          <div className="ml-6 space-y-3">
            {subject.subcategories.map((subcategory, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id={`${subject.id}-${index}`} />
                  <Label htmlFor={`${subject.id}-${index}`}>
                    {subcategory}
                  </Label>
                </div>

                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <Separator />
        </div>
      ))}

      <div className="space-y-2">
        <Label htmlFor="otherSubjects">Other Subjects</Label>
        <Textarea
          id="otherSubjects"
          placeholder="List any other subjects you can teach that aren't mentioned above..."
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
};

const LanguagesStep = () => {
  const languages = [
    { id: "english", name: "English" },
    { id: "spanish", name: "Spanish" },
    { id: "french", name: "French" },
    { id: "german", name: "German" },
    { id: "chinese", name: "Chinese (Mandarin)" },
    { id: "japanese", name: "Japanese" },
    { id: "arabic", name: "Arabic" },
    { id: "russian", name: "Russian" },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Select languages you speak and your fluency level for each.
      </p>

      {languages.map((language) => (
        <div key={language.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id={language.id} />
            <Label htmlFor={language.id}>{language.name}</Label>
          </div>

          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Fluency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="fluent">Fluent</SelectItem>
              <SelectItem value="native">Native</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}

      <div className="space-y-2">
        <Label htmlFor="otherLanguages">Other Languages</Label>
        <Input
          id="otherLanguages"
          placeholder="List any other languages you speak..."
        />
      </div>
    </div>
  );
};

const AvailabilityStep = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeSlots = [
    "Morning (8AM-12PM)",
    "Afternoon (12PM-5PM)",
    "Evening (5PM-9PM)",
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Set your weekly availability for tutoring sessions.
      </p>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id={day.toLowerCase()} />
              <Label htmlFor={day.toLowerCase()} className="font-medium">
                {day}
              </Label>
            </div>

            <div className="ml-6 grid grid-cols-3 gap-2">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`${day.toLowerCase()}-${index}`} />
                  <Label
                    htmlFor={`${day.toLowerCase()}-${index}`}
                    className="text-sm"
                  >
                    {slot}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Session Preferences</h3>

        <div className="space-y-2">
          <Label>Session Format</Label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="online" />
              <Label htmlFor="online">Online</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="inPerson" />
              <Label htmlFor="inPerson">In-person</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Session Duration</Label>
          <RadioGroup defaultValue="60">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30" id="duration-30" />
              <Label htmlFor="duration-30">30 minutes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60" id="duration-60" />
              <Label htmlFor="duration-60">60 minutes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="90" id="duration-90" />
              <Label htmlFor="duration-90">90 minutes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="120" id="duration-120" />
              <Label htmlFor="duration-120">120 minutes</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
          <Input id="hourlyRate" type="number" placeholder="e.g. 25" />
        </div>
      </div>
    </div>
  );
};

export default TutorRegistrationForm;
