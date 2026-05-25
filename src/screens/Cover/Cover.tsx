import { Card, CardContent } from "../../components/ui/card";

const featureItems = [
  { accent: "UX", text: "Scenarios" },
  { accent: "Global", text: "Style Guide" },
  { accent: "Well", text: "Organized" },
  { accent: "150+", text: "Components" },
];

export const Cover = (): JSX.Element => {
  return (
    <main className="w-full bg-black">
      <section
        aria-label="QPay cover"
        className="mx-auto flex min-h-screen w-full max-w-[1920px] items-center justify-center bg-[url('/cover.png')] bg-cover bg-center bg-no-repeat"
      >
        <Card className="h-auto w-full border-0 bg-transparent shadow-none rounded-none">
          <CardContent className="grid min-h-screen grid-cols-1 items-center gap-10 px-6 py-8 sm:px-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,520px)_minmax(0,1fr)] md:px-16 lg:px-20 xl:px-24 2xl:px-28">
            <header className="flex flex-col justify-between gap-10 self-stretch md:py-6">
              <div className="flex items-center gap-3">
                <img
                  src="/cover.png"
                  alt=""
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <img
                    src="https://static.cdnlogo.com/logos/f/38/figma.svg"
                    alt="QPay logo mark"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-[18px] font-semibold leading-none text-white">
                    QPay
                  </span>
                </div>
              </div>
              <div className="max-w-[320px]">
                <h1 className="text-[42px] font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-[52px]">
                  Digital Wallet
                  <br />
                  Finance App
                </h1>
              </div>
              <div className="flex items-end justify-between gap-6 md:mt-auto md:max-w-[320px]">
                <img
                  src="https://static.cdnlogo.com/logos/f/38/figma.svg"
                  alt="Figma"
                  className="h-8 w-8 object-contain"
                />
                <div className="rounded-full bg-[#5b44ff] px-6 py-4 text-[18px] font-semibold leading-none text-white shadow-[0_10px_30px_rgba(91,68,255,0.35)]">
                  100+ Screens
                </div>
              </div>
            </header>
            <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <img
                src="/cover.png"
                alt=""
                aria-hidden="true"
                className="hidden"
              />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='650' viewBox='0 0 320 650' fill='none'%3E%3Crect x='20' y='10' width='280' height='630' rx='42' fill='%23111111' stroke='%23252525' stroke-width='4'/%3E%3Crect x='36' y='28' width='248' height='594' rx='34' fill='white'/%3E%3Crect x='105' y='36' width='110' height='24' rx='12' fill='black'/%3E%3Ctext x='60' y='90' fill='%23666666' font-size='12' font-family='Arial'%3ETotal Balance%3C/text%3E%3Ctext x='60' y='132' fill='%23222222' font-size='28' font-family='Arial' font-weight='700'%3E%2412%2C765.00%3C/text%3E%3Ccircle cx='67' cy='170' r='18' fill='%23d7f000'/%3E%3Ccircle cx='122' cy='170' r='18' fill='%23d7f000'/%3E%3Ccircle cx='177' cy='170' r='18' fill='%23d7f000'/%3E%3Ccircle cx='232' cy='170' r='18' fill='%23d7f000'/%3E%3Crect x='52' y='205' width='216' height='92' rx='18' fill='%235b44ff'/%3E%3Crect x='52' y='315' width='216' height='18' rx='9' fill='%23f3f3f3'/%3E%3Crect x='52' y='350' width='216' height='18' rx='9' fill='%23f3f3f3'/%3E%3Crect x='52' y='385' width='216' height='18' rx='9' fill='%23f3f3f3'/%3E%3Crect x='52' y='438' width='216' height='76' rx='18' fill='white' stroke='%23ececec'/%3E%3Crect x='52' y='530' width='216' height='60' rx='18' fill='white' stroke='%23ececec'/%3E%3C/svg%3E"
                alt="Light wallet app screen"
                className="h-auto w-[42%] max-w-[320px] -rotate-[18deg] drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
              />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='650' viewBox='0 0 320 650' fill='none'%3E%3Crect x='20' y='10' width='280' height='630' rx='42' fill='%23111111' stroke='%23252525' stroke-width='4'/%3E%3Crect x='36' y='28' width='248' height='594' rx='34' fill='white'/%3E%3Crect x='105' y='36' width='110' height='24' rx='12' fill='black'/%3E%3Crect x='36' y='28' width='248' height='270' rx='34' fill='%235b44ff'/%3E%3Ctext x='60' y='90' fill='%23cfc7ff' font-size='12' font-family='Arial'%3ETotal Balance%3C/text%3E%3Ctext x='60' y='132' fill='white' font-size='28' font-family='Arial' font-weight='700'%3E%2412%2C765.00%3C/text%3E%3Ccircle cx='67' cy='180' r='18' fill='%23d7f000'/%3E%3Ccircle cx='122' cy='180' r='18' fill='%23d7f000'/%3E%3Ccircle cx='177' cy='180' r='18' fill='%23d7f000'/%3E%3Ccircle cx='232' cy='180' r='18' fill='%23d7f000'/%3E%3Crect x='52' y='230' width='216' height='88' rx='18' fill='%23d7f000'/%3E%3Ccircle cx='250' cy='285' r='28' fill='%23111111'/%3E%3Crect x='52' y='338' width='216' height='18' rx='9' fill='%23f3f3f3'/%3E%3Crect x='52' y='373' width='216' height='18' rx='9' fill='%23f3f3f3'/%3E%3Crect x='52' y='408' width='216' height='18' rx='9' fill='%23f3f3f3'/%3E%3Crect x='52' y='460' width='216' height='60' rx='18' fill='white' stroke='%23ececec'/%3E%3Crect x='52' y='534' width='216' height='56' rx='18' fill='white' stroke='%23ececec'/%3E%3C/svg%3E"
                alt="Dark wallet app screen"
                className="h-auto w-[42%] max-w-[320px] rotate-[18deg] translate-y-10 drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
              />
            </div>
            <aside className="flex items-center justify-start md:justify-end">
              <ul className="space-y-3 text-left text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[38px]">
                {featureItems.map((item) => (
                  <li
                    key={`${item.accent}-${item.text}`}
                    className="text-white"
                  >
                    <span className="text-[#d7f000]">{item.accent}</span>{" "}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
