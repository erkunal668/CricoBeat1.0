import type React from "react"
import {
  Activity,
  Bike,
  Dumbbell,
  Heart,
  NotebookIcon,
  ShoppingBag,
  Swords,
  Shield,
  Table,
  Target,
  Zap,
  BanIcon as Badminton,
  FishIcon as Swimming,
  SquircleIcon as Squash,
  ClubIcon as Football,
} from "lucide-react"
import { createClient } from "@/lib/supabase/server" // Import server-side Supabase client

// Define types for better type safety
export type Subcategory = {
  name: string
  slug: string
  description: string
  imageUrl?: string // Added for subcategory logo/image
  icon?: React.ElementType // Optional icon for subcategories
}

export type Category = {
  name: string
  slug: string
  icon: React.ElementType // Lucide React icon component
  description: string
  subcategories: Subcategory[]
}

export type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

export type Testimonial = {
  id: string
  author: string
  quote: string
  approved: boolean
}

export type MembershipPlan = {
  id: string
  name: string
  price: number
  duration: string
  category: string // Main category slug
  subcategorySlug: string // Specific subcategory slug
  features: string[]
}

// NEW: Type for Shopping Items (matches Supabase table structure)
export type ShoppingItem = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  discount?: number | null // Optional discount percentage, can be null from DB
  image_urls: string[] // Array for multiple images (renamed from imageUrls to match DB)
  subcategory_slug: string // e.g., "Cricket Gear", "Gym Apparel" (slug) (renamed from subcategory)
  created_at: string // ISO timestamp string
  updated_at: string // ISO timestamp string
}

// Existing categories data (for admin panel, etc.)
export const categoriesData: Category[] = [
  {
    name: "Cricket",
    slug: "cricket",
    icon: Activity,
    description: "Master your game.",
    subcategories: [
      { name: "Fast Bowling", slug: "fast-bowling", description: "Techniques for speed and accuracy.", icon: Zap },
      { name: "Batting Skills", slug: "batting-skills", description: "Master strokes and timing.", icon: Swords },
      { name: "Wicket Keeping", slug: "wicket-keeping", description: "Drills for agility and reflexes.", icon: Shield },
      { name: "Fielding Drills", slug: "fielding-drills", description: "Improve catching and throwing.", icon: Target },
      {
        name: "Cricket Fitness",
        slug: "cricket-fitness",
        description: "Conditioning for peak performance.",
        icon: Bike,
      },
    ],
  },
  {
    name: "Gym",
    slug: "gym",
    icon: Dumbbell,
    description: "Build strength and endurance.",
    subcategories: [
      { name: "Weight Training", slug: "weight-training", description: "Strength building programs." },
      { name: "Cardio Workouts", slug: "cardio-workouts", description: "Improve cardiovascular health." },
      { name: "CrossFit", slug: "crossfit", description: "High-intensity functional training." },
      { name: "Bodybuilding", slug: "bodybuilding", description: "Sculpt your physique." },
    ],
  },
  {
    name: "Yoga",
    slug: "yoga",
    icon: NotebookIcon,
    description: "Find your balance and peace.",
    subcategories: [
      { name: "Hatha Yoga", slug: "hatha-yoga", description: "Gentle and foundational poses." },
      { name: "Vinyasa Flow", slug: "vinyasa-flow", description: "Dynamic and flowing sequences." },
      { name: "Restorative Yoga", slug: "restorative-yoga", description: "Relaxation and deep stretching." },
      { name: "Power Yoga", slug: "power-yoga", description: "Intense and invigorating practice." },
    ],
  },
  {
    name: "Shopping",
    slug: "shopping",
    icon: ShoppingBag,
    description: "Gear up for success.",
    subcategories: [
      { name: "Cricket Gear", slug: "cricket-gear", description: "Bats, pads, gloves, and more." },
      { name: "Gym Apparel", slug: "gym-apparel", description: "Comfortable and functional workout clothes." },
      { name: "Yoga Mats & Props", slug: "yoga-mats-props", description: "Essentials for your yoga practice." },
      { name: "Supplements", slug: "supplements", description: "Boost your performance and recovery." },
    ],
  },
  {
    name: "Full Health Guide",
    slug: "full-health-guide",
    icon: Heart,
    description: "Holistic wellness for life.",
    subcategories: [
      { name: "Nutrition Plans", slug: "nutrition-plans", description: "Personalized diet and meal plans." },
      { name: "Mental Wellness", slug: "mental-wellness", description: "Mindfulness and stress reduction." },
      {
        name: "Recovery & Injury Prevention",
        slug: "recovery-injury-prevention",
        description: "Tips for optimal recovery.",
      },
      { name: "Sleep Optimization", slug: "sleep-optimization", description: "Strategies for better sleep." },
    ],
  },
]

// New data for the home page courses, matching the screenshot
export const coursesData = [
  {
    name: "Youth Cricket",
    description: "Building tomorrow's champions with age-appropriate training programs for young cricketers.",
    slug: "youth-cricket",
    highlighted: false,
  },
  {
    name: "Junior Training",
    description: "Intermediate level coaching focusing on technique refinement and match strategies.",
    slug: "junior-training",
    highlighted: true, // Highlighted as per screenshot
  },
  {
    name: "Beginner's Course",
    description: "Start your cricket journey with our comprehensive beginner-friendly programs.",
    slug: "beginners-course",
    highlighted: false,
  },
  {
    name: "Leg Spin Mastery",
    description: "Specialized coaching for aspiring leg spinners with expert guidance and techniques.",
    slug: "leg-spin-mastery",
    highlighted: false,
  },
  {
    name: "Full Academy",
    description: "Complete cricket education with all-round skills development and match preparation.",
    slug: "full-academy",
    highlighted: false,
  },
]

