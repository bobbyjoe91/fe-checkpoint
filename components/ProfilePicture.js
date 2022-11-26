import Image from "next/image";

export default function ProfilePicture({ src, height, width, alt }) {
  return (
    <Image
      src={src ?? '/assets/blank.png'}
      width={width ?? 100}
      height={height ?? 100}
      className="profile-pic"
      alt={alt}
      priority
    />
  );
}