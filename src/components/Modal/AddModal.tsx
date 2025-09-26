import useForm from "../../hooks/useForm";
import Input from "./Input";
import React from 'react';
import Button from "../Button";
import{ ModalProps } from "../../types/modal";
import { CurrencyService } from "../../services/currency";

const AddModal = ({ isOpen, setActiveModal, onAddUser }: ModalProps) => {
  const nome = useForm('nome');
  const sobrenome = useForm('sobrenome');
  const email = useForm('email');
  const valor_compra = useForm('valor_compra');
  const [btcValue, setBtcValue] = React.useState<number | null>(null);
  const firstInput = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    // sets focus on first input when modal renders
   if (firstInput.current && isOpen) {
    firstInput.current.focus();
   }
  }, [isOpen])

  React.useEffect(() => {
  //  updates the BTC value in paragraph
    if(valor_compra.value) {
      const amount = parseFloat(valor_compra.value.replace(',', '.'))
      if(!isNaN(amount)) {
        const conversionRate = CurrencyService.getCurrencyConversion();
        conversionRate.then((conversionRate) => {
          const rate = parseFloat(conversionRate["BTCBRL"]["low"]);
          setBtcValue(amount / rate);
        })
      
      }
    }
  }, [valor_compra.value])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValid = (nome.validate() && sobrenome.validate() && email.validate() && valor_compra.validate());
    if (!isValid) return;

    const client = {
      nome: nome.value,
      sobrenome: sobrenome.value,
      email: email.value,
      valor_carteira: valor_compra.value
    };

    if (onAddUser) {
      onAddUser(client); // Dashboard handles API and errors
    }
  }

  return (
      <div className={`modal ${isOpen ? "" : "hidden"}`} data-testid="add-user-modal">
        <h3 className="H3Bold text-left">Adicionar carteira</h3>
        <form className="mt-8" onSubmit={handleSubmit} method="POST">
          <Input id="nome" placeholder="Nome" label="Nome" type="text" value={nome.value} onChange={nome.onChange} error={nome.error} onBlur={nome.onBlur} ref={firstInput} />
          <Input id="sobrenome" placeholder="Sobrenome" label="Sobrenome" type="text" value={sobrenome.value} onChange={sobrenome.onChange} error={sobrenome.error} onBlur={sobrenome.onBlur} />
          <Input id="email" placeholder="E-mail" label="E-mail" type="email" value={email.value} onChange={email.onChange} error={email.error} onBlur={email.onBlur} />
          <div className="flex justify-start items-center">
            <Input id="valor_compra" placeholder="Valor de Compra" label="Valor de Compra" type="valor_compra" value={valor_compra.value} onChange={valor_compra.onChange} error={valor_compra.error} onBlur={valor_compra.onBlur} classname="grow-2" />
            <p className="currency-exchange">{ btcValue ? `BTC ${btcValue.toFixed(5)}` : 'BTC 0.00000'}</p>
          </div>
          <div className="flex items-center justify-end mt-8">
            <Button size="base" text="Cancelar" color="azul" background="branco" onClick={() => setActiveModal(null)} border={false} type="button" data-testid="add-modal-cancel-btn" />
            <Button size="base" text="Adicionar" color="branco" background="azul" border={false} type="submit" />
          </div>
        </form>
      </div>
  )
}

export default AddModal;