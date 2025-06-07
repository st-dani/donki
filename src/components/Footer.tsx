import FooterInfo from './footer/FooterInfo';
import FooterLinks from './footer/FooterLinks';
import FooterSocial from './footer/FooterSocial';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <FooterInfo />
          <FooterLinks />
          <FooterSocial />
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} 돈키호테. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 