import { useEffect, useRef, useState } from "react";
import RandomLogo from "../public/assets/logos/logo-random.png";
import Song from "./assets/songs/ruleta-song.mp3";
import { FilterCard } from "./components/FilterCard";
import { restaurants } from "./data/restaurants";
import { Helmet } from "react-helmet";

export type filterTypes = "Comida" | "Postre" | "Sin filtro";

export const App: React.FC = () => {
  const [food, setFood] = useState(-1);
  const [categorySelected, setCategorySelected] =
    useState<filterTypes>("Sin filtro");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [quantity, setQuantity] = useState(12);
  const [effect, setEffect] = useState(false);
  const archivoSonidoRef = useRef<HTMLAudioElement | null>(null);
  const [restaurantsData, setRestaurantData] = useState(restaurants);

  const getRandomNumber = () => {
    setButtonDisabled(true);
    setEffect(true);
    rouletteSong();

    let count = 1;
    const interval = setInterval(() => {
      setFood((prevState) => {
        let newNumber = Math.floor(Math.random() * quantity);
        if (newNumber === prevState) {
          newNumber = (prevState + 1) % quantity;
        }
        return newNumber;
      });

      count++;
      if (count === 12) {
        clearInterval(interval);
        setButtonDisabled(false);
        setEffect(false);
      }
    }, 200);
  };

  function rouletteSong() {
    if (!archivoSonidoRef.current) {
      archivoSonidoRef.current = new Audio(Song);
    }
    archivoSonidoRef.current.currentTime = 0;
    archivoSonidoRef.current.play();
  }

  const getFoodCategoryQuantity = (category: string) => {
    let quantity = 0;

    if (category !== "Sin filtro") {
      restaurants.forEach((item) => {
        if (item.category === category) {
          quantity++;
        }
      });

      const filterRestaurant = restaurants.filter(
        (item) => item.category === category
      );
      setRestaurantData(filterRestaurant);
      setQuantity(quantity);
    } else {
      setQuantity(restaurants.length);
      setRestaurantData(restaurants);
    }
  };

  useEffect(() => {
    getFoodCategoryQuantity(categorySelected);
  }, [categorySelected]);

  return (
    <div className="bg-black flex justify-center">
      <Helmet>
        <title>
          Random Food {`${food > -1 ? "| " + restaurantsData[food].name : ""} `}
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="shadow-bg-opacity max-w-2xl justify-center w-screen h-screen bg-general-bg bg-cover bg-center bg-neutral-900 text-white flex flex-col py-5 items-center">
        <div className="gap-7 flex flex-col justify-center items-center">
          <h1 className="text-2xl">🍕 Random Food 🍕</h1>
          <div className="flex gap-2">
            <FilterCard
              foodType="Comida"
              selected={categorySelected === "Comida" ? true : false}
              onClick={() => {
                if (!buttonDisabled) {
                  setFood(-1);
                  !buttonDisabled && setCategorySelected("Comida");
                }
              }}
              isRolling={buttonDisabled}
            />
            <FilterCard
              foodType="Postre"
              selected={categorySelected === "Postre" ? true : false}
              onClick={() => {
                if (!buttonDisabled) {
                  setFood(-1);
                  setCategorySelected("Postre");
                }
              }}
              isRolling={buttonDisabled}
            />
            <FilterCard
              foodType="Sin filtro"
              selected={categorySelected === "Sin filtro" ? true : false}
              onClick={() => {
                if (!buttonDisabled) {
                  setFood(-1);
                  !buttonDisabled && setCategorySelected("Sin filtro");
                }
              }}
              isRolling={buttonDisabled}
            />
          </div>
          <div>
            {food > -1 ? (
              restaurantsData.map(
                (item, index) =>
                  index === food && (
                    <div
                      key={item.id}
                      className={`flex justify-center items-center flex-col gap-2 transition-all ${
                        !buttonDisabled ? "hover:scale-105" : ""
                      }`}
                    >
                      <a
                        href={`${
                          !buttonDisabled
                            ? "https://www.pedidosya.com.ar/restaurantes/rosario/" +
                              item.url +
                              "-menu?origin=shop_list}"
                            : ""
                        }`}
                        className={`${
                          !buttonDisabled ? "" : "cursor-not-allowed"
                        } flex justify-center items-center flex-col gap-2`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="w-[100px] h-[100px] bg-white pointer-events-none">
                          <img
                            src={item.image ? item.image : RandomLogo}
                            alt={`Logo ${item.name}`}
                            className="w-[100px] h-[100px]"
                          />
                        </div>
                        <p className="font-bold italic text-lg">{item.name}</p>
                      </a>
                    </div>
                  )
              )
            ) : (
              <div className="flex justify-center flex-col items-center gap-2">
                <div className="w-[100px] h-[100px] flex justify-center items-center">
                  <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-violet-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-center">
                  Click en el botón si no sabes que comer.
                </p>
              </div>
            )}
          </div>

          <button
            className={`${
              effect && "animate-wiggle"
            } bg-purple-950 px-3 py-1 rounded-md hover:scale-105 hover:bg-purple-700 disabled:bg-purple-700/20 click:scale-95 disabled:cursor-not-allowed`}
            onClick={() => getRandomNumber()}
            disabled={buttonDisabled}
          >
            Buscar Local
          </button>
        </div>
      </div>
    </div>
  );
};
