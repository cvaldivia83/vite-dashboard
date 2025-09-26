import useForm from "../../hooks/useForm";
import Input from "./Input";
import React from 'react';
import Button from "../Button";
import { EditModalProps } from "../../types/modal";

const EditModal = ( { isOpen, setActiveModal, selectedUser, onEditUser }: EditModalProps) => {

  const nome = useForm('nome');
  const sobrenome = useForm('sobrenome');
  const email = useForm('email');
  const valor_compra = useForm('valor_compra');

  // load user values to the form
  React.useEffect(() => {
  if (selectedUser) {
    nome.setValue(selectedUser.nome || "");
    sobrenome.setValue(selectedUser.sobrenome || "");
    email.setValue(selectedUser.email || "");
    valor_compra.setValue(selectedUser.valor_carteira ? selectedUser.valor_carteira.toString() : "");
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedUser, isOpen]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValid = (nome.validate() && sobrenome.validate() && email.validate() && valor_compra.validate());

    if (!isValid) return null;
    const client = {
      nome: nome.value,
      sobrenome: sobrenome.value,
      email: email.value,
      valor_carteira: valor_compra.value
    };

    if (selectedUser) {
      onEditUser(selectedUser.id, client)
    }
  }

  if (selectedUser === null) return null;

  return (
      <div className={`modal ${isOpen ? "" : "hidden"}`}>
        <h3 className="H3Bold text-left">Editar carteira</h3>
        <form onSubmit={handleSubmit} className="mt-8">
          <Input id="nome" placeholder="" label="Nome" type="text" value={nome.value} onChange={nome.onChange} error={nome.error} onBlur={nome.onBlur} classname="input-padding" />
          <Input id="sobrenome" placeholder="" label="Sobrenome" type="text" value={sobrenome.value} onChange={sobrenome.onChange} error={sobrenome.error} onBlur={sobrenome.onBlur} classname="input-padding" />
          <Input id="email" placeholder="" label="E-mail" type="email" value={email.value} onChange={email.onChange} error={email.error} onBlur={email.onBlur} classname="input-padding" />
          <div className="flex justify-start items-center">
            <Input id="valor_compra" placeholder="" label="Valor de Compra" type="valor_compra" value={valor_compra.value} onChange={valor_compra.onChange} error={valor_compra.error} classname="grow-2 input-padding" onBlur={valor_compra.onBlur} />
            <p className="currency-exchange">BTC 0.12345</p>
          </div>
          <div className="flex items-center justify-end mt-8">
            <Button size="base" text="Cancelar" color="azul" background="branco" onClick={() => setActiveModal(null)} border={false} type="button" />
            <Button size="base" text="Atualizar" color="branco" background="azul" border={false} type="submit" />
          </div>
        </form>
      </div>
  )
}

export default EditModal;