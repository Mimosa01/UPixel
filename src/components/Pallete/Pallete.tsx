import { FC, memo } from "react";
import { PalleteStyled } from "../../styles/pallete"
import { PalleteColorButton } from "../../styles/button";
import colorStore from "../../store/colorStore";

interface PropsPallete {
  colors: string[];
}

const handleSelectColor = (value: string) => {
  colorStore.setSelectedColor(value);
}

const handleClearColor = () => {
  colorStore.clearColor();
}

export const Pallete: FC<PropsPallete> = memo((props) => {

  return (
    <PalleteStyled id="pallete">
      <ul>
        <PalleteColorButton onClick={() => handleClearColor()}/>
        {props.colors.map((item, index) => (
          <li key={index + 1}>
            <PalleteColorButton 
              $color={item}
              onClick={() => handleSelectColor(item)}
            >
              {index + 1}
            </PalleteColorButton>
          </li>
        ))}
      </ul>
    </PalleteStyled>
  )
})