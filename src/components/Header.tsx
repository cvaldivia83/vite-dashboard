import HeaderProps from "../types/header";
import Button from "./Button"

const Header = ({ setActiveModal }: HeaderProps) => {

  return (
    <div className="header">
      <h2 className="H2Bold">BTC Carteiras</h2>
      <Button size='base' background="azul" color="branco" text="Adicionar Carteira" border={false} onClick={() => setActiveModal('add')} type="button" data-testid="add-wallet-btn" />
    </div>
  )
}

export default Header;