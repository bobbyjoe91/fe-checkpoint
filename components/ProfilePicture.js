import Image from "next/image";

export default function ProfilePicture({ source, height, width, alt }) {
  return (
    <Image
      src={source ?? '/assets/blank.png'}
      width={width ?? 100}
      height={height ?? 100}
      className="profile-pic"
      alt={alt}
    />
  );
}