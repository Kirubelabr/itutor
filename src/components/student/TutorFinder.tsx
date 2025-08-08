import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  Clock,
  Globe,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  Calendar as CalendarIcon,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TutorCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  subjects: string[];
  languages: string[];
  hourlyRate: number;
  availability: string;
  description: string;
  weeklyAvailability?: {
    [key: string]: string[];
  };
  openSchedule?: {
    date: string;
    timeSlots: string[];
  }[];
  sessionFormats?: string[];
  sessionDurations?: string[];
}

const TutorFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [sortOption, setSortOption] = useState("rating");

  // Mock data for tutors
  const tutors: TutorCardProps[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 4.9,
      subjects: ["Mathematics", "Physics", "Calculus"],
      languages: ["English", "Spanish"],
      hourlyRate: 45,
      availability: "Weekdays, Evenings",
      description:
        "PhD in Mathematics with 10+ years of teaching experience. Specializes in advanced calculus and physics.",
      weeklyAvailability: {
        Monday: ["Morning", "Evening"],
        Tuesday: ["Morning", "Afternoon"],
        Wednesday: ["Evening"],
        Thursday: ["Morning", "Evening"],
        Friday: ["Afternoon"],
      },
      openSchedule: [
        {
          date: "2024-01-15",
          timeSlots: ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM"],
        },
        {
          date: "2024-01-16",
          timeSlots: ["10:00 AM - 11:00 AM", "3:00 PM - 4:00 PM"],
        },
        { date: "2024-01-17", timeSlots: ["1:00 PM - 2:00 PM"] },
      ],
      sessionFormats: ["Online", "In-person"],
      sessionDurations: ["60 min", "90 min"],
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4.7,
      subjects: ["Computer Science", "Programming", "Data Structures"],
      languages: ["English", "Mandarin"],
      hourlyRate: 55,
      availability: "Weekends, Evenings",
      description:
        "Computer Science professor with expertise in algorithms, data structures, and programming languages.",
      weeklyAvailability: {
        Saturday: ["Morning", "Afternoon"],
        Sunday: ["Afternoon", "Evening"],
        Monday: ["Evening"],
        Wednesday: ["Evening"],
      },
      openSchedule: [
        {
          date: "2024-01-20",
          timeSlots: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
        },
        {
          date: "2024-01-21",
          timeSlots: ["2:00 PM - 3:00 PM", "6:00 PM - 7:00 PM"],
        },
      ],
      sessionFormats: ["Online"],
      sessionDurations: ["60 min", "90 min", "120 min"],
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 4.8,
      subjects: ["Literature", "Writing", "English"],
      languages: ["English", "French", "Spanish"],
      hourlyRate: 35,
      availability: "Flexible",
      description:
        "MFA in Creative Writing with experience teaching literature and composition at university level.",
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      rating: 4.6,
      subjects: ["Chemistry", "Biology", "Organic Chemistry"],
      languages: ["English"],
      hourlyRate: 50,
      availability: "Weekdays, Mornings",
      description:
        "PhD in Chemistry with research background. Specializes in organic chemistry and biochemistry.",
    },
    {
      id: "5",
      name: "Sophia Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
      rating: 4.9,
      subjects: ["History", "Political Science", "Sociology"],
      languages: ["English", "Hindi", "Urdu"],
      hourlyRate: 40,
      availability: "Weekends, Evenings",
      description:
        "History professor specializing in world history, political movements, and social studies.",
    },
    {
      id: "6",
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 4.5,
      subjects: ["Music Theory", "Piano", "Composition"],
      languages: ["English", "Korean"],
      hourlyRate: 60,
      availability: "Afternoons, Weekends",
      description:
        "Juilliard graduate with 15 years of experience teaching piano and music theory to all levels.",
    },
  ];

  // Subject categories for filtering
  const subjectCategories = [
    {
      name: "Mathematics",
      subjects: ["Algebra", "Calculus", "Geometry", "Statistics"],
    },
    {
      name: "Sciences",
      subjects: ["Physics", "Chemistry", "Biology", "Computer Science"],
    },
    {
      name: "Languages",
      subjects: ["English", "Spanish", "French", "Mandarin"],
    },
    {
      name: "Humanities",
      subjects: ["History", "Literature", "Philosophy", "Political Science"],
    },
    {
      name: "Arts",
      subjects: ["Music", "Visual Arts", "Theater", "Film Studies"],
    },
  ];

  // Languages for filtering
  const languages = [
    "English",
    "Spanish",
    "French",
    "Mandarin",
    "Hindi",
    "Arabic",
    "Russian",
    "Portuguese",
    "Japanese",
    "Korean",
  ];

  // Availability options
  const availabilityOptions = [
    "Weekdays",
    "Weekends",
    "Mornings",
    "Afternoons",
    "Evenings",
  ];

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find Your Perfect Tutor</h1>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by subject, name, or keyword"
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="w-full md:w-1/4 bg-card rounded-lg border p-4 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Filter size={18} /> Filters
              </h2>
              <Button variant="ghost" size="sm">
                Reset
              </Button>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range ($/hour)</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[20, 100]}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Subject Categories */}
            <Accordion type="multiple" className="mb-4">
              {subjectCategories.map((category, index) => (
                <AccordionItem key={index} value={`category-${index}`}>
                  <AccordionTrigger className="py-2">
                    {category.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pl-2">
                      {category.subjects.map((subject, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`subject-${index}-${subIndex}`} />
                          <label
                            htmlFor={`subject-${index}-${subIndex}`}
                            className="text-sm"
                          >
                            {subject}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Languages */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Globe size={16} /> Languages
              </h3>
              <div className="flex flex-col gap-2">
                {languages.slice(0, 6).map((language, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`language-${index}`} />
                    <label htmlFor={`language-${index}`} className="text-sm">
                      {language}
                    </label>
                  </div>
                ))}
                <Button variant="link" size="sm" className="text-xs mt-1">
                  Show more languages
                </Button>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Clock size={16} /> Availability
              </h3>
              <div className="flex flex-col gap-2">
                {availabilityOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`availability-${index}`} />
                    <label
                      htmlFor={`availability-${index}`}
                      className="text-sm"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-3/4">
            {/* Sorting and results count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">
                  {tutors.length}
                </span>{" "}
                tutors found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="price_low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tutor cards */}
            <div className="grid grid-cols-1 gap-4">
              {tutors.map((tutor) => (
                <Card
                  key={tutor.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex flex-col items-center md:w-1/4 border-r border-border">
                      <Avatar className="h-20 w-20 mb-3">
                        <AvatarImage src={tutor.avatar} alt={tutor.name} />
                        <AvatarFallback>
                          {tutor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg text-center mb-1">
                        {tutor.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tutor.rating}</span>
                      </div>
                      <div className="mt-auto">
                        <p className="font-bold text-xl text-center">
                          ${tutor.hourlyRate}/hr
                        </p>
                      </div>
                    </div>

                    <div className="p-4 md:w-3/4 flex flex-col">
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <BookOpen size={14} /> Subjects
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.slice(0, 3).map((subject, index) => (
                            <Badge key={index} variant="secondary">
                              {subject}
                            </Badge>
                          ))}
                          {tutor.subjects.length > 3 && (
                            <Badge variant="outline">
                              +{tutor.subjects.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                          <Globe size={14} /> Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {tutor.languages.map((language, index) => (
                            <Badge key={index} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {tutor.availability}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {tutor.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <Button className="flex-1">Book a Session</Button>
                        <Link to={`/tutor/${tutor.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorFinder;
