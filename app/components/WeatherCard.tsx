import Image from "next/image";

interface Period {
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
}

interface Props {
  period: Period;
}

const WeatherCard: React.FC<Props> = ({ period }) => {
  const { name, isDaytime, temperature, temperatureUnit, shortForecast } =
    period;

  let imageSrc = "/sunny.png";

  switch (true) {
    case shortForecast.toLowerCase().includes("sunny"):
      imageSrc = "/sunny.png";
      break;
    case shortForecast.toLowerCase().includes("clear"):
      imageSrc = isDaytime ? "/sunny.png" : "/clear_night.png";
      break;
    case shortForecast.toLowerCase().includes("thunderstorms"):
      imageSrc = "/thunder.png";
      break;
    case shortForecast.toLowerCase().includes("sunny") &&
      shortForecast.toLowerCase().includes("rain"):
      imageSrc = "/sunny_showers.png";
      break;
    case shortForecast.toLowerCase().includes("showers"):
    case shortForecast.toLowerCase().includes("rain"):
      imageSrc = "/showers.png";
      break;
    case shortForecast.toLowerCase().includes("cloudy"):
      imageSrc = isDaytime ? "/cloudy_day.png" : "/cloudy_night.png";
      break;
    case shortForecast.toLowerCase().includes("snow"):
      imageSrc = "/snow.png";
      break;
    case shortForecast.toLowerCase().includes("wind"):
      imageSrc = "/windy.png";
      break;
    default:
      break;
  }


  return (
    <div
      className="flex flex-row w-[560px] overflow-hidden rounded-2xl text-white relative"
      style={
        isDaytime
          ? { background: "linear-gradient(to right, #1D93FF, #A5D9FE)" }
          : { background: "linear-gradient(to right, #3164F5, #9B7BE0)" }
      }
    >
      <div className="flex flex-col p-8">
        <p className="pl-1">{shortForecast}</p>
        <div className="flex flex-row justify-start items-center pt-4">
          <h3 className="text-6xl">
            {temperature} {temperatureUnit}
          </h3>
          <div className="h-12 border-r border-white mx-4 opacity-60"></div>
          <p className="">{name}</p>
        </div>
      </div>
      <div
        className="absolute top-2 -right-8 overflow-hidden"
        style={{ clipPath: "inset(0 15% 0 0)" }}
      >
        <Image
          src={imageSrc}
          alt="img"
          width={150}
          height={150}
          className="opacity-85"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
