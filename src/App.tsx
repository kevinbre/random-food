import { useEffect, useRef, useState } from "react";
import { restaurants } from "./data/restaurants";
import RandomLogo from "../public/assets/logos/logo-random.png";
import { FilterCard } from "./components/FilterCard";
import PedidosYa from "./assets/pedidosya.svg";
import Song from "./assets/songs/ruleta-song.mp3";

export const App: React.FC = () => {
  const [food, setFood] = useState(-1);
  const [categorySelected, setCategorySelected] = useState("Sin filtro");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [effect, setEffect] = useState(false);
  const archivoSonidoRef = useRef<HTMLAudioElement | null>(null);

  const getRandomNumber = () => {
    setButtonDisabled(true);
    setEffect(true);
    ruletaSong("play");
    const localFoodQuantity = 12;
    let count = 1;
    const interval = setInterval(() => {
      setFood((prevState) => {
        let newNumber = Math.floor(Math.random() * localFoodQuantity);
        if (newNumber === prevState) {
          newNumber = (prevState + 1) % localFoodQuantity;
        }
        return newNumber;
      });
      count++;
      if (count === localFoodQuantity) {
        clearInterval(interval);
        setButtonDisabled(false);
        setEffect(false);
      }
    }, 200);
  };

  function ruletaSong(method: "play" | "pause") {
    if (!archivoSonidoRef.current) {
      archivoSonidoRef.current = new Audio(Song);
    }
    archivoSonidoRef.current.currentTime = 0;
    if (method === "play") {
      archivoSonidoRef.current.play();
    } else {
      archivoSonidoRef.current.pause();
    }
  }

  return (
    <div className="justify-between w-screen h-screen bg-neutral-900 text-white flex flex-col py-5 items-center">
      <div></div>
      <div className="gap-7 flex flex-col justify-center items-center">
        <h1 className="text-2xl">🍕 Random Food 🍕</h1>
        <div className="flex gap-2">
          <FilterCard
            foodType="Comida"
            selected={categorySelected === "Comida" ? true : false}
            onClick={() => setCategorySelected("Comida")}
          />
          <FilterCard
            foodType="Postre"
            selected={categorySelected === "Postre" ? true : false}
            onClick={() => setCategorySelected("Postre")}
          />
          <FilterCard
            foodType="Sin filtro"
            selected={categorySelected === "Sin filtro" ? true : false}
            onClick={() => setCategorySelected("Sin filtro")}
          />
        </div>
        <div>
          {food > -1 ? (
            restaurants.map(
              (item) =>
                item.id === food && (
                  <div
                    key={item.id}
                    className="flex justify-center items-center flex-col gap-2"
                  >
                    <div className="w-[100px] h-[100px] bg-white">
                      <img
                        src={item.image ? item.image : RandomLogo}
                        alt={`Logo ${item.name}`}
                        className="w-[100px] h-[100px]"
                      />
                    </div>
                    <p>{item.name}</p>
                  </div>
                )
            )
          ) : (
            <div className="flex justify-center flex-col items-center">
              <div className="w-[100px] h-[100px] flex justify-center items-center">
                <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-violet-500"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
          } bg-purple-950 px-3 py-1 rounded-md hover:scale-105 hover:bg-purple-700 disabled:opacity-25 click:scale-95`}
          onClick={() => getRandomNumber()}
          disabled={buttonDisabled}
        >
          Buscar comida
        </button>
      </div>
      <div></div>
      {/* <div className="flex flex-col justify-center items-center">
        <p className="opacity-60">Powered by</p>
        <img src={PedidosYa} alt={`Logo pedidos ya`} width={150} />
      </div> */}
    </div>
  );
};
