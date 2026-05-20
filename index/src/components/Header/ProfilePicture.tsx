import { useState } from "react";
import FadeInImage from "../FadeInImage";

export default function ProfilePicture() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="profile-orbit-scene relative mx-auto size-40 overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="profile-orbit-stage relative size-full">
        <FadeInImage
          src="./me.png"
          className="profile-orbit-photo relative aspect-square w-full rounded-full"
        />

        <div
          className={`profile-orbit-system pointer-events-none absolute inset-0 transition-opacity
            duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="profile-orbit-ring absolute -inset-3 rounded-full" />

          <div className="absolute -inset-3 animate-orbit">
            <div className="profile-orbit-body absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="profile-orbit-trail-glow" aria-hidden="true" />
              <div className="profile-orbit-trail" aria-hidden="true" />
              <div className="profile-orbit-satellite" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
