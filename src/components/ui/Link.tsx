import { FaChevronLeft, FaArrowRightLong } from 'react-icons/fa6';

export type ArrowColor = 'lime' | 'purple' | 'white' | 'black';

type LinkVariant = 'default' | 'breadcrumb';

export type TextSize = 'sm' | 'md' | 'lg';

interface LinkProps {
  label?: string;
  onClick?: () => void;
  arrowColor?: ArrowColor;
  textColor?: string;
  showArrow?: boolean;
  showIcon?: boolean;
  variant?: LinkVariant;
  iconLeft?: React.ReactNode;
  size?: TextSize;
  underlineOnHover?: boolean;
}

const textSizeMap: Record<TextSize, string> = {
  sm: 'text-[14px]',
  md: 'text-[16px]',
  lg: 'text-[18px]',
};

const arrowColorMap: Record<ArrowColor, string> = {
  lime: 'text-lime-400',
  purple: 'text-purple-500',
  white: 'text-white',
  black: 'text-black',
};

export const Link = ({
  label = 'Read',
  onClick,
  arrowColor = 'lime',
  textColor = 'white',
  showArrow = true,
  showIcon = true,
  variant = 'default',
  iconLeft,
  size = 'sm',
  underlineOnHover = false,
}: LinkProps) => {
  const textColorClass =
    textColor === 'black'
      ? 'text-black'
      : textColor === 'white'
        ? 'text-white'
        : '';

  const textSizeClass = textSizeMap[size];

  const shouldShowArrow =
    variant === 'breadcrumb' ? false : showArrow && showIcon;

  const defaultBreadcrumbIcon = (
    <FaChevronLeft className="w-[6px] h-[6px] text-white" aria-hidden="true" />
  );
  const iconToRender =
    variant === 'breadcrumb' ? (iconLeft ?? defaultBreadcrumbIcon) : iconLeft;

  const arrowColorClass = arrowColorMap[arrowColor] ?? 'text-lime-400';

  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1 ${textColorClass} ${textSizeClass} font-medium transition-colors cursor-pointer`}
    >
      {iconToRender}
      {underlineOnHover ? (
        <span className="border-b border-transparent group-hover:border-current pb-[1px]">
          {label}
        </span>
      ) : (
        <span>{label}</span>
      )}
      {shouldShowArrow && (
        <FaArrowRightLong
          className={`${arrowColorClass} group-hover:text-orange-500 transition-colors duration-200`}
          aria-hidden="true"
        />
      )}
    </button>
  );
};
