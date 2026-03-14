import { FaLinkedinIn, FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import logoAsterisk from '../../assets/logoAsterisk.png';
import logoName from '../../assets/logoName.png';

const socials = [
  { icon: FaLinkedinIn, url: 'https://linkedin.com' },
  { icon: FaFacebookF, url: 'https://facebook.com' },
  { icon: FaXTwitter, url: 'https://x.com' },
];

const Logo = () => (
  <div className="flex items-center gap-3">
    <img src={logoAsterisk} alt="lite-tech asterisk" className="w-7 h-7" />
    <img
      src={logoName}
      alt="lite-tech"
      className="w-[137px] h-[25px] mt-[1px]"
    />
  </div>
);

const Socials = () => (
  <div className="flex items-center gap-6">
    {socials.map(({ icon: Icon, url }) => (
      <a key={url} href={url} target="_blank" rel="noopener noreferrer">
        <Icon
          size={24}
          className="text-white hover:text-lime transition-colors"
        />
      </a>
    ))}
  </div>
);

export const Footer = () => {
  return (
    <footer className="w-full max-w-[1440px] mx-auto px-6 md:px-14 py-6 md:py-14">
      <div className="bg-purple flex flex-col md:hidden h-[342px] px-6 py-16 items-center">
        <div className="flex flex-col gap-14 h-[214px] items-center">
          <Logo />
          <Socials />
          <p className="text-white/80 text-sm text-center leading-[200%]">
            © Copyright Lite-Tech <br />
            All Rights Reserved
          </p>
        </div>
      </div>

      <div className="bg-purple hidden md:flex flex-col px-[120px] pt-22 pb-15 h-[267px] justify-between">
        <div className="flex items-center justify-between pr-16">
          <Logo />
          <Socials />
        </div>
        <p className="text-white/80 text-sm leading-[200%]">
          © Copyright Lite-Tech. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
