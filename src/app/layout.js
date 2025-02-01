import '../styles/globals.css';
// import NavBar from '../components/NavBar';

export const metadata = {
    title: 'Bhagavad Gita',
    description: 'A simple app which provides information about the Bhagavad Gita',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/* <NavBar /> */}
                <main>{children}</main>
            </body>
        </html>
    );
}
