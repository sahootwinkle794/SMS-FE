import { Icon } from '@tabler/icons-react';

export interface Feature {
  icon: Icon;
  title: string;
  description: string;
}

export interface Service {
  icon: Icon;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLink {
  icon: Icon;
  href: string;
  label: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}
