import {
  IconBuilding,
  IconClock,
  IconShield,
  IconUsers,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";
import {
  Feature,
  Service,
  FAQ,
  NavLink,
  ContactInfo,
  SocialLink,
  FooterSection,
} from "../types";

// Color Theme
export const COLORS = {
  primary: "#8B1538",
  primaryDark: "#6B1129",
  primaryDarker: "#4A0B1C",
  accent: "#E63946",
  lightBg: "#FFF6F2",
  pinkAccent: "#FFE4E9",
  pinkLight: "#FFB3C1",
} as const;

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { href: "#features", label: "Features" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

// Features Data
export const FEATURES: Feature[] = [
  {
    icon: IconBuilding,
    title: "Simplifies daily operations",
    description: `Every user's different—so you have three seamless ways to manage your society: Web Portal, Mobile App, or Kiosk. Each one tailored to make operations easier, faster, and better for you.`,
  },
  {
    icon: IconClock,
    title: "Automates Branches & Functions",
    description:
      "Let our smart AI and ML-powered features handle the heavy lifting. From visitor logs to maintenance schedules, automate and optimize every aspect of your society.",
  },
  {
    icon: IconShield,
    title: "Strengthens Security",
    description:
      "To identify and ensure the security of your community by developing a robust visitor management system that effectively monitors and controls access.",
  },
];

// Services Data
export const SERVICES: Service[] = [
  {
    icon: IconUsers,
    title: "Residents",
    description: "Seamless access to all society services and updates",
  },
  {
    icon: IconBuilding,
    title: "Society Management",
    description: "Complete control and transparency in operations",
  },
  {
    icon: IconShield,
    title: "Security Personnel",
    description: "Efficient visitor tracking and access control",
  },
  {
    icon: IconUsers,
    title: "Gate Keepers",
    description: "Streamlined entry and exit management",
  },
];

// FAQ Data
export const FAQS: FAQ[] = [
  {
    question: "What is SMS and how does it work for your society?",
    answer:
      "SMS (Society Management System) is a comprehensive platform that digitizes all aspects of society management. From visitor tracking to billing, maintenance requests to announcements - everything is managed through our intuitive interface.",
  },
  {
    question: "Can I track society bills, dues and owed money on SMS?",
    answer:
      "Absolutely! SMS provides complete transparency in billing with real-time tracking of all dues, pending payments, and transaction history. Set up automated reminders and payment schedules.",
  },
  {
    question: "Is there a pre-registration for guests arriving using SMS?",
    answer:
      "Yes, residents can pre-register their guests through the app or web portal. Security personnel receive instant notifications, making the entry process seamless and secure.",
  },
  {
    question: "How can I find a paid plan services using SMS?",
    answer:
      "Visit our pricing page or contact our sales team. We offer flexible plans based on society size and requirements with no hidden charges.",
  },
  {
    question: "Can I add other companies with their own data on SMS?",
    answer:
      "Yes, SMS supports multi-society management. Each society maintains its own secure database while you manage everything from a single dashboard.",
  },
];

// Contact Info
export const CONTACT_INFO: ContactInfo = {
  email: "contact@stlindia.com",
  phone: "+91674 2973271",
  address:
    "Plot no 364, 2nd Floor, Janpath, Saheed Nagar, Bhubaneswar, Odisha 751007",
};

// Social Links
export const SOCIAL_LINKS: SocialLink[] = [
  { icon: IconBrandFacebook, href: "#", label: "Facebook" },
  { icon: IconBrandInstagram, href: "#", label: "Instagram" },
  { icon: IconBrandTwitter, href: "#", label: "Twitter" },
];

// Footer Sections
export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "Community App", href: "#" },
      { label: "Ad Platform", href: "#" },
      { label: "Locks", href: "#" },
      { label: "ERP Module", href: "#" },
      { label: "Society Accounting Software", href: "#" },
      { label: "Gate Module", href: "#" },
      { label: "Resident App", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "All Features", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Webinar", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Dispatch", href: "#" },
    ],
  },
];

// Brand Info
export const BRAND = {
  name: "SMS",
  fullName: "Society Management System",
  tagline: "Reinventing Community Living",
  developer: "Best Scheduled Shifts Ltd",
} as const;
