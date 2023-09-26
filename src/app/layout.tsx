import getIntl from "./intl";
import Providers from "./providers/Providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const intl = await getIntl('home');
  return (
    <html lang="en">
      <body>
        <Providers messages={intl.messages} locale={intl.locale}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
