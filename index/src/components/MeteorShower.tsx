import React, { useEffect, useState } from "react";

interface Meteor {
  id: number;
  xPos: number;
}

const generateMeteor = (id: number): Meteor => {
  const offset = window.innerWidth / 4;
  const xPos =
    offset + Math.floor(Math.random() * (window.innerWidth - offset));

  return { id, xPos };
};

const MeteorShower: React.FC = () => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() > 0.5) return;

      setMeteors((prevMeteors) => {
        const newMeteor = generateMeteor(Date.now());
        return [...prevMeteors, newMeteor];
      });

      setTimeout(() => {
        setMeteors((prevMeteors) => prevMeteors.slice(1));
      }, 600);
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute w-full h-full overflow-hidden">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute -top-[150px] w-10 h-10 bg-red-500"
          style={{
            left: `${meteor.xPos}px`
          }}
        >
          <div
            className="absolute w-[300px] h-px -rotate-45 bg-linear-to-r from-meteor-glow
              to-transparent animate-meteor"
          >
            <div
              className="absolute w-2 h-2 bg-meteor-body rounded-full -translate-x-1/2 -translate-y-1/2
                shadow-[0_0_15px_8px_rgba(236,240,255,0.8)]"
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeteorShower;
