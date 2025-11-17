import './dev.css'; // Import the stylesheet here
import '../components.css';
import '../globals.css';

export default function DevPlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="playground-container glass">
      <header className="playground-header glass">
      </header>
      <main className="playground-main glass">
        {children}
      </main>
    </div>
  );
}