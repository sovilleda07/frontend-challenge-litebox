import { Button } from '../ui/Button';

export const Banner = () => {
  return (
    <div className="bg-purple flex items-center w-full py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7 w-full px-10">
        <p className="text-[27px] leading-[121%] text-white">
          <span className="font-normal">Sign up for our newsletter and </span>
          <span className="font-semibold">get daily updates</span>
        </p>

        <Button variant="primary" className="w-full md:w-[152px] h-[56px]">
          Subscribe
        </Button>
      </div>
    </div>
  );
};
