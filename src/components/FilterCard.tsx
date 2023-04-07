import PizzaLogo from "../assets/logo-pizza.png";
import Icecream from "../assets/logo-icecream.png";
import Nofilter from "../assets/logo-pizzaicecream.png";

interface Props {
  foodType: "Comida" | "Postre" | "Sin filtro";
  selected?: boolean;
  onClick?: () => void;
}

export const FilterCard: React.FC<Props> = ({
  foodType,
  selected = false,
  onClick = () => {},
}) => {
  const isSelected = selected
    ? "border-2 border-purple-950 bg-purple-200"
    : "border-transparent bg-white grayscale";

  const foodTypeRef = {
    Comida: PizzaLogo,
    Postre: Icecream,
    "Sin filtro": Nofilter,
  };
  return (
    <div onClick={() => onClick()}>
      <div
        className={`${isSelected} flexborder w-20 h-20 rounded-md text-black font-semibold text-center justify-between cursor-pointer transition-all`}
      >
        <img
          src={foodTypeRef[foodType]}
          alt={`Logo ${foodType}`}
          className="object-cover rounded-md w-full h-full"
        />
      </div>
      <h2 className="text-center">{foodType}</h2>
    </div>
  );
};
