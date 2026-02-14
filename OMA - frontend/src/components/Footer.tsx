export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6 mt-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} OMA. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-700 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