export const usersData: User[] = [
  { id: "user1", name: "Alice Smith", email: "alice@example.com", role: "user" },
  { id: "user2", name: "Bob Johnson", email: "bob@example.com", role: "user" },
  { id: "user3", name: "Charlie Brown", email: "charlie@example.com", role: "admin" },
]

export const testimonialsData: Testimonial[] = [
  {
    id: "test1",
    author: "Rahul Sharma, State Player",
    quote:
      "Cricobeat transformed my game completely. The coaches are exceptional and the training methods are world-class.",
    approved: true,
  },
  {
    id: "test2",
    author: "Jane Smith, Fitness Enthusiast",
    quote: "The gym workouts are challenging and well-structured. I've seen amazing results!",
    approved: true,
  },
  {
    id: "test3",
    author: "Alice Johnson, Yoga Practitioner",
    quote: "The yoga sessions are so calming and help me maintain my flexibility. Highly recommend!",
    approved: true,
  },
  {
    id: "test4",
    author: "Bob Williams, Health Seeker",
    quote: "The Full Health Guide is comprehensive and easy to follow. It's changed my life!",
    approved: true,
  },
]

export const membershipPlansData: MembershipPlan[] = [
  {
    id: "plan-quarterly-fast-bowling",
    name: "Quarterly Plan",
    price: 6800,
    duration: "3 Months",
    category: "cricket",
    subcategorySlug: "fast-bowling",
    features: [
      "36 Training Sessions",
      "Premium Equipment Access",
      "Personal Coaching",
      "Monthly Assessment",
      "Match Opportunities",
    ],
  },
  {
    id: "plan-annual-fast-bowling",
    name: "Annual Plan",
    price: 24000,
    duration: "12 Months",
    category: "cricket",
    subcategorySlug: "fast-bowling",
    features: [
      "144 Training Sessions",
      "Premium Equipment Access",
      "Personal Coaching",
      "Bi-Monthly Assessment",
      "Guaranteed Match Opportunities",
      "Advanced Analytics",
    ],
  },
  {
    id: "plan-monthly-batting",
    name: "Monthly Batting Plan",
    price: 2500,
    duration: "1 Month",
    category: "cricket",
    subcategorySlug: "batting-skills",
    features: ["8 Training Sessions", "Basic Equipment Access", "Group Coaching"],
  },
  {
    id: "plan-fielding-basic",
    name: "Fielding Basics",
    price: 2200,
    duration: "1 Month",
    category: "cricket",
    subcategorySlug: "fielding-drills",
    features: [
      "8 Intensive Fielding Sessions",
      "Throwing & Catching Drills",
      "Agility Ladder Workouts",
      "Situational Fielding Practice",
    ],
  },
  {
    id: "plan-cricket-gear-package",
    name: "Cricket Gear Package",
    price: 5000,
    duration: "One-Time Purchase",
    category: "shopping",
    subcategorySlug: "cricket-gear",
    features: [
      "Premium Bat",
      "Professional Leather Ball",
      "Pair of Batting Gloves",
      "Lightweight Pads",
      "Cricobeat Branded Kit Bag",
    ],
  },
  // Add more plans for other subcategories as needed
]

// ─────────────────────────────────────────────────────────────────────────
// Fetch all shopping items (safe even if the table hasn’t been created) ──
export async function getShoppingItems(): Promise<ShoppingItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("shopping_items").select("*").order("created_at", { ascending: false })

  // If the table hasn’t been created yet, Postgres returns code 42P01
  // (“relation does not exist”).  Return an empty list instead of crashing.
  if (error) {
    if (error.code === "42P01" || /does not exist/i.test(error.message)) {
      console.warn(
        `[getShoppingItems] The "shopping_items" table is missing – run scripts/002-create-shopping-items-table.sql`,
      )
      return []
    }
    console.error("[getShoppingItems] Supabase error:", error.message)
    return []
  }

  return data as ShoppingItem[]
}

// Data for the "What sport do you play?" screen
export const sportsSelectionData = [
  { id: "badminton", name: "Badminton", image: "/placeholder.svg?height=100&width=100", icon: Badminton },
  { id: "swimming", name: "Swimming", image: "/placeholder.svg?height=100&width=100", icon: Swimming },
  { id: "squash", name: "Squash", image: "/placeholder.svg?height=100&width=100", icon: Squash },
  { id: "football", name: "Football", image: "/placeholder.svg?height=100&width=100", icon: Football },
  { id: "box-cricket", name: "Box Cricket", image: "/placeholder.svg?height=100&width=100", icon: Activity },
  { id: "table-tennis", name: "Table Tennis", image: "/placeholder.svg?height=100&width=100", icon: Table },
]

// WhatsApp contact number (replace with your actual number)
export const WHATSAPP_NUMBER = "9939619930"
