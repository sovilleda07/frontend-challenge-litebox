import logoAsterisk from '../../assets/logoAsterisk.png';
import logoName from '../../assets/logoName.png';
import { Link } from '../ui/Link';

interface NavbarProps {
  onNewPost?: () => void;
}

export const Navbar = ({ onNewPost }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-4 md:px-16 py-[26px] h-[81px] max-w-[1440px] mx-auto w-full">
      <div className="flex items-center relative">
        <img
          src={logoAsterisk}
          alt="lite-tech asterisk"
          style={{ width: '28px', height: '28px' }}
        />
        <img
          src={logoName}
          alt="lite-tech"
          style={{
            width: '137px',
            height: '25px',
            marginLeft: '12px',
            marginTop: '1px',
          }}
        />
      </div>

      <Link label="New post" arrowColor="lime" onClick={onNewPost} />
    </nav>
  );
};
