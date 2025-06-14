'use client';

import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactMap from '@/components/contact/ContactMap';

export default function Contact() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
      <ContactInfo />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ContactMap />
        </div>
      </div>
    </main>
  );
} 