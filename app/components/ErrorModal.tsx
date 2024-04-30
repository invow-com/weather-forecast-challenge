import Image from 'next/image'

interface ErrorModalProps {
    onClick: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ onClick }) => {
    return (
        <div className="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-blue-200 p-20 rounded-lg max-w-sm mx-4 relative">
                <div className="">
                    <Image
                        src="/clouds.png"
                        alt="img"
                        width={300}
                        height={300}
                        className="mx-auto opacity-60"
                    />
                    <p className="text-center text-gray-700 font-bold py-4">
                        Sorry, there was an error with your request. Please try again!
                    </p>
                </div>
                <button
                    onClick={onClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mt-4"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}

export default ErrorModal