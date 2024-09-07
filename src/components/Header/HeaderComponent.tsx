import { Button } from "../../styles/button"
import { FlexContainer } from "../../styles/container"
import { Header, Logo, NavPoint, NavPointContainer } from "../../styles/header"


export const HeaderComponent = () => {
  return (
    <Header>
      <FlexContainer>
        <Logo to='/'>
          <span>U</span><span>Pixel</span>
        </Logo>

        <NavPointContainer>
          <NavPoint to={'/'} />
          <NavPoint to={'/'} />
          <NavPoint to={'/'} />
        </NavPointContainer>

        <Button>Log In</Button>
      </FlexContainer>
    </Header>
  )
}