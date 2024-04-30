import Image from "next/image";

interface Period {
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    shortForecast: string;
    icon: string;
    detailedForecast: string;
}

interface Props {
    period: Period;
}

const WeatherCard: React.FC<Props> = ({ period }) => {
    const { name, isDaytime, temperature, temperatureUnit, shortForecast, icon, detailedForecast } = period;

    return (
        <div className={`flex flex-col w-[420px] overflow-hidden bg-white rounded-lg border-2 ${!isDaytime && 'text-white'} `}>
            <div className={`relative min-h-[176px] bg-image pt-4 ${isDaytime ? ' bg-sky-300' : ' bg-sky-800'} `}>
                <Image
                    src={`${isDaytime ? '/day.png' : '/night.png'}`}
                    alt="img"
                    width={60}
                    height={60}
                    className="time-img"
                />
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-2">{name}</h2>
                    <div className="w-full flex justify-center items-center gap-4">
                        <img src={icon} alt="Weather Icon" className="w-14 h-14 rounded-md shadow-lg" />
                        <p className="text-6xl font-extrabold">{temperature}°{temperatureUnit}</p>
                    </div>

                </div>

                <p className="w-full p-2 text-center">{shortForecast}</p>
            </div>
            <div className="p-2 flex items-center gap-4 h-full w-full">
                <p className="h-full flex items-center text-gray-800 text-sm md:text-md w-full">{detailedForecast}</p>
            </div>

        </div>
    );
};

export default WeatherCard;
