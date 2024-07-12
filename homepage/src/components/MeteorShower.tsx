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
    <div className="header-inner" id="meteor-shower">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor-root"
          style={{
            left: `${meteor.xPos}px`
          }}
        >
          <div className="meteor"></div>
        </div>
      ))}
    </div>
  );
};

export default MeteorShower;
