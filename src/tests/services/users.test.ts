import { UsersService } from '../../services/users';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockUser = { id: 10, nome: 'Lolote', sobrenome: 'Flor', email: 'lolote@gmail.com', endereco: 'Rua Visconde de Piraja, 8', data_nascimento: '1991-08-28T02:38:40Z', data_abertura: '2025-08-14T09:43:40Z', valor_carteira: 9.3434323, endereco_carteira: '9GVjkqz9uBAMQXSCeNKUu9ZSMsm99MXV9p'}

describe('Users Service', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  })

  afterEach(() => {
    vi.resetAllMocks();
  })

  it('#getUsers should fetch all users', async () => {
    // @ts-expect-error(500)
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUser)});

    const result = await UsersService.getUsers({nome: '', sobrenome: '', email: ''}, 1);

    expect(fetch).toHaveBeenCalledWith('https://my-json-server.typicode.com/cvaldivia83/users_api_json/data/');
    expect(result).toEqual(mockUser);
  });

  it('#getUser should fetch a single user', async () => {
    // @ts-expect-error(500)
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUser)});

    const result = await UsersService.getUser(1);

    expect(fetch).toHaveBeenCalledWith('https://my-json-server.typicode.com/cvaldivia83/users_api_json/data/1');
    expect(result).toEqual(mockUser);
  });

  it('#createUser should POST a new user', async () => {
    // @ts-expect-error(500)
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUser)});

    const userData = { nome: 'Lolote'};
    const result = await UsersService.createUser(userData);

    expect(fetch).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/cvaldivia83/users_api_json/data/',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
    );
    expect(result).toEqual(mockUser);
  })

  it('#updateUser should PATCH a user', async () => {
    // @ts-expect-error(500)
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUser)});

    const userData = { nome: 'Joao' };
    const result = await UsersService.updateUser("1", userData);

    expect(fetch).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/cvaldivia83/users_api_json/data/1',
      expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
    );
    expect(result).toEqual(mockUser);
  });

  it('#deleteUser should delete a user', async () => {
    // @ts-expect-error(500)
    fetch.mockResolvedValueOnce({ json: () => Promise.resolve(mockUser)});

    const result = await UsersService.deleteUser("1");
    expect(fetch).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/cvaldivia83/users_api_json/data/1',
      expect.objectContaining({
        method: 'DELETE'
      })
    );
    expect(result).toEqual(mockUser);
  })

})