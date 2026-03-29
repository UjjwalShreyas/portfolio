export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 text-center text-gray-400 bg-[var(--color-dark-bg)] relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} G. Ujjwal Shreyas. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <a href="https://github.com/UjjwalShreyas" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:border-[var(--color-scarlet-red)] border-b border-transparent pb-1 transition-all" data-interactive="true">GitHub</a>
          <a href="https://www.linkedin.com/in/ujjwalshreyasg" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:border-[var(--color-scarlet-red)] border-b border-transparent pb-1 transition-all" data-interactive="true">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
