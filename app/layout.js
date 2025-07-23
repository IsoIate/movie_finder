import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';


export const metadata = {
  title: 'Movie Finder',
  description: 'Find your favorite movies!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
