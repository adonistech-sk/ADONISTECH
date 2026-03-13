import React from 'react';
import Component from '../components/ui/stacking-card';

const projects = [
  {
    title: 'Web Development',
    description:
      'We build modern websites, that help businesses stand out online.',
    link: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Gemini_Generated_Image_8rr30t8rr30t8rr3.webp',
    color: '#5196fd',
  },
  {
    title: 'Branding',
    description:
      "We will create your company's name, logo or even visual identity.",
    link: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Branding.webp.webp',
    color: '#5196fd',
  },
  {
    title: 'Product Design',
    description:
      'We design digital products that are simple, useful, and easy to use.',
    link: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Design.webp.webp',
    color: '#5196fd',
  },
  {
    title: 'Software Automation',
    description:
      'We develop custom software that helps businesses run and grow more efficiently.',
    link: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/Software.webp.webp',
    color: '#5196fd',
  },
  {
    title: '3D Animation',
    description:
      'We create 3D visuals and animations that help ideas and brands come to life.',
    link: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Public%20main/3D.webp.webp',
    color: '#5196fd',
  },
];

export function StackingCardDemo() {
  return (
    <Component projects={projects} />
  );
}
