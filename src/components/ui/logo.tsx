import Image from "next/image";

type LogoTypeProp = {
  heigth?: number;
  width?: number;
  className?: string;
};

export function Logo({ heigth = 50, width = 50, className }: LogoTypeProp) {
  return (
    <Image
      src={"/Logo-OSP.jpg"}
      height={heigth}
      width={width}
      alt="Logo OSP Marki"
      className={className}
    />
  );
}
