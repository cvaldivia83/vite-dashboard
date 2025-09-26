import Button from "./Button";
import React from 'react';
import { userInterface, userPagination } from "../types/user";
import TableProps from "../types/table";
import UserRow from "./UserRow";
import { csvParser } from "../services/csvParser";

// import { UsersService } from "../services/users";

const Table = ({ users, setActiveModal, setSelectedUser}: TableProps) => {

  function handleCSV(data: userInterface[]) {
    const parser = new csvParser();
    if (users) {
       parser.downloadCSV(users, 'users-file.csv');
    }
  }

  if (!users) return <p>Loading...</p>

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="H4Bold">Carteiras</h3>
        <Button size='base' background="branco" color="azul" text="Exportar CSV" border={true} onClick={() => handleCSV(users)} type="button" />
      </div>

      <table className="table">
        <thead className="theader">
          <tr>
            <th className="thead">Nome</th>
            <th className="thead">Sobrenome</th>  
            <th className="thead">Email</th>
            <th className="thead">Bitcoin</th>
            <th className="thead text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <UserRow user={user} key={`userRow-${user.id}`} setActiveModal={setActiveModal} setSelectedUser={setSelectedUser} />
            )
          })}
        </tbody>
      </table>
    </>


  )
}

export default Table;