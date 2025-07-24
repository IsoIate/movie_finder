import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './NavigationBar';
import { Providers } from './providers';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: 'Movie Finder',
  description: 'Find your favorite movies!',
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers>
          <NavigationBar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;