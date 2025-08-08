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
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  Plus,
  X,
} from "lucide-react";

interface FormStep {
  title: string;
  description: string;
}

const TutorRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: string[] }>({});
  const [recurringSchedule, setRecurringSchedule] = useState<{
    [key: string]: boolean;
  }>({});

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
      description: "Set your weekly availability",
    },
    {
      title: "Open Schedule",
      description: "Choose specific dates and times",
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
          {currentStep === 4 && (
            <AvailabilityStep
              recurringSchedule={recurringSchedule}
              setRecurringSchedule={setRecurringSchedule}
            />
          )}
          {currentStep === 5 && (
            <OpenScheduleStep
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              timeSlots={timeSlots}
              setTimeSlots={setTimeSlots}
            />
          )}
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

interface AvailabilityStepProps {
  recurringSchedule: { [key: string]: boolean };
  setRecurringSchedule: (schedule: { [key: string]: boolean }) => void;
}

const AvailabilityStep: React.FC<AvailabilityStepProps> = ({
  recurringSchedule,
  setRecurringSchedule,
}) => {
  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  const timeSlots = [
    { key: "morning", label: "Morning", time: "8:00 AM - 12:00 PM" },
    { key: "afternoon", label: "Afternoon", time: "12:00 PM - 5:00 PM" },
    { key: "evening", label: "Evening", time: "5:00 PM - 9:00 PM" },
  ];

  const handleDayToggle = (dayKey: string) => {
    setRecurringSchedule((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const handleTimeSlotToggle = (dayKey: string, timeKey: string) => {
    const key = `${dayKey}-${timeKey}`;
    setRecurringSchedule((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Weekly Recurring Availability</h3>
        <p className="text-sm text-muted-foreground">
          Set your regular weekly schedule. Students will see these as your
          standard available times.
        </p>
      </div>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <Card key={day.key} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={day.key}
                    checked={recurringSchedule[day.key] || false}
                    onCheckedChange={() => handleDayToggle(day.key)}
                  />
                  <Label htmlFor={day.key} className="font-medium text-base">
                    {day.label}
                  </Label>
                </div>
                {recurringSchedule[day.key] && (
                  <Badge variant="secondary" className="text-xs">
                    Available
                  </Badge>
                )}
              </div>

              {recurringSchedule[day.key] && (
                <div className="ml-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => {
                    const slotKey = `${day.key}-${slot.key}`;
                    return (
                      <div
                        key={slot.key}
                        className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-muted/50"
                      >
                        <Checkbox
                          id={slotKey}
                          checked={recurringSchedule[slotKey] || false}
                          onCheckedChange={() =>
                            handleTimeSlotToggle(day.key, slot.key)
                          }
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={slotKey}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {slot.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {slot.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h4 className="font-medium mb-3">Session Format</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="online" defaultChecked />
              <Label htmlFor="online">Online Sessions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="inPerson" />
              <Label htmlFor="inPerson">In-person Sessions</Label>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-3">Session Duration Options</h4>
          <RadioGroup defaultValue="60" className="space-y-2">
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
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <Label htmlFor="hourlyRate" className="text-base font-medium">
            Hourly Rate (USD)
          </Label>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">$</span>
            <Input
              id="hourlyRate"
              type="number"
              placeholder="45"
              className="text-lg font-medium"
              defaultValue="45"
            />
            <span className="text-muted-foreground">/hour</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Set a competitive rate based on your experience and qualifications.
          </p>
        </div>
      </Card>
    </div>
  );
};

interface OpenScheduleStepProps {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  timeSlots: { [key: string]: string[] };
  setTimeSlots: (slots: { [key: string]: string[] }) => void;
}

const OpenScheduleStep: React.FC<OpenScheduleStepProps> = ({
  selectedDates,
  setSelectedDates,
  timeSlots,
  setTimeSlots,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [customTimeSlot, setCustomTimeSlot] = useState("");

  const predefinedTimeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      const dateKey = date.toDateString();
      if (!selectedDates.find((d) => d.toDateString() === dateKey)) {
        setSelectedDates([...selectedDates, date]);
        setTimeSlots({ ...timeSlots, [dateKey]: [] });
      }
    }
  };

  const addTimeSlot = (dateKey: string, slot: string) => {
    const currentSlots = timeSlots[dateKey] || [];
    if (!currentSlots.includes(slot)) {
      setTimeSlots({
        ...timeSlots,
        [dateKey]: [...currentSlots, slot],
      });
    }
  };

  const removeTimeSlot = (dateKey: string, slot: string) => {
    const currentSlots = timeSlots[dateKey] || [];
    setTimeSlots({
      ...timeSlots,
      [dateKey]: currentSlots.filter((s) => s !== slot),
    });
  };

  const removeDateSlot = (dateToRemove: Date) => {
    const dateKey = dateToRemove.toDateString();
    setSelectedDates(selectedDates.filter((d) => d.toDateString() !== dateKey));
    const newTimeSlots = { ...timeSlots };
    delete newTimeSlots[dateKey];
    setTimeSlots(newTimeSlots);
  };

  const addCustomTimeSlot = (dateKey: string) => {
    if (customTimeSlot.trim()) {
      addTimeSlot(dateKey, customTimeSlot.trim());
      setCustomTimeSlot("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Open Schedule</h3>
        <p className="text-sm text-muted-foreground">
          Select specific dates and times when you're available for sessions.
          This helps students book at their convenience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Selection */}
        <Card className="p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Select Available Dates
          </h4>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </Card>

        {/* Selected Dates and Time Slots */}
        <Card className="p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Available Time Slots
          </h4>

          {selectedDates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Select dates from the calendar to add time slots</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedDates.map((date) => {
                const dateKey = date.toDateString();
                const slots = timeSlots[dateKey] || [];

                return (
                  <div key={dateKey} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium">
                        {date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDateSlot(date)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Predefined Time Slots */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {predefinedTimeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={slots.includes(slot) ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            slots.includes(slot)
                              ? removeTimeSlot(dateKey, slot)
                              : addTimeSlot(dateKey, slot)
                          }
                          className="text-xs h-8"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>

                    {/* Custom Time Slot Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., 8:00 PM - 9:00 PM"
                        value={customTimeSlot}
                        onChange={(e) => setCustomTimeSlot(e.target.value)}
                        className="text-sm"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addCustomTimeSlot(dateKey);
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addCustomTimeSlot(dateKey)}
                        className="px-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Selected Time Slots */}
                    {slots.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-muted-foreground mb-2">
                          Selected times:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {slots.map((slot) => (
                            <Badge
                              key={slot}
                              variant="secondary"
                              className="text-xs flex items-center gap-1"
                            >
                              {slot}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(dateKey, slot)}
                                className="h-3 w-3 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="h-2 w-2" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {selectedDates.length > 0 && (
        <Card className="p-4 bg-muted/50">
          <h4 className="font-medium mb-2">Summary</h4>
          <p className="text-sm text-muted-foreground">
            You have selected {selectedDates.length} date(s) with a total of{" "}
            {Object.values(timeSlots).reduce(
              (total, slots) => total + slots.length,
              0,
            )}{" "}
            time slot(s). Students will be able to book these specific times.
          </p>
        </Card>
      )}
    </div>
  );
};

export default TutorRegistrationForm;
