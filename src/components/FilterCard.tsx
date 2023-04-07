import PizzaLogo from "../assets/logo-pizza.png";
import Icecream from "../assets/logo-icecream.png";
import Nofilter from "../assets/logo-pizzaicecream.png";
import { filterTypes } from "../App";

interface Props {
  foodType: filterTypes;
  selected?: boolean;
  onClick?: () => void;
  isRolling: boolean;
}

export const FilterCard: React.FC<Props> = ({
  foodType,
  selected = false,
  onClick = () => {},
  isRolling,
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
    <div
      onClick={() => onClick()}
      className={isRolling ? "cursor-not-allowed" : "cursor-pointer"}
    >
      <div
        className={`${isSelected} flexborder w-20 h-20 rounded-md text-black font-semibold text-center justify-between  transition-all`}
      >
        <img
          src={foodTypeRef[foodType]}
          alt={`Logo ${foodType}`}
          className="object-cover rounded-md w-full h-full"
        />
      </div>
      <h2 className="text-center italic">{foodType}</h2>
    </div>
  );
};
