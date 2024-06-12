import "./globals.css";


export const metadata = {
  title: "Travel Website",
  description: "A demo app",
};

const RootLayout = ({ children }) =>{
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout
